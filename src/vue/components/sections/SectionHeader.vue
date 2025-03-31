<template>
    <div class="resume-section-header" :class="!description ? 'resume-section-header-no-description' : ''">
        <h1 class="title mb-1 mb-lg-2"
            v-html="title"/>

        <SolidDivider class="mx-2 mt-2 mb-3"/>

        <p v-if="description"
           class="eq-h6 mb-0 text-light-6" v-html="description"/>
    </div>
</template>

<script setup>
import {computed, inject} from "vue"
import SolidDivider from "/src/vue/components/widgets/SolidDivider.vue"

const props = defineProps({
    /** @type {Section} **/
    model: {
        type: Object,
        required: true
    }
})

/** @type {{value:Boolean}} */
const isScreenXlOrLarger = inject("isScreenXlOrLarger")

/** @type {Function} */
const localize = inject("localize")

const title = computed(() => {
    const title = localize(props.model.locales, "title", true)
    const titleShort = localize(props.model.locales, "title_short", true)
    const navTitle = localize(props.model.locales, "nav_label")

    if(!isScreenXlOrLarger.value)
        return titleShort ? titleShort : navTitle
    return title ? title : navTitle
})

const description = computed(() => {
    const description = localize(props.model.locales, "description")
    if(description.includes('locales.'))
        return null
    return description
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

div.resume-section-header {
    @include generate-dynamic-styles-with-hash((
        xxxl: (margin-bottom:2rem),
        xxl: (margin-bottom:1.75rem),
        xl: (margin-bottom:1.5rem),
        lg: (margin-bottom:1.5rem),
        md: (margin-bottom:1.5rem),
    ))
}

div.resume-section-header-no-description {
    @include generate-dynamic-styles-with-hash((
        xxxl: (margin-bottom: 1.25rem),
        xxl: (margin-bottom: 1rem),
        xl: (margin-bottom: 0.75rem),
        lg: (margin-bottom: 0.5rem),
        sm: (margin-bottom: 0.35rem),
    ))
}

h1.title {
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    @include media-breakpoint-down(md) {
        letter-spacing: 1px;
    }
}

p.lead {
    color: $text-muted;
}
</style>