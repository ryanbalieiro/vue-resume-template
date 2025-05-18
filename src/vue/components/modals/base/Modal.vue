<template>
    <!-- Modal -->
    <div class="modal"
         :class="modalType"
         :id="id">

        <!-- Modal dialog -->
        <div class="modal-dialog"
             :class="dialogType">

            <!-- Modal content -->
            <div class="modal-content"
                 :class="{
                    'modal-content-bg-transparent': transparent
                 }">
                <FaButton v-if="dismissable"
                          class="modal-close-button"
                          data-bs-dismiss="modal"
                          fa-icon="fa-solid fa-close"
                          variant="transparent"
                          size="4"
                          aria-label="Close"/>

                <div class="modal-custom-content">
                    <slot/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Modal from 'bootstrap/js/src/modal'
import {onMounted, onUnmounted, ref, watch} from "vue"
import FaButton from "/src/vue/components/widgets/FaButton.vue"

const props = defineProps({
    id: String,
    modalType: String,
    dialogType: String,
    transparent: Boolean,
    visible: Boolean,
    dismissable: Boolean
})

const emit = defineEmits(['close'])

const bsModal = ref(null)

onMounted(() => {
    const elModal = document.getElementById(props.id)
    const config = props.dismissable ?
        {} :
        { backdrop: 'static', keyboard: false }

    bsModal.value = new Modal(elModal, config)
    elModal.addEventListener('hide.bs.modal', _onWillHide)
    elModal.addEventListener('hidden.bs.modal', _onHidden)
    _onVisibilityToggled()
})

onUnmounted(() => {
    if(!bsModal.value)
        return
    bsModal.value.hide()
})

watch(() => props.visible, () => {
    _onVisibilityToggled()
})

const _onVisibilityToggled = () => {
    if(!bsModal.value)
        return

    if(props.visible)
        bsModal.value.show()
    else
        bsModal.value.hide()
}

const _onWillHide = () => {
    if(!document.activeElement)
        return
    document.activeElement.blur()
}

const _onHidden = () => {
    emit("close")
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

div.modal {
    background-color: rgba(black, 0.8)
}

div.modal-content {
    background-color: $light-1;

    &-bg-transparent {
        background-color: transparent;
        border: none;
    }
}

div.modal-custom-content {
    width: 100%;
    min-height: 60px;
}

button.modal-close-button {
    position: absolute;
    right: 10px;
    top: 5px;
    z-index: 1;
}
</style>