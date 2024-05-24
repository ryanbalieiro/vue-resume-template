<template>
    <div class="social-links">
        <!-- Social Button -->
        <a v-for="item in props.items" class="btn btn-social" target="_blank"
           :href="item['href']"
           :aria-label="item['faIcon']">

            <!-- ToolTip -->
            <div class="social-link-tooltip text-1" v-if="item['id']">
                {{item['id']}}
            </div>

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

.social-link-tooltip {
    position: absolute;
    margin-top: -6rem;
    text-transform: capitalize;
    font-family: $custom-subheadings-font-family;
    background-color: darken($primary, 20%);
    color:$text-normal-contrast;
    padding: 0.2rem 0.6rem;
    border-radius: 10px;
    display: none;

    &::before {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: darken($primary, 20%) transparent transparent transparent;
    }
}

.btn-social:hover {
    .social-link-tooltip {
        @include media-breakpoint-up(md) {
            display: block!important;
        }
    }
}
</style>