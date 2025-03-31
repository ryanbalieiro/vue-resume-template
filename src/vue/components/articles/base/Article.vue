<template>
    <article class="article" :class="{
        'article-with-margin-bottom': sectionType === Section.Types.COLUMN,
        'article-with-margin-right': sectionType === Section.Types.ROW,
        'article-with-no-margin': sectionType === Section.Types.CENTERED,
    }">
        <ArticleTitle v-if="title"
                      :title="title"
                      :description="description"
                      :fa-icon="model.faIcon"/>
        <slot/>
    </article>
</template>

<script setup>
import {computed, inject} from "vue"
import ArticleTitle from "/src/vue/components/articles/base/ArticleTitle.vue"
import Section from "/src/models/Section.js"

const props = defineProps({
    model: {
        type: Object,
        required: true
    }
})

/** @type {Function} */
const localize = inject("localize")

const sectionType = computed(() => {
    return props.model.section?.type
})

const title = computed(() => {
    return localize(props.model.locales, "title", true)
})

const description = computed(() => {
    return localize(props.model.locales, "description", true)
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

article.article {
    color: $text-default-color;
    overflow: hidden;
    width: 100%;
}

article.article-with-margin-bottom {
    &:not(:last-child) {
        margin-bottom: 60px;
    }
}

article.article-with-margin-right {
    &:not(:last-child) {
        margin-right: 80px;
        @include media-breakpoint-down(xxl) {
            margin-right: 0;
            margin-bottom: 45px;
        }
    }
}

article.article-with-margin-bottom, article.article-with-margin-right {
    &:not(:last-child) {
        @include media-breakpoint-down(lg) {
            margin-bottom: 40px;
        }
        @include media-breakpoint-down(sm) {
            margin-bottom: 35px;
        }
    }
}
</style>