<template>
    <slot/>

    <ProjectModal :item="projectModalTargetItem"
                  @close="_onProjectModalClosed"/>
</template>

<script setup>
import ProjectModal from "/src/vue/components/modals/project/ProjectModal.vue"
import {provide, ref} from "vue"

const projectModalTargetItem = ref(null)

const showProjectModal = (articleItem) => {
    projectModalTargetItem.value = articleItem
}

const _onProjectModalClosed = () => {
    projectModalTargetItem.value = null
}

provide("showProjectModal", showProjectModal)
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>