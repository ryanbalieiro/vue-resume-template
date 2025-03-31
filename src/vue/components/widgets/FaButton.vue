<template>
    <button class="fa-button"
            :class="`fa-button-variant-${variant} fa-button-variant-size-${size}`">
        <i :class="faIcon"/>
    </button>
</template>

<script setup>
const props = defineProps({
    faIcon: String,
    variant: String,
    size: String|Number,
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

button.fa-button {
    padding: 0;
    margin: 0;
    border-color: transparent;
    border-radius: 100%;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    aspect-ratio: 1/1;
}

button.fa-button-variant-transparent {
    color: $light-4;
    background-color: transparent;
    &:hover {
        color: $primary;
    }
}

@for $i from 1 through 7 {
    button.fa-button-variant-size-#{$i} {
        font-size: #{1rem + ($i - 1) * 0.25rem};
        width: #{20px + ($i - 1) * 10px};
    }
}
</style>