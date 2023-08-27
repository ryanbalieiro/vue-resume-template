<template>
    <SectionTemplate :section-data="props.sectionData">
        <!-- Threads Grid -->
        <div class="row g-4 g-lg-5">
            <div v-for="subcategory in props.sectionData['content']['subcategories']" class="col-12 col-xxl-6 thread-container">
                <!-- Category Name -->
                <SubHeading :title="subcategory['locales']['title']"
                            :fa-icon="subcategory['faIcon']"/>

                <Thread :items="props.sectionData['content']['items'][subcategory['id']]"
                        :link-label="subcategory['locales']['buttonLabel']"/>
            </div>
        </div>
    </SectionTemplate>
</template>

<script setup>
import SectionTemplate from "../_templates/SectionTemplate.vue"
import SubHeading from "../_templates/SubHeading.vue"
import Thread from "./Thread.vue"

/**
 * @property {Object} sectionData
 */
const props = defineProps({
    sectionData: Object
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.thread-container {
    @include media-breakpoint-up(xxl) {
        &:not(:last-child) {
            padding-right:2.5rem;
        }
    }
}
</style>