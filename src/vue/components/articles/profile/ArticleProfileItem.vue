<template>
    <p class="eq-h6"
       v-html="localize(item.locales, 'description')"/>
</template>

<script setup>
import {inject} from "vue"

const props = defineProps({
    item: {
        /** @type {ArticleItem} **/
        type: Object,
        required: true
    }
})

/** @type {Function} */
const localize = inject("localize")
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>