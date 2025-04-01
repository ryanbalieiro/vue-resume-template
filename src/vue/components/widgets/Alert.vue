<template>
    <div class="text-4" :class="`alert alert-${props.type}`" role="alert">
        <i class="me-2" :class="faIcon"/>
        <span v-html="message"/>
    </div>
</template>

<script setup>
import {computed} from "vue"

const props = defineProps({
    type: String,
    message: String
})

const faIcon = computed(() => {
    switch(props.type) {
        case 'success': return 'fa-solid fa-check-circle'
        case 'danger': return 'fa-solid fa-exclamation-triangle'
    }
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>