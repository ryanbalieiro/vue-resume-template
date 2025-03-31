<template>
    <div class="navigation-wrapper">
        <!-- Controls -->
        <NavControlOneAtOnce v-if="presentationMode === constants.PresentationModes.ONE_AT_ONCE" ref="navControlOneAtOnce"/>
        <NavControlAllAtOnce v-else ref="navControlAllAtOnce"/>

        <!-- Sidebar Column -->
        <div v-if="controls"
             class="sidebar-column" :class="{
            'sidebar-column-shrink': navbarToggled
        }">
            <NavSidebar :toggled="navbarToggled"
                        :highlighted-section="controls.highlightedSection"
                        @select="_onSidebarLinkClicked"
                        @toggle="_onNavToggle"/>
        </div>

        <!-- Content Columns -->
        <div v-if="controls"
             class="content-column">
            <NavMobileHeader/>

            <NavPillsController v-if="controls.pillsControllerOptions"
                                id="nav-section-picker-default"
                                :options="controls.pillsControllerOptions"
                                :min-items-to-display="2"
                                @select="_onPillControllerLinkClicked"/>

            <NavPillsControllerFixed v-if="controls.pillsControllerOptions"
                                     id="nav-section-picker-fixed"
                                     target="nav-section-picker-default"
                                     :options="controls.pillsControllerOptions"
                                     :min-items-to-display="2"
                                     @select="_onPillControllerLinkClicked"/>

            <div class="slot-wrapper">
                <slot/>
            </div>

            <NavTabController   v-if="controls.tabControllerOptions"
                                :options="controls.tabControllerOptions"
                                @select="_onTabControllerLinkClicked"/>
        </div>
    </div>
</template>

<script setup>
import {computed, inject, ref} from "vue"
import {useConstants} from "/src/composables/constants.js"
import NavMobileHeader from "/src/vue/components/navigation/layout/NavMobileHeader.vue"
import NavControlOneAtOnce from "/src/vue/components/navigation/controls/NavControlOneAtOnce.vue"
import NavControlAllAtOnce from "/src/vue/components/navigation/controls/NavControlAllAtOnce.vue"
import NavSidebar from "/src/vue/components/navigation/sidebar/NavSidebar.vue"
import NavTabController from "/src/vue/components/navigation/tabs/NavTabController.vue"
import NavPillsController from "/src/vue/components/navigation/tabs/NavPillsController.vue"
import NavPillsControllerFixed from "/src/vue/components/navigation/tabs/NavPillsControllerFixed.vue"

const constants = useConstants()

/** @type {{value: String}} */
const presentationMode = inject("presentationMode")

const navControlOneAtOnce = ref(null)
const navControlAllAtOnce = ref(null)
const navbarToggled = ref(false)

const controls = computed(() => {
    if(presentationMode.value === constants.PresentationModes.ONE_AT_ONCE)
        return navControlOneAtOnce.value
    return navControlAllAtOnce.value
})

const _onSidebarLinkClicked = (option) => {
    controls.value && controls.value.onSidebarLinkClicked(option)
}

const _onPillControllerLinkClicked = (option) => {
    controls.value && controls.value.onPillControllerLinkClicked(option)
}

const _onTabControllerLinkClicked = (option) => {
    controls.value && controls.value.onTabControllerLinkClicked(option)
}

const _onNavToggle = (value) => {
    navbarToggled.value = value
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

div.navigation-wrapper {
    display: flex;
    width: 100%;
    min-height: 100vh;
}

div.sidebar-column {
    min-width: $nav-sidebar-width;
    width: $nav-sidebar-width;
    min-height: 100%;
    background-color: $nav-background;

    @include media-breakpoint-down(xl) {
        min-width: $nav-sidebar-width-lg;
        width: $nav-sidebar-width-lg;
    }

    &-shrink {
        min-width: $nav-sidebar-width-shrink;
        width: $nav-sidebar-width-shrink;
    }

    @include media-breakpoint-down($navigation-sidebar-breakpoint) {
        display: none;
    }
}

div.content-column {
    width: 100%;
    background-color: $default-section-background;
    @include media-breakpoint-down($navigation-sidebar-breakpoint) {
        margin-bottom: $nav-tab-controller-height;
    }
}

div.slot-wrapper {
    display: flex;
    flex-direction: column;
}
</style>