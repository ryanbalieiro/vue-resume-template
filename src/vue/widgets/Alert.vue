<template>
    <div class="text-4" :class="`alert alert-${props.type}`" role="alert">
        <i class="me-1" :class="faIcon"/> {{ message }}
    </div>
</template>

<script setup>
import {computed} from "vue"

/**
 * @property {String} type
 *
 */
const props = defineProps({
    type: String,
    message: String
})

/**
 * @type {ComputedRef<String>}
 */
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