<template>
    <slot/>
</template>

<script setup>
import {inject, onMounted, provide, ref, watch} from "vue"
import {useScheduler} from "/src/composables/scheduler.js"
import {useConstants} from "/src/composables/constants.js"

const constants = useConstants()
const scheduler = useScheduler()

/** @type {{value: Section[]}} */
const sections = inject("sections")

/** @type {{value: Boolean}} */
const didLoadAllJsonFiles = inject("didLoadAllJsonFiles")

/** @type {{value: String}} */
const windowHash = inject("windowHash")

/** @type {{value: Boolean}} */
const isDesktopLayout = inject("isDesktopLayout")

/** @type {Function} */
const setSpinnerEnabled = inject("setSpinnerEnabled")

/** @type {Function} */
const localizeFromStrings = inject("localizeFromStrings")

const currentSection = ref(null)
const previousSection = ref(null)
const presentationMode = ref(constants.PresentationModes.NONE)
const shouldResetScroll = ref(false)

onMounted(() => _init())
watch(() => didLoadAllJsonFiles.value, () => _init())
watch(() => windowHash.value, () => _onHashChanged())
watch(() => isDesktopLayout.value, () => _onViewportChanged(true))

const _init = () => {
    scheduler.clearAllWithTag('navigation-manager-hash')
    scheduler.schedule(() => {
        _onHashChanged()
    }, 30, 'navigation-manager-hash')

    _onViewportChanged(false)
}

/**
 * @param {Section} section
 */
const navigateToSection = (section) => {
    if(!section)
        return

    if(window.location.hash === '#' + section.urlHashId)
        return

    section.category.lastVisitedSection = section
    window.location.hash = section.urlHashId
}

/**
 * @param {Category} category
 * @return {Section}
 */
const navigateToCategory = (category) => {
    const targetSection = category.lastVisitedSection || category.sections[0]
    navigateToSection(targetSection)
    return targetSection
}

const scrollToTopOfCurrentSection = () => {
    setTimeout(() => {
        shouldResetScroll.value = true
    }, 100)
}

const _onHashChanged = () => {
    if(!didLoadAllJsonFiles.value)
        return

    const hash = window.location.hash.replace('#', '')
    const targetSection = sections.value.find((section) => section.urlHashId === hash)
    if(!targetSection) {
        navigateToSection(sections.value[0])
        return
    }

    previousSection.value = currentSection.value
    currentSection.value = targetSection
}

const _onViewportChanged = (showSpinner) => {
    presentationMode.value = isDesktopLayout.value
        ? constants.PresentationModes.ALL_AT_ONCE
        : constants.PresentationModes.ONE_AT_ONCE

    if(!showSpinner || presentationMode.value === constants.PresentationModes.ONE_AT_ONCE)
        return

    setSpinnerEnabled(true, localizeFromStrings("adjusting_viewport"))
    scheduler.clearAllWithTag('adjusting-viewport')
    scheduler.schedule(() => {
        setSpinnerEnabled(false)
    }, 700, 'adjusting-viewport')
}

provide("currentSection", currentSection)
provide("previousSection", previousSection)
provide("presentationMode", presentationMode)
provide("shouldResetScroll", shouldResetScroll)
provide("navigateToSection", navigateToSection)
provide("navigateToCategory", navigateToCategory)
provide("scrollToTopOfCurrentSection", scrollToTopOfCurrentSection)
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>