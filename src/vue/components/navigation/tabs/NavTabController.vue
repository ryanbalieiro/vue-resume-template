<template>
    <nav class="nav-mobile-tab-controller"
         :class="shouldAddChromeBottomOffset ? 'nav-mobile-tab-controller-with-bottom-offset' : ''">
        <button v-if="shouldDisplayArrows && activeOptionIndex > 0"
                class="nav-mobile-tab-button"
                @click="_onPreviousButton">
            <i class="fa-solid fa-caret-left"/>
        </button>

        <button v-for="option in visibleOptions"
                class="nav-mobile-tab-button"
                :class="{
                    'nav-mobile-tab-button-selected': option.active
                }"
                @click="_onOptionSelected(option)">
            <i :class="option.model.faIcon"/>
            <span v-html="localize(option.model.locales, 'nav_label')"/>
        </button>

        <button v-if="shouldDisplayArrows && activeOptionIndex < options.length - 2"
                class="nav-mobile-tab-button"
                @click="_onNextButton">
            <i class="fa-solid fa-caret-right"/>
        </button>
    </nav>
</template>

<script setup>
import {computed, inject} from "vue"

const props = defineProps({
    options: Object
})

const emit = defineEmits(['select'])

/** @type {Function} */
const localize = inject("localize")

/** @type {{value: Boolean}} */
const shouldAddChromeBottomOffset = inject("shouldAddChromeBottomOffset")

const shouldDisplayArrows = computed(() => {
    return props.options.length >= 5
})

const visibleOptions = computed(() => {
    if(!shouldDisplayArrows.value) {
        return props.options
    }

    const activeOption = props.options.find(option => option.active) || props.options[0]
    const activeOptionIndex = props.options.indexOf(activeOption)

    return activeOptionIndex === props.options.length - 1
        ? [props.options[activeOptionIndex - 1], activeOption]
        : [activeOption, props.options[activeOptionIndex + 1]]
})

const activeOptionIndex = computed(() => {
    const activeOption = props.options.find(option => option.active) || props.options[0]
    return props.options.indexOf(activeOption)
})

const _onPreviousButton = () => {
    const previousOption = props.options[activeOptionIndex.value - 1]
    if(previousOption) {
        _onOptionSelected(previousOption)
    }
}

const _onNextButton = () => {
    const nextOption = props.options[activeOptionIndex.value + 1]
    if(nextOption) {
        _onOptionSelected(nextOption)
    }
}

const _onOptionSelected = (option) => {
    emit('select', option.model || option)
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

nav.nav-mobile-tab-controller {
    position: fixed;
    width: 100%;
    height: $nav-tab-controller-height;
    background-color: $nav-background;
    bottom: 0;
    left: 0;
    z-index: $z-index-tab-controller;

    display: flex;
    justify-content: space-evenly;
    align-items: center;
    transition: 0.1s height ease-out;

    @include media-breakpoint-up($navigation-sidebar-breakpoint) {
        display: none;
    }
}

nav.nav-mobile-tab-controller-with-bottom-offset {
    height: $nav-tab-controller-with-bottom-offset-height;
    button.nav-mobile-tab-button {
        padding-bottom: 12px;
    }
}

button.nav-mobile-tab-button {
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: 0;
    outline: none;
    border-top: 2px solid lighten($nav-background, 20%);
    transition: 0.1s padding-bottom ease-out;

    i {
        color: $nav-contrast-20;
        font-size: 1rem;
        @include media-breakpoint-down(sm) {
            font-size: 0.9rem;
        }
    }

    span {
        color: $nav-contrast-40;
        font-size: 0.8rem;
        margin-top: 3px;

        @include media-breakpoint-down(sm) {
            font-size: 0.7rem;
        }
    }
}

button.nav-mobile-tab-button:hover {
    i, span {
        color: $nav-highlight;
    }
}

button.nav-mobile-tab-button-selected {
    background-color: $nav-background-selected;
    border-top-color: $nav-selected;
    i {
        color: $nav-selected!important;
    }
    span {
        color: $nav-highlight!important;
    }
}

button.nav-mobile-tab-button-disabled {
    opacity: 0.1;
    user-select: none;
    pointer-events: none;
}
</style>