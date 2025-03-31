<template>
    <NavPillsController :id="id"
                        :options="options"
                        :min-items-to-display="minItemsToDisplay"
                        @select="_onOptionSelected"
                        :class="{
                            'nav-mobile-section-picker-hidden': hidden,
                            'nav-mobile-section-picker-no-transition': !canTransition,
                            'd-none': !isPortrait
                        }"/>
</template>

<script setup>
import NavPillsController from "/src/vue/components/navigation/tabs/NavPillsController.vue"
import {computed, inject, onMounted, ref, watch} from "vue"
import {useUtils} from "/src/composables/utils.js"
import {useScheduler} from "/src/composables/scheduler.js"

const scheduler = useScheduler()
const utils = useUtils()

const props = defineProps({
    id: String,
    target: String,
    options: Object,
    minItemsToDisplay: Number
})

const emit = defineEmits(['select'])

/** @type {{value: Number}} */
const windowScrollY = inject("windowScrollY")

/** @type {{value: Number}} */
const isPortrait = inject("isPortrait")

const hidden = ref(true)
const canTransition = ref(true)
const activeOption = computed(() => {return props.options.find(option => option.active)})

onMounted(() => {_detectVisibility()})
watch(() => windowScrollY.value, () => {_detectVisibility()})
watch(() => activeOption.value, () => {_onActiveOptionChanged()})

const _detectVisibility = () => {
    const element = document.getElementById(props.target)
    if(!element) {
        canTransition.value = false
        hidden.value = true
        return
    }

    const isOutsideOfBounds = utils.isElementOutsideBounds(element)
    hidden.value = !isOutsideOfBounds
}

const _onActiveOptionChanged = () => {
    canTransition.value = false
    scheduler.clearAllWithTag('nav-pills-fixed-timeout-transition')
    scheduler.schedule(() => {
        canTransition.value = true
    }, 300, 'nav-pills-fixed-timeout-transition')
}

const _onOptionSelected = (option) => {
    emit('select', option.model || option)
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

nav.nav-mobile-section-picker {
    position: fixed;
    top: 0;
    left: 0;
    transition: 0.1s top ease-out;

    &-hidden {
        top: calc(-1*$nav-section-picker-height)
    }

    &-no-transition {
        transition: none!important;
    }
}
</style>