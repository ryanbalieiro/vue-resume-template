<template>
    <ActivitySpinner :visible="Boolean(spinnerActive)"
                     :message="String(spinnerMessage)"/>

    <Loader v-if="preloaderEnabled"
            :visible="Boolean(loaderActive)"
            :refresh-count="Number(loaderPageRefreshCount)"
            :smooth-transition-enabled="Boolean(loaderSmoothTransitionEnabled)"
            @ready="_onLoaderReady"
            @completed="_onLoaderCompleted"/>

    <slot v-if="didMountPreloader"/>
</template>

<script setup>
import {inject, provide, ref, watch} from "vue"
import ActivitySpinner from "/src/vue/components/loaders/ActivitySpinner.vue"
import Loader from "/src/vue/components/loaders/Loader.vue"
import {useUtils} from "/src/composables/utils.js"

const utils = useUtils()

/** @type {{value:Settings}} */
const settings = inject("settings")
const preloaderEnabled = settings.value.preloaderEnabled

const didMountPreloader = ref(!settings.value.preloaderEnabled)
const loaderActive = ref(true)
const loaderPageRefreshCount = ref(0)
const loaderSmoothTransitionEnabled = ref(false)
const spinnerActive = ref(false)
const spinnerMessage = ref("")

/**
 * @param {Boolean} enabled
 * @param {String} [message=""]
 */
const setSpinnerEnabled = (enabled, message) => {
    spinnerActive.value = enabled
    spinnerMessage.value = message || ""
}

watch(() => loaderActive.value, () => {
    if(!loaderActive.value)
        return
    document.body.classList.remove('body-default')
    document.body.classList.remove('body-nav-contrast')
})

const _onLoaderReady = () => {
    didMountPreloader.value = true
    if(utils.isTouchDevice())
        document.body.classList.add('body-nav-contrast')
    else
        document.body.classList.add('body-default')
}

const _onLoaderCompleted = () => {
    loaderActive.value = false
}

provide("loaderActive", loaderActive)
provide("loaderPageRefreshCount", loaderPageRefreshCount)
provide("loaderSmoothTransitionEnabled", loaderSmoothTransitionEnabled)
provide("spinnerActive", spinnerActive)
provide("spinnerMessage", spinnerMessage)
provide("setSpinnerEnabled", setSpinnerEnabled)
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>