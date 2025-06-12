<template>
    <div v-if="links.length"
         class="links">
        <a v-for="link in links"
           :href="link.href"
           target="_blank"
           class="link-darkened link-item">
            <i v-if="link.faIcon" :class="link.faIcon" class="me-1"/>
            <span v-html="_getLabel(link)"/>
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

const _getLabel = (link) => {
    if(link['staticLabel'])
        return link['staticLabel']
    return localizeFromStrings(link['stringKey'])
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

div.links {
    display: flex;
    flex-direction: column;
    align-items: start;
}

a.link-item {
    display: block;
}
</style>