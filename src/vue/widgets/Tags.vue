<template>
    <!-- Tag List -->
    <div class="tags">
        <!-- Bootstrap Badge -->
        <div v-for="item in props.items"
             class="tag badge text-1"
             :class="badgeClassList">

            <!-- Badge Label -->
            <i v-if="item.faIcon" :class="item.faIcon" class="me-2"/>
            <span v-html="item.label || item"/>
        </div>
    </div>
</template>

<script setup>
import {computed} from "vue"

/**
 * @property {String[]|{label:String, icon:string}[]} items
 * @property {String} [itemClass]
 */
const props = defineProps({
    items: Array,
    itemClass: String
})

/**
 * @type {ComputedRef<String>}
 */
const badgeClassList = computed(() => {
    return props.itemClass ? props.itemClass : 'bg-light text-dark'
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.tag {
    &:not(:last-child) {
        margin-right: 0.3rem;
    }
}
</style>