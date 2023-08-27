<template>
    <div v-if="language.supportsMultipleLanguages()" class="language-picker">
        <!-- Bootstrap Dropdown -->
        <div class="dropdown">
            <!-- Dropdown Toggle Button -->
            <button class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <!-- Selected Flag Icon -->
                <img :alt="selectedLanguage['name']"
                     :src="selectedLanguage['flagUrl']"
                     class="img-fluid img-selected-language-flag">

                <!-- Selected Language Name -->
                <span class="dropdown-item-label d-none d-lg-inline">
                    {{selectedLanguage['name']}}
                </span>
            </button>

            <!-- Dropdown Menu -->
            <ul class="dropdown-menu">
                <!-- Dropdown Item -->
                <li v-for="lang in availableLanguages">
                    <button class="dropdown-item" @click="_onLanguageSelected(lang)">
                        <!-- Language Flag Icon -->
                        <img :alt="lang['name']"
                             :src="lang['flagUrl']"
                             class="img-fluid img-language-flag">

                        <!-- Language Name -->
                        <span class="dropdown-item-label">
                            {{lang['name']}}
                        </span>
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import Dropdown from '/node_modules/bootstrap/js/src/dropdown'
import {useLanguage} from "../../composables/language.js"
import {computed} from "vue"
import {useLayout} from "../../composables/layout.js"
import {useData} from "../../composables/data.js"

const data = useData()
const language = useLanguage()
const layout = useLayout()

/**
 * @type {ComputedRef<Object>}
 */
const selectedLanguage = computed(() => {
    return language.getSelectedLanguage()
})

/**
 * @type {ComputedRef<Object[]>}
 */
const availableLanguages = computed(() => {
    return language.getAvailableLanguages()
})

/**
 * @param {Object} lang
 * @private
 */
const _onLanguageSelected = (lang) => {
    const feedbackView = layout.getFeedbackView()
    feedbackView.showActivitySpinner(data.getString('changingLanguage') + "...")

    setTimeout(() => {
        language.selectLanguage(lang)
        feedbackView.hideActivitySpinner()
    }, 300)
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

$menu-background-color:lighten($nav-background-color, 5%);
$menu-border-color:darken($nav-background-color, 1%);
$menu-hover-background-color:lighten($nav-background-color, 10%);

.dropdown-toggle {
    border-width: 0;
    opacity: 0.9;
    background-color: transparent;
    color: $white;

    &:hover {
        opacity: 1;
    }
}

li {
    &:not(:last-child) {
        border-bottom: 1px solid $menu-border-color;
    }
}

.dropdown-menu {
    padding: 1px;
    border: 3px solid $menu-border-color;
    background-color: $menu-background-color;
}

.dropdown-item {
    padding: 10px 15px;
    background-color: $menu-background-color;
    color: $white;

    &:hover {
        background-color: $menu-hover-background-color;
    }
}

.dropdown-item-label {
    margin-left: 8px;
    font-family: $custom-subheadings-font-family;
    font-size: 0.9rem;
}

.img-language-flag {
    width: 20px;
    height: 20px;
}

.img-selected-language-flag {
    width: 24px;
    height: 24px;
}
</style>