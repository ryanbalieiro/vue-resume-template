<template>
    <div class="article-header mb-4 mb-lg-4">
        <h3 class="article-title">
            <span v-html="title"/>

            <i v-if="faIcon"
               class="ms-2"
               :class="faIcon"/>
        </h3>

        <div v-if="description"
             class="article-description">
            <p class="eq-h6 mb-0 text-light-6" v-html="description"/>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: String,
    description: String,
    faIcon: String
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

h3.article-title {
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0;
    @include media-breakpoint-down(md) {
        letter-spacing: 0;
    }

    i {
        opacity: 0.95;
        color: $nav-background-selected;
    }
}
</style>