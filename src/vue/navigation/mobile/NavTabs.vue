<template>
    <div class="nav-tabs-wrapper">
        <nav class="nav-tabs">
            <!-- Nav Tab Item -->
            <button v-for="category in data.getCategories()" :class="_getNavTabClassList(category)" @click="_onLinkClicked(category)">
                <!-- Item Content -->
                <i class="nav-tab-button-icon" :class="category['faIcon']"/>
                <span class="nav-tab-button-label">{{data.getString(category['id'])}}</span>
            </button>
        </nav>
    </div>
</template>

<script setup>
import {useData} from "../../../composables/data.js"
import {useNavigation} from "../../../composables/navigation.js"

const emit = defineEmits(['linkClicked'])
const data = useData()
const navigation = useNavigation()

/**
 * @param {Object} category
 * @private
 */
const _getNavTabClassList = (category) => {
    let classList = 'nav-tab-button'

    if(navigation.isCategoryActive(category['id'])) {
        classList += ' nav-tab-button-selected'
    }

    return classList
}

/**
 * @param {Object} category
 * @private
 */
const _onLinkClicked = (category) => {
    emit('linkClicked', category['id'])
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.nav-tabs-wrapper {
    height: $nav-tabs-height;
    width: 100vw;
    background-color: darken($nav-background-color, 1%);
}

.nav-tabs {
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    height: 100%;
    width: 100%;
    border-bottom: none;
}

.nav-tab-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    background-color: transparent;
    border-width: 0;
}

.nav-tab-button-icon {
    @include generate-dynamic-styles-with-hash((
        xxxl:   (font-size: 1rem),
        sm:     (font-size: 0.9rem),
    ));

    color: $nav-item-grayed-out-color;
    transition: color 0.2s;
}

.nav-tab-button-label {
    @include generate-dynamic-styles-with-hash((
        xxxl:   (font-size: 0.7rem),
        sm:     (font-size: 0.55rem),
    ));

    margin-top:0.3rem;
    font-family: $headings-font-family;
    text-transform: uppercase;
    color: $light-2;
    transition: color 0.2s;
}

.nav-tab-button:hover, .nav-tab-button-selected {
    .nav-tab-button-icon {
        color: $nav-item-lighten-color;
    }

    .nav-tab-button-label {
        color: $nav-item-lighten-color;
    }
}
</style>