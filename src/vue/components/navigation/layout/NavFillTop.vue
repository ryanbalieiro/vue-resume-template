<template>
    <div class="nav-fill-top"
         :class="classList"/>
</template>

<script setup>
import {computed, inject} from "vue"
import {useUtils} from "/src/composables/utils.js"
import {useConstants} from "/src/composables/constants.js"

const utils = useUtils()
const constants = useConstants()

/** @type {{value: Number}} */
const windowScrollY = inject("windowScrollY")

/** @type {{value: Number}} */
const windowWidth = inject("windowWidth")

const classList = computed(() => {
    const isIOS = utils.isIOS()
    const isLandscape = windowWidth.value >= constants.BOOTSTRAP_BREAKPOINTS.lg
    const shouldHide = windowScrollY.value >= 30

    let classList = ""
    if(shouldHide) classList += " nav-fill-top-hidden"
    if(isLandscape && !isIOS) classList += " d-none"
    return classList
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

div.nav-fill-top {
    position: fixed;
    z-index: 1;
    top: -95px;
    width: 100%;
    height: 100px;
    background-color: $nav-background;
    opacity: 0.1;

    &-hidden {
        visibility: hidden;
    }
}
</style>