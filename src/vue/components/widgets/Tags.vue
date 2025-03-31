<template>
    <ul class="tags">
        <li class="tag-item text-1" v-for="tag in tags">
            <span v-html="tag.label || tag"/>
        </li>
    </ul>
</template>

<script setup>
const props = defineProps({
    tags: Object
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

ul.tags {
    display: block;
    list-style: none;
    padding: 0;
    margin: 0;
    line-height: 20px;
}

li.tag-item {
    display: inline-flex;
    background-color: $primary;
    color: $white;
    border-radius: 5px;
    text-transform: lowercase;
    white-space: nowrap;
    user-select: none;
    transition: 0.2s background-color ease-out;

    &:hover {
        background-color: darken($primary, 15%);
    }

    margin-right: 4px;
    margin-bottom: 4px;
    padding: 3px 10px;

    @include media-breakpoint-down(md) {
        margin-right: 3px;
        margin-bottom: 3px;
        padding: 2px 8px;
    }
}
</style>