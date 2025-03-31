<template>
    <div class="section-body" :class="`section-body-${model.type}`">
        <component v-for="mappedArticle in mappedArticles"
                   :is="mappedArticle.component"
                   :section-model="model"
                   :model="mappedArticle.model"/>
    </div>
</template>

<script setup>
import ArticleContactForm from "/src/vue/components/articles/contact/ArticleContactForm.vue"
import ArticleContactOptions from "/src/vue/components/articles/contact/ArticleContactOptions.vue"
import ArticlePortfolio from "/src/vue/components/articles/portfolio/ArticlePortfolio.vue"
import ArticleProfile from "/src/vue/components/articles/profile/ArticleProfile.vue"
import ArticleSkills from "/src/vue/components/articles/skills/ArticleSkills.vue"
import ArticleTimeline from "/src/vue/components/articles/timeline/ArticleTimeline.vue"
import ArticleThread from "/src/vue/components/articles/thread/ArticleThread.vue"
import ArticleUnavailable from "/src/vue/components/articles/unavailable/ArticleUnavailable.vue"
import {computed} from "vue"

const props = defineProps({
    /** @type {Section} **/
    model: {
        type: Object,
        required: true
    }
})

const ARTICLES_MAP = {
    ArticleContactForm,
    ArticleContactOptions,
    ArticlePortfolio,
    ArticleProfile,
    ArticleSkills,
    ArticleThread,
    ArticleTimeline
}

const mappedArticles = computed(() => {
    return props.model.articles.map(article => {
        const component = ARTICLES_MAP[article.componentName]

        return {
            model: article,
            component: component || ArticleUnavailable,
        }
    })
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

div.section-body {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

div.section-body-row {
    flex-direction: row;
    @include media-breakpoint-down(xxl) {
        flex-direction: column;
    }
}

div.section-body-centered {
    @include media-breakpoint-up($navigation-sidebar-breakpoint) {
        height: 100%;
        justify-content: center;
    }
}
</style>