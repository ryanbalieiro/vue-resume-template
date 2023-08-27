<template>
    <div class="info-item">
        <!-- Icon -->
        <CircleIcon :src="item['imageIconUrl'] || item['faIcon'] || 'fa-regular fa-sticky-note'"
                    :type="'standard'"
                    :color="_getItemColor(item)"
                    :text-class="_getItemFontAwesomeTextClass(item)"
                    class="info-item-icon"/>

        <!-- Content -->
        <div class="info-item-content">
            <!-- Header (Highlighted Style) -->
            <div v-if="highlightedHeader" class="info-item-content-header-highlight mb-1">
                <p class="info-item-title text-4 fw-bold text-normal mb-0">{{ item['locales']['title'] }}</p>
                <span class="info-item-progress-span text-1 text-muted fw-bold">{{ item['formattedPercentage'] ?? '' }}</span>
            </div>

            <!-- Header (Simplified Style) -->
            <div v-else class="info-item-content-header">
                <p class="text-light-7 text-4 mb-0">
                    <strong>{{item['locales']['title']}}</strong>
                    <span class="text-3" v-if="item['formattedPercentage']"> – {{item['formattedPercentage']}}</span>
                </p>
            </div>

            <!-- Description With Progress Bar -->
            <ProgressBar v-if="props.descriptionWithProgressBar && item['formattedPercentage']"
                         :percentage="item['value']"
                         :description="item['locales']['description']"
                         :color="_getProgressBarColor(item)"
                         class="mt-1"/>

            <!-- Description -->
            <div v-else class="info-item-description-wrapper">
                <p class="item-description text-muted mb-0" :class="smallDescription ? 'text-1' : 'text-2'" v-html="item['locales']['description']"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import CircleIcon from "../../../widgets/CircleIcon.vue"
import ProgressBar from "../../../widgets/ProgressBar.vue"

/**
 * @property {Object} item
 * @property {Boolean} highlightedHeader
 * @property {Boolean} descriptionWithProgressBar
 * @property {String} iconColorStyle
 * @property {descriptionWithProgressBar} smallDescription
 */
const props = defineProps({
    item: Object,
    highlightedHeader: Boolean,
    descriptionWithProgressBar: Boolean,
    iconColorStyle: String,
    smallDescription: Boolean
})

/**
 * @param {Object} item
 * @return {string}
 * @private
 */
const _getItemColor = (item) => {
    if(props.iconColorStyle === 'transparent') {
        return 'transparent'
    }
    else if(props.iconColorStyle === 'customColor') {
        return props.item['customColor']
    }
}

/**
 * @param {Object} item
 * @return {string|null}
 * @private
 */
const _getProgressBarColor = (item) => {
    if(props.iconColorStyle === 'customColor') {
        return props.item['customColor']
    }

    return null
}

/**
 * @param {Object} item
 * @return {string}
 * @private
 */
const _getItemFontAwesomeTextClass = (item) => {
    if(props.iconColorStyle === 'transparent') {
        return 'text-primary'
    }

    return 'text-white'
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.info-item {
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;
}

.info-item-icon {
    @include generate-dynamic-styles-with-hash((
        xxxl: (margin-right: 1rem),
        lg:   (margin-right: 0.75rem)
    ))
}

.info-item-content {
    align-self: center;
    width: 100%;
}

.info-item-content-header-highlight {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
</style>