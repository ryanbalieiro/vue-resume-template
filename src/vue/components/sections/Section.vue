<template>
    <section :id="model.htmlId"
             v-show="visible"
             class="resume-section"
             :class="{
                'resume-section-svh': utils.isIOS(),
                'resume-section-with-divider': presentationMode === constants.PresentationModes.ALL_AT_ONCE,
                'resume-section-cover': !model.isDefault
             }">
        <div class="resume-section-content">
            <SectionHeader v-if="model.isDefault || isMobileLayout"
                           :model="model"/>

            <SectionBody :model="model"/>
        </div>
    </section>
</template>

<script setup>
import Section from "/src/models/Section.js"
import {computed, inject} from "vue"
import {useConstants} from "/src/composables/constants.js"
import SectionHeader from "/src/vue/components/sections/SectionHeader.vue"
import SectionBody from "/src/vue/components/sections/SectionBody.vue"
import {useUtils} from "/src/composables/utils.js"

const constants = useConstants()
const utils = useUtils()

/** @type {{value:Boolean}} */
const isMobileLayout = inject("isMobileLayout")

const props = defineProps({
    /** @type {Section} **/
    model: {
        type: Object,
        required: true
    },

    presentationMode: String,
    active: Boolean
})

const visible = computed(() => {
    if(!props.presentationMode || props.presentationMode === constants.PresentationModes.NONE)
        return false
    if(props.presentationMode === constants.PresentationModes.ALL_AT_ONCE)
        return true
    return props.active
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

section.resume-section {
    display: flex;
    min-height: 100vh;

    @include media-breakpoint-down($navigation-sidebar-breakpoint) {
        min-height: calc(100vh - $nav-tab-controller-height - 220px);
    }

    @media (min-height: 900px) {
        min-height: 900px;
    }

    &-svh {
        min-height: 100vh;
        min-height: 100svh;

        @include media-breakpoint-down($navigation-sidebar-breakpoint) {
            min-height: calc(100vh - $nav-tab-controller-height - 220px);
            min-height: calc(100vh - $nav-tab-controller-height + 2px);
        }
    }
}

section.resume-section-cover {
    @media (min-height: 900px) {
        min-height: 100vh;
    }

    @include media-breakpoint-down($navigation-sidebar-breakpoint) {
        min-height: 50vh;
    }
}

section.resume-section-with-divider {
    border-bottom: 1px solid $nav-background;
}

div.resume-section-content {
    @include generate-dynamic-styles-with-hash((
        xxxl:   (padding: 4.5rem 4.5rem 4.5rem),
        xxl:    (padding: 4rem 4rem 4.25rem),
        lg:     (padding: 2rem 2rem 3rem),
        md:     (padding: 1.5rem 1.5rem 2rem),
        sm:     (padding: 1.5rem 1.2rem 2rem)
    ));

    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: $max-content-width;
}
</style>