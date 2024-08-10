<template>
    <!-- Feedbacks -->
    <FeedbackView ref="feedbackView"/>

    <!-- Preloader -->
    <Loader ref="loader"
            @shown="_onPreloaderShown"
            @hiding="_onPreloaderHiding"/>

    <!-- App Content -->
    <Layout ref="pageWrapper">
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
import {useRouter} from "vue-router"
import {useNavigation} from "/src/composables/navigation.js"

const data = useData()
const layout = useLayout()
const navigation = useNavigation()
const router = useRouter()

const feedbackView = ref(null)
const loader = ref(null)
const pageWrapper = ref(null)

const preloaderEnabled = computed(() => {
    return data.getSettings()['preloaderEnabled']
})

onMounted(() => {
    layout.setFeedbackView(feedbackView)
    if(preloaderEnabled.value) {
        loader.value.run()
    }
    else {
        _skipPreloader()
    }
})

/**
 * @return {Promise<void>}
 * @private
 */
const _onPreloaderShown = async () => {
    layout.setPageScrollingEnabled(false)
    await data.fetchAll()
}

/**
 * @return {Promise<void>}
 * @private
 */
const _onPreloaderHiding = () => {
    layout.setPageScrollingEnabled(true)
    pageWrapper.value.init()
}

/**
 * @return {Promise<void>}
 * @private
 */
const _skipPreloader = async () => {
    await data.fetchAll()
    layout.setPageScrollingEnabled(true)
    pageWrapper.value.init()
}

/**
 * Triggered whenever there's a change on the current route.
 * This affects only small screens when the navigation mode is "ONE_AT_ONCE" - showing an activity spinner to smoothen the glitch from changing a route abruptly.
 * @private
 */
router.beforeEach((to, from, next) => {
    if(navigation.isAllAtOnceMode() || window.scrollY <= 0) {
        next()
        return
    }

    const fromCategory = navigation.getSectionCategory(from.name)
    const toCategory = navigation.getSectionCategory(to.name)
    if(fromCategory === toCategory && window.scrollY <= 200) {
        next()
        return
    }

    const feedbackView = layout.getFeedbackView()
    feedbackView.showActivitySpinner(data.getString('loading') + "...")

    setTimeout(() => {
        next()
        layout.instantScrollTo(0, true)
    }, 30)
    setTimeout(() => {
        feedbackView.hideActivitySpinner()
    }, 200)
})
</script>

<style lang="scss" scoped>
</style>