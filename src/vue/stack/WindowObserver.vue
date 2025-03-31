<template>
    <slot/>
</template>

<script setup>
import {computed, onMounted, onUnmounted, provide, ref, watch} from "vue"
import {useConstants} from "/src/composables/constants.js"
import {useUtils} from "/src/composables/utils.js"

const constants = useConstants()
const utils = useUtils()

const windowScrollX = ref(0)
const windowScrollY = ref(0)
const windowHeight = ref(0)
const windowWidth = ref(0)
const lastKeyPressed = ref({id: null, count: -1})
const windowHash = ref(null)
const canScroll = ref(true)

onMounted(() => {
    window.addEventListener('resize', _onResize)
    window.addEventListener('scroll', _onScroll)
    window.addEventListener('keydown', _onKeyDown)
    window.addEventListener('hashchange', _onHashChange)
    _onResize()
    _onScroll()
    _onHashChange()
})

onUnmounted(() => {
    window.removeEventListener('resize', _onResize)
    window.removeEventListener('scroll', _onScroll)
    window.removeEventListener('keydown', _onKeyDown)
    window.removeEventListener('hashchange', _onHashChange)
})

watch(() => canScroll.value, () => {
    const body = document.body
    if(!canScroll.value) {
        body.classList.add(`body-no-scroll`)
        if(utils.isIOS()) {
            body.classList.add(`position-fixed`)
        }
    }
    else {
        body.classList.remove(`body-no-scroll`)
        body.classList.remove(`position-fixed`)
    }
})

const isDesktopLayout = computed(() => {
    return windowWidth.value > constants.BOOTSTRAP_BREAKPOINTS.lg
})

const isMobileLayout = computed(() => {
    return !isDesktopLayout.value
})

const isScreenXlOrLarger = computed(() => {
    return windowWidth.value > constants.BOOTSTRAP_BREAKPOINTS.xl
})

const isPortrait = computed(() => {
    return windowHeight.value > windowWidth.value
})

const shouldAddChromeBottomOffset = computed(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera
    const osTest = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream
    const chromeTest = /CriOS/.test(userAgent)
    const windowTest = windowScrollY.value > 0
    const isPortrait = windowWidth.value > windowHeight.value

    return osTest && (isPortrait || (chromeTest && windowTest))
})

const _onResize = () => {
    windowHeight.value = window.innerHeight
    windowWidth.value = window.innerWidth
}

const _onScroll = () => {
    windowScrollX.value = window.scrollX
    windowScrollY.value = window.scrollY
}

const _onKeyDown = (e) => {
    lastKeyPressed.value = {
        id: e.key,
        count: lastKeyPressed.value.count + 1
    }
}

const _onHashChange = () => {
    windowHash.value = window.location.hash
}

provide("windowScrollX", windowScrollX)
provide("windowScrollY", windowScrollY)
provide("windowHeight", windowHeight)
provide("windowWidth", windowWidth)
provide("windowWidth", windowWidth)
provide("windowHash", windowHash)
provide("lastKeyPressed", lastKeyPressed)
provide("isDesktopLayout", isDesktopLayout)
provide("isMobileLayout", isMobileLayout)
provide("isScreenXlOrLarger", isScreenXlOrLarger)
provide("isPortrait", isPortrait)
provide("canScroll", canScroll)
provide("shouldAddChromeBottomOffset", shouldAddChromeBottomOffset)
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>