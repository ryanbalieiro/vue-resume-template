<template>
    <div v-if="didLoadAllJsonFiles" id="resume">
        <NavigationWrapper>
            <Section v-for="section in sections"
                     :presentation-mode="String(presentationMode)"
                     :model="section"
                     :active="_isSectionActive(section)"/>
        </NavigationWrapper>
    </div>
</template>

<script setup>
import {inject} from "vue"
import Section from "/src/vue/components/sections/Section.vue"
import NavigationWrapper from "/src/vue/components/navigation/NavigationWrapper.vue"

/** @type {{value: Boolean}} */
const didLoadAllJsonFiles = inject("didLoadAllJsonFiles")

/** @type {{value: String}} */
const presentationMode = inject("presentationMode")

/** @type {{value: Section[]}} */
const sections = inject("sections")

/** @type {{value: Section}} */
const currentSection = inject("currentSection")

const _isSectionActive = (section) => {
    if(!currentSection.value)
        return false
    return currentSection.value.id === section.id
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

#resume {
    display: flex;
    min-height: 100vh;
    background-color: $nav-background;
    @include media-breakpoint-down($navigation-sidebar-breakpoint) {
        background-color: $default-section-background;
    }
}
</style>