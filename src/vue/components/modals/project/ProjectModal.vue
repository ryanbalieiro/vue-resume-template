<template>
    <Modal id="project-modal"
           modalType="modal-xl fade"
           dialogType="modal-dialog-centered"
           :visible="Boolean(props.item)"
           :dismissable="true"
           @close="_onClose">
        <div v-if="item"
             class="project-modal-content-wrapper">
            <!-- Icon -->
            <IconView class="project-modal-icon-view"
                      ref="iconView"
                      :img="item?.img"
                      :fa-icon="item?.fallbackFaIcon"
                      :background-color="item?.fallbackFaIconColor"
                      :prioritize-image="true"
                      :transparency="!item"/>

            <!-- Content -->
            <ProjectModalContent :item="item"/>
        </div>
    </Modal>
</template>

<script setup>
import Modal from "/src/vue/components/modals/base/Modal.vue"
import IconView from "/src/vue/components/widgets/IconView.vue"
import ProjectModalContent from "/src/vue/components/modals/project/ProjectModalContent.vue"

const props = defineProps({
    /** @type {ArticleItem} **/
    item: {
        type: Object,
        required: false
    },
})

const emit = defineEmits(['close'])

const _onClose = () => {
   emit("close")
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

div.project-modal-content-wrapper {
    display: flex;
    width: 100%;

    @include generate-dynamic-styles-with-hash((
        xxxl: (flex-direction: row, padding: 3.5rem 3.5rem),
        xxl: (flex-direction: row, padding: 3rem 3rem),
        xl: (flex-direction: row, padding: 2.5rem 2.5rem),
        lg:   (flex-direction: column, padding: 2.25rem, align-items: center),
        md:   (padding: 2.0rem),
        sm:   (padding: 1.5rem)
    ));
}

div.project-modal-icon-view {
    border-radius: 25%;
    overflow: hidden;
    user-select: none;
    pointer-events: none;

    --dimension: 330px;
    --margin: 0 3rem 0 0;
    @include media-breakpoint-down(xxl) {
        --dimension: 300px;
    }
    @include media-breakpoint-down(xl) {
        --dimension: 220px;
        --margin: 0 2.5rem 0 0;
    }
    @include media-breakpoint-down(lg) {
        --dimension: min(200px, 35vw);
        --margin: 0 0 1rem 0;
    }
    @include media-breakpoint-down(sm) {
        --dimension: clamp(130px, 37vw, 170px);
    }

    height: var(--dimension);
    width: var(--dimension);
    min-width: var(--dimension);
    font-size: calc(var(--dimension)/2);
    margin: var(--margin);
}
</style>