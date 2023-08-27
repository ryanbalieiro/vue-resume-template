<template>
    <!-- Fullscreen Loader -->
    <Loader ref="loader" @shown="_onLoaderShown" @completed="_onLoaderCompleted" @will-hide="_onLoaderWillHide"/>

    <!-- Spinner -->
    <ActivitySpinner ref="activitySpinner"/>
</template>

<script setup>
import Loader from "../feedbacks/Loader.vue"
import {ref} from "vue"
import {useLayout} from "../../composables/layout.js"
import ActivitySpinner from "../feedbacks/ActivitySpinner.vue"

const layout = useLayout()
const loader = ref(null)
const activitySpinner = ref(null)

const _loaderListeners = {
    onShown: null,
    onComplete: null
}

/**
 * @public
 * @param {String} message
 * @param {String} iconImagePath
 */
const setLoader = (message, iconImagePath) => {
    layout.setPageScrollingEnabled(false)
    loader.value.run(message, iconImagePath)
}

/**
 * @public
 * @param {Function} onShown
 * @param {Function} [onComplete]
 */
const setLoaderListeners = (onShown, onComplete) => {
    _loaderListeners.onShown = onShown
    _loaderListeners.onComplete = onComplete
}

/**
 * @public
 * @param {Number} progress
 */
const updateLoaderProgress = (progress) => {
    loader.value.setTaskProgress(progress)
}

/**
 * @private
 */
const _onLoaderShown = () => {
    if(_loaderListeners.onShown) {
        _loaderListeners.onShown()
    }
}

/**
 * @private
 */
const _onLoaderCompleted = () => {
    if(_loaderListeners.onComplete) {
        _loaderListeners.onComplete()
    }
}

/**
 * @private
 */
const _onLoaderWillHide = () => {
    layout.setPageScrollingEnabled(true)
    _loaderListeners.onShown = null
    _loaderListeners.onComplete = null
}

/**
 * @public
 * @param {String} message
 */
const showActivitySpinner = (message) => {
    activitySpinner.value.show(message)
}

/**
 * @public
 */
const hideActivitySpinner = () => {
    activitySpinner.value.hide()
}

defineExpose({
    setLoader,
    setLoaderListeners,
    updateLoaderProgress,
    showActivitySpinner,
    hideActivitySpinner
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>