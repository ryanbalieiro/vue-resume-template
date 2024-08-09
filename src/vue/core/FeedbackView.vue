<template>
    <!-- Spinner -->
    <ActivitySpinner ref="activitySpinner"/>
</template>

<script setup>
import {ref} from "vue"
import {useLayout} from "../../composables/layout.js"
import ActivitySpinner from "../feedbacks/ActivitySpinner.vue"

const layout = useLayout()
const activitySpinner = ref(null)

/**
 * @public
 * @param {String} message
 */
const showActivitySpinner = (message) => {
    activitySpinner.value.show(message)
}

/**
 * @public
 */
const hideActivitySpinner = () => {
    activitySpinner.value.hide()
}

defineExpose({
    showActivitySpinner,
    hideActivitySpinner
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>