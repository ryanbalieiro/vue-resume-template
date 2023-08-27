<template>
    <!-- Feedbacks -->
    <FeedbackView ref="feedbackView"/>

    <!-- App Content -->
    <div v-if="data.getLoadProgress() >= 100"
         v-show="!utils.isTouchDevice() || appDidLoad">
        <router-view />
    </div>
</template>

<script setup>
import FeedbackView from "./FeedbackView.vue"

import {computed, onMounted, ref} from "vue"
import {useData} from "../../composables/data.js"
import {useLayout} from "../../composables/layout.js"
import {useUtils} from "../../composables/utils.js"

const data = useData()
const layout = useLayout()
const utils = useUtils()

const feedbackView = ref(null)
const appDidLoad = ref(false)
let intervalId = null

onMounted(() => {
    layout.setFeedbackView(feedbackView)
    _startPreloading()
})

/**
 * @type {ComputedRef<Boolean>}
 */
const _isPreloaderEnabled = computed(() => {
    return data.getSettings()['preloaderEnabled']
})

/**
 * @return {Promise<void>}
 * @private
 */
const _startPreloading = async () => {
    clearInterval(intervalId)
    if(_isPreloaderEnabled.value) {
        feedbackView.value.setLoaderListeners(_onPreloaderShown, _onPreloadCompleted)
        feedbackView.value.setLoader(data.getString('loading'), "images/icons/resume.ico")
    }
    else {
        await _onPreloaderShown()
    }
}

/**
 * @private
 */
const _onPreloaderShown = async () => {
    intervalId = setInterval(() => {
        _checkLoadProgress()
    }, 1000/30)

    await data.fetchAll()
    if(!_isPreloaderEnabled.value) {
        _onPreloadCompleted()
        layout.setPageScrollingEnabled(true)
    }
}

/**
 * @private
 */
const _checkLoadProgress = () => {
    if(!_isPreloaderEnabled.value) {
        return
    }

    const jsonLoadProgress = data.getLoadProgress()
    const imageCount = layout.getImageCount()

    let imageLoadProgress = 0
    if(imageCount.total > 0) {
        imageLoadProgress = Math.round(100 * imageCount.loaded / imageCount.total)
    }
    else if(jsonLoadProgress === 100) {
        imageLoadProgress = 100
    }

    const loadProgress = (jsonLoadProgress + imageLoadProgress * 4) / 5
    feedbackView.value.updateLoaderProgress(loadProgress)
}

/**
 * @private
 */
const _onPreloadCompleted = () => {
    appDidLoad.value = true
    clearInterval(intervalId)
}
</script>

<style lang="scss" scoped>
</style>