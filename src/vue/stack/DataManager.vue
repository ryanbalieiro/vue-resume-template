<template>
    <slot v-if="settings"/>
</template>

<script setup>
import {onMounted, provide, ref} from "vue"
import Category from "/src/models/Category.js"
import Locales from "/src/models/Locales.js"
import Profile from "/src/models/Profile.js"
import Section from "/src/models/Section.js"
import Settings from "/src/models/Settings.js"
import {useUtils} from "/src/composables/utils.js"

const utils = useUtils()
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '')

const categories = ref(null)
const profile = ref(null)
const sections = ref(null)
const settings = ref(null)
const strings = ref(null)
const didLoadAllJsonFiles = ref(false)

onMounted(() => {
    _load().then(() => {
        didLoadAllJsonFiles.value = true
    })
})

const _load = async () => {
    const jSettings = await _loadJson("/settings.json")
    settings.value = new Settings(jSettings)

    const jStrings = await _loadJson("/strings.json")
    strings.value = new Locales(jStrings)

    const jProfile = await _loadJson("/profile.json")
    profile.value = new Profile(jProfile)

    const jSections = await _loadJson("/sections.json")
    const jCategories = await _loadJson("/categories.json")

    _parseSectionsAndCategories(jSections['sections'], jCategories['categories'])
    _validateSectionsAndCategories()
    await _loadSectionJsonFiles()
}

const _parseSectionsAndCategories = (sectionsList, categoriesList) => {
    const parsedSections = []
    const parsedCategories = []

    for(const categoryListItem of categoriesList) {
        const category = new Category(categoryListItem['id'], categoryListItem['faIcon'], categoryListItem['locales'])
        parsedCategories.push(category)
    }

    for(const sectionsListItem of sectionsList) {
        const section = new Section(
            sectionsListItem['id'],
            parsedSections.length === 0,
            sectionsListItem['faIcon'],
            sectionsListItem['jsonPath'],
            sectionsListItem['type'],
            sectionsListItem['locales']
        )

        const sectionCategory = parsedCategories.find(category => category.id === sectionsListItem['categoryId'])
        if(!sectionCategory) {
            throw new Error(`The section with id "${section.id}" has an invalid category id. Make sure the category with id "${sectionsListItem['categoryId']}" exists.`)
        }

        parsedSections.push(section)
        section.category = sectionCategory
        sectionCategory.addSection(section)
    }

    sections.value = parsedSections
    categories.value = parsedCategories.filter(category => category.sections.length)
}

const _validateSectionsAndCategories = () => {
    if(utils.hasDuplications(sections.value, "id")) {
        throw new Error("Each section must have an unique id!")
    }

    if(utils.hasDuplications(categories.value, "id")) {
        throw new Error("Each category must have an unique id!")
    }
}

const _loadSectionJsonFiles = async () => {
    for(const section of sections.value) {
        const path = section.jsonPath
        if(!path)
            continue

        const json = await _loadJson(path)
        const articles =  json['articles']
        if(!articles) {
            throw new Error(`${path} doesn't have an articles array.`)
        }

        section.articles = articles
    }
}

const _loadJson = async (path) => {
    try {
        const response = await fetch(basePath + "/data/" + path)
        return await response.json()
    }
    catch (e) {
        throw new Error(`Couldn't load ${path}. Make sure the file exists and is a valid JSON object.`)
    }
}

provide("categories", categories)
provide("profile", profile)
provide("sections", sections)
provide("settings", settings)
provide("strings", strings)
provide("didLoadAllJsonFiles", didLoadAllJsonFiles)
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>