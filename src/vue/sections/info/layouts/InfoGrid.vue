<template>
    <div class="row gx-5">
        <div v-for="item in props.items" class="col-12 col-md-6 item-container">
            <InfoItem :item="item"
                      :highlighted-header="true"
                      :small-description="false"
                      :description-with-progress-bar="true"
                      :icon-color-style="item['formattedPercentage'] ? 'transparent' : 'solid'"
                      class="info-item"/>
        </div>
    </div>
</template>

<script setup>
import InfoItem from "../partials/InfoItem.vue"

/**
 * @property {Object[]} items
 */
const props = defineProps({
    items: Array,
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.item-container {
    @include generate-dynamic-styles-with-hash((
        xxxl: (min-height:5.0rem),
        xxl:  (min-height:4.5rem),
        xl:   (min-height:4.2rem),
        lg:   (min-height:4.2rem),
        md:   (min-height:3.5rem),
        sm:   (min-height:0)
    ));
}
</style>