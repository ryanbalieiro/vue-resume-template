<template>
    <!-- Section Subheading -->
    <div class="section-subheading">
        <!-- Title -->
        <h3 class="section-subheading-title mb-2 fw-bold text-uppercase">
            <span>{{props.title}}</span>
            <i v-if="props.faIcon" :class="props.faIcon" class="ms-2"/>
        </h3>

        <!-- Divider -->
        <hr class="solid-divider ms-1 me-1 mb-3" :class="{'mb-sm-4': !props.description}">

        <!-- Description -->
        <p v-if="props.description" class="section-subheading-description lead text-muted">{{props.description}}</p>
    </div>
</template>

<script setup>
/**
 * @property {String} title
 * @property {String} [description]
 * @property {String} [faIcon]
 */
const props = defineProps({
    title: String,
    description: String,
    faIcon: String
})
</script>

<style lang="scss" scoped>
</style>