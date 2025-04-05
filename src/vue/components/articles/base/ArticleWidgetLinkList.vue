<template>
    <div v-if="links.length"
         class="links">
        <a v-for="link in links"
           :href="link.href"
           target="_blank"
           class="link-darkened d-block">
            <i v-if="link.faIcon" :class="link.faIcon" class="me-1"/>
            <span v-html="localizeFromStrings(link['stringKey'])"/>
            <i class="fa-solid fa-arrow-up-right-dots ms-1"/>
        </a>
    </div>
</template>

<script setup>
import {inject} from "vue"

const props = defineProps({
    links: Array
})

/** @type {Function} */
const localizeFromStrings = inject("localizeFromStrings")
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>