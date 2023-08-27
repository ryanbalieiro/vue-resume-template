<template>
    <div class="social-links">
        <!-- Social Button -->
        <a v-for="item in props.items" class="btn btn-social" target="_blank"
           :href="item['href']"
           :aria-label="item['faIcon']">

            <!-- Social Button Icon -->
            <i :class="item['faIcon']"/>
        </a>
    </div>
</template>

<script setup>
/**
 * @property {{href:String, faIcon:String}[]} items
 */
const props = defineProps({
    items: Array
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

$sizes: (xxxl: 1.45rem, xl: 1.4rem, lg: 1.25rem, md: 1.1rem);

.btn-social {
    display: inline-flex;
    justify-content: center;
    align-items: center;

    border-radius: 100%;
    border-width: 4px;
    border-color: lighten($dark, 7%);

    background-color: lighten($dark, 5%);
    color: $white;

    &:hover, &:active {
        color: $white;
        border-color: darken($primary, 5%);
        background-color: $primary;
    }

    &:not(:first-child),
    &:not(:last-child) {
        margin: 0 0.3rem;
    }

    @each $size, $value in $sizes {
        $dimension: $value * 2.4;

        @include media-breakpoint-down(#{$size}) {
            width: $dimension;
            height: $dimension;
            font-size: $value;
        }
    }
}
</style>