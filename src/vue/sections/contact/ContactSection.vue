<template>
    <SectionTemplate :section-data="props.sectionData">
        <!-- Form -->
        <ContactForm v-if="contactFormEnabled" />

        <!-- SubHeading -->
        <SubHeading v-if="contactFormEnabled"
            :title="props.sectionData['content']['locales']['subtitle']"
            :description="props.sectionData['content']['locales']['subtitleDescription']"
            class="mt-4" />

        <!-- Contact Items -->
        <ContactOptions
            :items="props.sectionData['content']['items']"
            :display-as-list="false"/>
    </SectionTemplate>
</template>

<script setup>
import SectionTemplate from "../_templates/SectionTemplate.vue"
import {useData} from "../../../composables/data.js"
import SubHeading from "../_templates/SubHeading.vue"
import ContactForm from "./ContactForm.vue"
import ContactOptions from "./ContactOptions.vue"
import {computed} from "vue"

/**
 * @property {Object} sectionData
 */
const props = defineProps({
    sectionData: Object
})

const data = useData()

const contactFormEnabled = computed(() => {
    return data.getSettings()['contactFormEnabled']
})
</script>

<style lang="scss" scoped>
</style>