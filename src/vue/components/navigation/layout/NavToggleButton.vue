<template>
    <button class="nav-toggle-button" :class="`${toggled ? 'nav-toggle-button-toggled' : ''}`">
        <i :class="faIcon"/>
    </button>
</template>

<script setup>
import {computed} from "vue"

const props = defineProps({
    toggled: Boolean
})

const faIcon = computed(() => {
    return props.toggled ?
        `fa-solid fa-caret-right` :
        `fa-solid fa-caret-left`
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

button.nav-toggle-button {
    background-color: $nav-background;
    color: $nav-contrast-90;

    border: 2px solid lighten($nav-background, 6%);
    border-radius: 100%;
    width: 35px;
    height: 35px;
    font-size: 0.95rem;

    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;

    &:hover {
        background-color: lighten($nav-background, 6%);
    }

    &-toggled {
        width: 30px;
        height: 30px;
        font-size: 0.85rem;
    }
}
</style>