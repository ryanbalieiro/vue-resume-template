<template>
    <li class="thread-item"
        :class="!item ? `thread-item-trailing` : ``">
        <div class="thread-item-circle">
            <div class="thread-item-circle-fill"/>
        </div>

        <div v-if="item"
             class="thread-item-content">
            <div class="thread-item-content-header mb-1 mb-lg-2">
                <div class="thread-item-content-header-title-wrapper">
                    <h5 class="fw-bold lead mb-1 mb-lg-2"
                        v-html="localize(item.locales, 'title')"/>

                    <InlineInfoList :items="[{
                        faIcon: item.fallbackFaIcon || 'fa-regular fa-building',
                        visibility: location,
                        value: location
                    }]"/>
                </div>

                <div class="thread-item-content-header-date-badge-wrapper">
                    <InfoBadge  class="date-badge"
                                variant="nav"
                                fa-icon="fa-regular fa-calendar"
                                :value="date"/>
                </div>
            </div>

            <p class="text-3 text-light-7 p-0 m-0"
               v-html="localize(item.locales, 'description')"/>

            <ArticleWidgetLinkList  v-if="links && links.length"
                                    class="mt-2 text-3"
                                    :links="links"/>
        </div>
    </li>
</template>

<script setup>
import {computed, inject} from "vue"
import InfoBadge from "/src/vue/components/widgets/InfoBadge.vue"
import InlineInfoList from "/src/vue/components/widgets/InlineInfoList.vue"
import ArticleWidgetLinkList from "/src/vue/components/articles/base/ArticleWidgetLinkList.vue"

const props = defineProps({
    item: {
        /** @type {ArticleItem} **/
        type: Object,
        required: false
    }
})

/** @type {Function} */
const localize = inject("localize")

/** @type {Function} */
const localizeFromStrings = inject("localizeFromStrings")

/** @type {Function} */
const localizeDate = inject("localizeDate")

const location = computed(() => {
    return localize(props.item.locales, "institution", true)
})

const date = computed(() => {
    return localizeDate(props.item.dateStart)
})

const links = computed(() => {
    return props.item.links
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

li.thread-item {
    display: flex;

    @each $breakpoint, $multiplier in $article-thread-scale-multipliers {
        @include media-breakpoint-down($breakpoint) {
            min-height: calc(60px * $multiplier);
            margin-bottom: calc(40px * $multiplier);
        }
    }
}

div.thread-item-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;

    background-color: lighten($article-thread-line-color, 4%);
    color: lighten($article-thread-line-color, 20%);
    border-radius: 100%;

    &-fill {
        background-color: lighten($article-thread-line-color, 20%);
        border-radius: 100%;
    }

    @each $breakpoint, $multiplier in $article-thread-scale-multipliers {
        @include media-breakpoint-down($breakpoint) {
            height: calc($article-thread-circle-base-size * $multiplier);
            min-height: calc($article-thread-circle-base-size * $multiplier);
            width: calc($article-thread-circle-base-size * $multiplier);
            min-width: calc($article-thread-circle-base-size * $multiplier);

            &-fill {
                height: calc($article-thread-circle-base-size/2 * $multiplier);
                min-height: calc($article-thread-circle-base-size/2 * $multiplier);
                width: calc($article-thread-circle-base-size/2 * $multiplier);
                min-width: calc($article-thread-circle-base-size/2 * $multiplier);
            }
        }
    }
}

li.thread-item-trailing {
    margin-bottom: 0;
    min-height: 0;

    div.thread-item-circle {
        background-color: lighten($article-thread-line-color, 3%);
        &-fill { display: none; }

        @each $breakpoint, $multiplier in $article-thread-scale-multipliers {
            @include media-breakpoint-down($breakpoint) {
                height: calc($article-thread-circle-base-size/1.5 * $multiplier);
                min-height: calc($article-thread-circle-base-size/1.5 * $multiplier);
                width: calc($article-thread-circle-base-size/1.5 * $multiplier);
                min-width: calc($article-thread-circle-base-size/1.5 * $multiplier);
                margin-left: calc($article-thread-circle-base-size/6 * $multiplier);
                font-size: calc(calc($article-thread-circle-base-size/2 + 1px) * $multiplier);
            }
        }
    }
}

div.thread-item-content {
    width: 100%;
    @each $breakpoint, $multiplier in $article-thread-scale-multipliers {
        @include media-breakpoint-down($breakpoint) {
            margin-left: calc(15px * $multiplier);
            margin-top: calc(3px * $multiplier);
        }
    }
}

div.thread-item-content-header {
    display: flex;
    justify-content: space-between;
    align-items: start;
    @include media-breakpoint-down(lg) {
        margin-top: 2px;
    }
}

div.thread-item-content-header-date-badge-wrapper {
    min-width: 105px;
    margin-left: 30px;

    .date-badge {
        width: 100%;
    }
}
</style>