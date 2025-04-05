<template>
    <slot v-if="selectedLanguage"/>
</template>

<script setup>
import {inject, onMounted, provide, ref} from "vue"

/** @type {{value:Settings}} */
const settings = inject("settings")

/** @type {{value:Locales}} */
const strings = inject("strings")

const supportedLanguages = settings.value.supportedLanguages
const defaultLanguage = ref(null)
const selectedLanguage = ref(null)
const localStorageId = "language-manager"

onMounted(() => {
    if (!supportedLanguages.length) {
        throw new Error("You must add at least one language to the supported languages setting.");
    }

    const savedId = window.localStorage.getItem(localStorageId)
    defaultLanguage.value = supportedLanguages.find(language => language.isDefault)

    selectedLanguage.value =
        supportedLanguages.find(language => language.id === savedId) ||
        supportedLanguages.find(language => navigator.language.includes(language.id)) ||
        defaultLanguage.value ||
        supportedLanguages[0]

    setSelectedLanguageWithId(selectedLanguage.value.id)
})

const setSelectedLanguageWithId = (languageId) => {
    const targetLanguage = supportedLanguages.find(language => language.id === languageId)
    if(targetLanguage) {
        selectedLanguage.value = targetLanguage
        window.localStorage.setItem(localStorageId, targetLanguage.id)
    }
}

/**
 * @param {Locales} locales
 * @param {String} key
 * @param {Boolean} [returnNullIfNotFound=false]
 */
const localize = (locales, key, returnNullIfNotFound) => {
    if(!locales)
        return ''

    const translation = locales.getTranslation(key, selectedLanguage.value, defaultLanguage.value)
    if(typeof translation !== 'string' || !translation.includes('locales.'))
        return translation

    return returnNullIfNotFound ?
        null :
        translation
}

/**
 * @param {String} key
 */
const localizeFromStrings = (key) => {
    return localize(strings.value, key)
}

/**
 * @param {Date|String} dateOrString
 * @return {string}
 */
const localizeDate = (dateOrString) => {
    if(!dateOrString)
        return 'date.null'

    if(typeof dateOrString === 'string')
        return `<strong>${localizeFromStrings(dateOrString)}</strong>`

    const languageId = selectedLanguage.value?.id || defaultLanguage.value?.id || "en"
    const localeString = dateOrString.toLocaleString(
        String(languageId),
        { year: 'numeric', month: 'short'}
    )

    const formattedString = localeString.charAt(0).toUpperCase() + localeString.slice(1).replaceAll('.', '')
    return formattedString.replace(/\d{4}/, (year) => `<strong>${year}</strong>`)
}

provide("selectedLanguage", selectedLanguage)
provide("defaultLanguage", defaultLanguage)
provide("setSelectedLanguageWithId", setSelectedLanguageWithId)
provide("localize", localize)
provide("localizeFromStrings", localizeFromStrings)
provide("localizeDate", localizeDate)
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>