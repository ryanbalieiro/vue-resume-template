<template>
    <div class="info-badge" :class="`info-badge-variant-${variant}`">
        <i :class="props.faIcon"/>
        <span v-html="value"/>
    </div>
</template>

<script setup>
const props = defineProps({
    faIcon: String,
    variant: String,
    value: String
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

div.info-badge {
    display: inline-flex;
    align-items: center;
    justify-content: start;

    background-color: lighten($default-section-background, 3%);
    border: 1px solid rgba(black, 0.1);
    border-radius: $default-border-radius;
    white-space: nowrap;

    padding: 4px 12px;
    font-size: 0.8rem;

    i {
        margin-right: 5px;
        color: $nav-background-selected;
    }

    span {
        width: 100%;
        text-align: center;
    }

    @include media-breakpoint-down(xl) {
        font-size: 0.75rem;
        padding: 3px 12px;
    }

    @include media-breakpoint-down(lg) {
        font-size: 0.725rem;
        padding: 3px 10px;
    }

    @include media-breakpoint-down(sm) {
        font-size: 0.7rem;
        padding: 3px 9px;
    }
}

div.info-badge-variant-nav {
    background-color: $nav-background;
    color: $light;
    i {
        color: $light;
        opacity: 0.6;
    }
}
</style>