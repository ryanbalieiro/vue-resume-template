<template>
    <div class="resume">
        <!-- Navigation (Large Screens) -->
        <div class="sidebar-column">
            <!-- Sidebar -->
            <NavSidebar @link-clicked="_navigateToSection"/>
        </div>

        <!-- Content -->
        <div class="content-column">
            <!-- Navigation Header (Small Screens) -->
            <NavHeader @link-clicked="_navigateToSection"/>

            <!-- Website Sections -->
            <component v-for="section in data.getSections()"
                       :is="_getSectionComponentByName(section['component'])"
                       :section-data="section"/>
        </div>

        <!-- Navigation Category Tabs (Small Screens) -->
        <div class="nav-tabs-column">
            <NavTabs @link-clicked="_navigateToCategory"/>
        </div>
    </div>
</template>

<script setup>
import {useData} from "../../composables/data.js"
import {useLanguage} from "../../composables/language.js"
import {useNavigation} from "../../composables/navigation.js"
import {useRoute, useRouter} from "vue-router"
import {onMounted, onUnmounted, watch} from "vue"
import {useLayout} from "../../composables/layout.js"

import NavSidebar from "../navigation/default/NavSidebar.vue"
import NavHeader from "../navigation/mobile/NavHeader.vue"
import NavTabs from "../navigation/mobile/NavTabs.vue"

import DefaultSection from "../sections/_templates/SectionTemplate.vue"
import ContactSection from "../sections/contact/ContactSection.vue"
import CoverSection from "../sections/cover/CoverSection.vue"
import GallerySection from "../sections/gallery/GallerySection.vue"
import InfoSection from "../sections/info/InfoSection.vue"
import ThreadsSection from "../sections/threads/ThreadsSection.vue"
import TimelineSection from "../sections/timeline/TimelineSection.vue"

const data = useData()
const navigation = useNavigation()
const layout = useLayout()
const language = useLanguage()
const route = useRoute()
const router = useRouter()

const scrollPositions = {}

/**
 * @type {Object}
 */
const SECTION_VUE_COMPONENTS = {DefaultSection, ContactSection, CoverSection, GallerySection, InfoSection, ThreadsSection, TimelineSection}

/**
 * @param {String} componentName
 * @return {*}
 * @private
 */
const _getSectionComponentByName = (componentName) => {
    if(SECTION_VUE_COMPONENTS[componentName])
        return SECTION_VUE_COMPONENTS[componentName]

    //console.warn("Couldn't find component with name: " + componentName + ". All section components must be registered on RouterView.vue.")
    return DefaultSection
}

/**
 * @private
 */
onMounted(() => {
    window.addEventListener('resize', _onWindowChangeEvent)
    window.addEventListener('scroll', _onWindowChangeEvent)
    watch(() => route.name, () => { _onWindowChangeEvent() })
    watch( () => language.getSelectedLanguage(), () => { _onLanguageChanged() })
    _onWindowChangeEvent()

    if(navigation.isAllAtOnceMode()) {
        layout.smoothScrollToElement(route.name, true)
    }
})

/**
 * @private
 */
onUnmounted(() => {
    window.removeEventListener('resize', _onWindowChangeEvent)
    window.removeEventListener('scroll', _onWindowChangeEvent)
})

/**
 * @private
 */
const _onWindowChangeEvent = () => {
    navigation.update(route.name)
}

/**
 * @private
 */
const _onLanguageChanged = () => {
    const activeSectionId = navigation.getActiveSectionId()
    if(navigation.isAllAtOnceMode()) {
        layout.instantScrollTo(window.scrollY - 100, true)
        layout.smoothScrollToElement(activeSectionId, true)
    }
}

/**
 * @param {String} sectionId
 * @private
 */
const _navigateToSection = (sectionId) => {
    navigation.registerSectionVisit(sectionId)
    if(navigation.isAllAtOnceMode()) {
        layout.smoothScrollToElement(sectionId, false)
        return
    }

    const routeName = route.name
    scrollPositions[routeName] = window.scrollY
    router.push({name: sectionId})
    navigation.update(routeName)
    layout.instantScrollTo(scrollPositions[sectionId] ?? 0, true)
}

/**
 * @param {String} categoryId
 * @private
 */
const _navigateToCategory = (categoryId) => {
    const targetSectionId = navigation.getLastVisitedSectionOn(categoryId)
    _navigateToSection(targetSectionId)
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.resume {
    display: flex;
    min-height: 100vh;
    background-color: $nav-background-color;
    @include media-breakpoint-down($navigation-sidebar-breakpoint) {
        background-color: $background-color;
    }
}

.sidebar-column {
    width: $nav-sidebar-column-size;
    min-height: 100vh;

    background-color: $dark;
    @include media-breakpoint-down($navigation-sidebar-breakpoint) {
        display: none;
    }
}

.content-column {
    width: calc(100vw - $nav-sidebar-column-size);
    min-height: 100vh;

    background-color: $background-color;
    @include media-breakpoint-down($navigation-sidebar-breakpoint) {
        width: 100vw;
    }
}

.nav-header, .nav-tabs-column {
    display: none;
    @include media-breakpoint-down($navigation-sidebar-breakpoint) {
        display: block;
    }
}

.nav-tabs-column {
    @include media-breakpoint-down($navigation-sidebar-breakpoint) {
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 99;
    }
}
</style>