<template>
    <Article class="article-thread"
             :model="model">
        <ul class="thread">
            <!-- Items -->
            <ArticleThreadItem v-for="item in model.items"
                               :item="item"/>

            <!-- Trailing Item -->
            <ArticleThreadItem/>
        </ul>
    </Article>
</template>

<script setup>
import Article from "/src/vue/components/articles/base/Article.vue"
import ArticleThreadItem from "/src/vue/components/articles/thread/ArticleThreadItem.vue"

const props = defineProps({
    /** @type {Article} **/
    model: {
        type: Object,
        required: true
    }
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

ul.thread {
    position: relative;
    padding: 0;
    margin: 0;
    list-style: none;
}

ul.thread:before {
    position: absolute;
    top: 0;
    bottom: 0;
    content: "";
    background-color: $article-thread-line-color;
    z-index: 1;

    @each $breakpoint, $multiplier in $article-thread-scale-multipliers {
        @include media-breakpoint-down($breakpoint) {
            width: calc(4px * $multiplier);
            margin-left: calc(($article-thread-circle-base-size/2 - 2px) * $multiplier);
            height: calc(100%);
        }
    }
}
</style>