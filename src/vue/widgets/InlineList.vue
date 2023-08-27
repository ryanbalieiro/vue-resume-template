<template>
    <div class="inline-list lead">
        <!-- List Item -->
        <div class="list-item" v-for="item in props.items">
            <!-- List item is a link... -->
            <a v-if="_getItemUrl(item)" :href="_getItemUrl(item)" class="info-item-link">
                <i v-if="_getItemFaIcon(item)" :class="_getItemFaIcon(item)" class="list-item-icon"/>
                {{_getItemLabel(item)}}
            </a>

            <!-- List item is a text... -->
            <span v-else>
                <i v-if="_getItemFaIcon(item)" :class="_getItemFaIcon(item)" class="list-item-icon"/>
                {{_getItemLabel(item)}}
            </span>
        </div>
    </div>
</template>

<script setup>
/**
 * @property {Object}[]} items
 */
const props = defineProps({
    items: Array
})

/**
 * @param {Object} item
 * @return {String}
 * @private
 */
const _getItemLabel = (item) => {
    return item['valueShort'] || item['value']
}

/**
 * @param {Object} item
 * @return {string|*}
 * @private
 */
const _getItemUrl = (item) => {
    return item['href']
}

/**
 * @param {Object} item
 * @return {string|*}
 * @private
 */
const _getItemFaIcon = (item) => {
    return item['faIcon']
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

$spacing-between-items:0.6rem;

.list-item {
    position: relative;
    display: inline-block;
    margin-right: $spacing-between-items;

    font-family: $headings-font-family;
    color: $text-muted;

    &:not(:last-child)::after {
        content: "·";
        margin-left: calc($spacing-between-items*1.4);
    }
}

.list-item-icon {
    min-width: 28px;
    text-align: center;
}

@include media-breakpoint-down(xl) {
    .list-item {
        @include generate-dynamic-styles-with-hash((
            xl:     (margin: 0 0.5rem 0.5rem),
            md:     (margin: 0 0.25rem 0.25rem),
        ));

        display: block;
        &::after {
            display: none;
        }
    }
}
</style>