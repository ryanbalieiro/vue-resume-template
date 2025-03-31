<template>
    <nav v-show="shouldDisplay"
         :id="id"
         class="nav-mobile-section-picker">
        <button v-for="option in options"
                class="nav-picker-pill"
                :class="option.active ? 'nav-picker-pill-selected' : ''"
                @click="_onOptionSelected(option)">
            <i :class="option.model.faIcon"/>
            <span v-html="localize(option.model.locales, 'nav_label')"/>
        </button>
    </nav>
</template>

<script setup>
import {computed, inject} from "vue"

const props = defineProps({
    id: String,
    options: Object,
    minItemsToDisplay: Number
})

const emit = defineEmits(['select'])

/** @type {Function} */
const localize = inject("localize")

const shouldDisplay = computed(() => {
    return props.options.length >= props.minItemsToDisplay
})

const _onOptionSelected = (option) => {
    emit('select', option.model || option)
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

nav.nav-mobile-section-picker {
    width: 100%;
    height: $nav-section-picker-height;
    z-index: $z-index-tab-controller;
    @include media-breakpoint-down(sm) {
        height: $nav-section-picker-height-compressed;
    }

    background-color: $nav-background;

    display: flex;
    justify-content: space-evenly;
    align-items: center;

    @include media-breakpoint-up($navigation-sidebar-breakpoint) {
        display: none;
    }
}

button.nav-picker-pill {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;

    text-transform: uppercase;
    padding: 5px;

    border: none;
    border-top: 2px solid lighten($nav-background, 5%);
    background-color: $nav-background;
    color: $nav-contrast-40;
    font-size: 0.9rem;

    i {
        color: $nav-contrast-20;
        margin-right: 5px;
        @include media-breakpoint-down(sm) {
            font-size: 1rem;
        }
    }

    span {
        @include media-breakpoint-down(sm) {
            display: none;
        }
    }
}

button.nav-picker-pill:hover {
    i, span {
        color: $nav-highlight;
    }
}

button.nav-picker-pill-selected {
    background-color: $nav-background-selected;
    border-top-color: $nav-selected;
    i {
        color: $nav-selected!important;
    }
    span {
        color: $nav-highlight!important;
    }
}
</style>