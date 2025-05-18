<template>
    <div v-if="supportsMultipleLanguages"
         class="language-picker"
         :class="{
             'language-picker-shrink': shouldCompress
         }">
        <!-- Bootstrap Dropdown -->
        <div class="dropdown">
            <!-- Toggle -->
            <button class="dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">

                <!-- Selected Flag Icon -->
                <img :alt="selectedLanguage.name"
                     :src="utils.resolvePath(selectedLanguage.flagUrl)"
                     class="language-flag language-flag-selected">

                <span class="language-name language-name-selected"
                      v-html="selectedLanguage.name"/>

                <i class="fa-solid fa-caret-down ms-1"/>
            </button>

            <!-- Menu -->
            <ul class="dropdown-menu">
                <!-- Dropdown Item -->
                <li v-for="language in availableLanguages">
                    <button class="dropdown-item"
                            @click="_onLanguageSelected(language)">

                        <!-- Language Flag Icon -->
                        <img :alt="language.name"
                             :src="utils.resolvePath(language.flagUrl)"
                             class="language-flag">

                        <!-- Language Name -->
                        <span class="language-name"
                              v-html="language.name">
                        </span>
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import {computed, inject} from "vue"
import Dropdown from 'bootstrap/js/src/dropdown'
import {useUtils} from "/src/composables/utils.js"
import {useConstants} from "/src/composables/constants.js"

const constants = useConstants()
const utils = useUtils()

const props = defineProps({
    shrink: Boolean
})

/** @type {{value:Settings}} */
const settings = inject("settings")

/** @type {{value:Locales}} */
const strings = inject("strings")

/** @type {{value:Language}} */
const selectedLanguage = inject("selectedLanguage")

/** @type {{value:String}} */
const presentationMode = inject("presentationMode")

/** @type {Function} */
const setSelectedLanguageWithId = inject("setSelectedLanguageWithId")

/** @type {Function} */
const setSpinnerEnabled = inject("setSpinnerEnabled")

/** @type {{value: Boolean}} */
const isMobileLayout = inject("isMobileLayout")

const supportsMultipleLanguages = computed(() => {
    return settings.value.supportedLanguages.length >= 2
})

const availableLanguages = computed(() => {
    return settings.value.supportedLanguages.filter(
        language => language.id !== selectedLanguage.value.id
    )
})

const shouldCompress = computed(() => {
    return props.shrink || isMobileLayout.value
})

const _onLanguageSelected = (language) => {
    if(presentationMode.value === constants.PresentationModes.ONE_AT_ONCE) {
        setSelectedLanguageWithId(language.id)
        return
    }
    
    setSpinnerEnabled(true, strings.value.getTranslation("changing_language", language, language))
    setTimeout(() => {
        setSelectedLanguageWithId(language.id)
        setSpinnerEnabled(false)
    }, 300)
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

button.dropdown-toggle {
    border-width: 0;
    background-color: transparent;
    padding: 10px 15px;
    border-radius: $default-border-radius;
    color: $nav-contrast;
    opacity: 0.9;
    outline: none;

    &:hover {
        opacity: 1;
    }

    &:after {
        display:none;
    }

    display: flex;
    align-items: center;
    justify-content: center;
}

img.language-flag {
    width: 20px;
    height: 20px;

    &-selected {
        width: 24px;
        height: 24px;
    }
}

span.language-name {
    margin-left: 10px;
    font-size: 0.9rem;
    margin-right: 4px;
}

ul.dropdown-menu {
    background-color: lighten($nav-background, 5%);
    border-radius: $default-border-radius;
    padding: 0;
    border-color: darken($nav-background, 1%);
    overflow: hidden;
}

button.dropdown-item {
    padding: 10px 15px;
    color: $nav-contrast;
    &:hover {
        background-color: $primary;
    }
}

div.language-picker-shrink {
    span.language-name-selected {
        display: none;
    }

    img.language-flag {
        margin: 0 4px;
    }

    ul.dropdown-menu {
        width: 30px!important;
    }
}
</style>