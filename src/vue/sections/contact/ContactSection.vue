<template>
    <SectionTemplate :section-data="props.sectionData">
        <!-- Form -->
        <ContactForm />

        <!-- SubHeading -->
        <SubHeading :title="props.sectionData['content']['locales']['subtitle']"
                    :description="props.sectionData['content']['locales']['subtitleDescription']"
                    class="mt-4"/>

        <!-- Contact Items -->
        <ContactOptions :items="props.sectionData['content']['items']" />
    </SectionTemplate>
</template>

<script setup>
import SectionTemplate from "../_templates/SectionTemplate.vue"
import {useData} from "../../../composables/data.js"
import SubHeading from "../_templates/SubHeading.vue"
import ContactForm from "./ContactForm.vue"
import ContactOptions from "./ContactOptions.vue"

/**
 * @property {Object} sectionData
 */
const props = defineProps({
    sectionData: Object
})

const data = useData()
</script>

<style lang="scss" scoped>
</style>