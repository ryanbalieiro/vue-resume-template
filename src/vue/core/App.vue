<template>
    <!-- Feedbacks -->
    <FeedbackView ref="feedbackView"/>

    <!-- Preloader -->
    <Loader ref="loader"
            @shown="_onPreloaderShown"
            @animated="_onPreloaderAnimated"
            @hiding="_onPreloaderHiding"/>


    <!-- App Content -->
    <Layout :class="!didShowPreloader ? 'opacity-0' : 'opacity-100'">
        <router-view/>
    </Layout>
</template>

<script setup>
import FeedbackView from "./FeedbackView.vue"
import Loader from "/src/vue/feedbacks/Loader.vue"
import Layout from "../core/Layout.vue"
import {computed, onMounted, ref} from "vue"
import {useData} from "../../composables/data.js"
import {useLayout} from "../../composables/layout.js"
import {useUtils} from "../../composables/utils.js"

const data = useData()
const layout = useLayout()
const utils = useUtils()

const feedbackView = ref(null)
const loader = ref(null)
const didShowPreloader = ref(false)

onMounted(() => {
    layout.setFeedbackView(feedbackView)
    if(preloaderEnabled.value) {
        loader.value.run()
    }
    else {
        _skipPreloader()
    }
})

const _onPreloaderShown = async () => {
    await data.fetchAll()
    layout.setPageScrollingEnabled(false)
}

const _onPreloaderAnimated = async () => {
    didShowPreloader.value = true
}

const _onPreloaderHiding = () => {
    layout.setPageScrollingEnabled(true)
}

const _skipPreloader = async () => {
    await data.fetchAll()
    didShowPreloader.value = true
    layout.setPageScrollingEnabled(true)
}

const preloaderEnabled = computed(() => {
    return data.getSettings()['preloaderEnabled']
})
</script>

<style lang="scss" scoped>
</style>