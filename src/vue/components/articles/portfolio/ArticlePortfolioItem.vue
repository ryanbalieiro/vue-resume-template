<template>
    <div class="portfolio-item"
         :class="`portfolio-item-${transitionStatus}`"
         @click="_onClick">
        <div class="portfolio-item-icon-wrapper">
            <IconView class="portfolio-icon-view"
                      ref="iconView"
                      :img="item?.img"
                      :fa-icon="item?.fallbackFaIcon"
                      :background-color="item?.fallbackFaIconColor"
                      :prioritize-image="true"
                      :transparency="!item"/>

            <div class="portfolio-item-thumb-overlay">
                <div class="portfolio-item-thumb-overlay-content eq-h6">
                    <i class="fas fa-eye fa-2x"/>
                </div>
            </div>
        </div>

        <div class="portfolio-item-description-wrapper">
            <button class="portfolio-item-title"
                    v-html="localize(item.locales, 'title')"/>

            <p class="portfolio-item-category"
               v-html="categoryName"/>
        </div>
    </div>
</template>

<script setup>
import {inject, onMounted, onUnmounted, ref, watch} from "vue"
import {useScheduler} from "/src/composables/scheduler.js"
import {useUtils} from "/src/composables/utils.js"
import IconView from "/src/vue/components/widgets/IconView.vue"

const scheduler = useScheduler()
const utils = useUtils()

const props = defineProps({
    /** @type {ArticleItem} **/
    item: {
        type: Object,
        required: true
    },
    categoryName: String,
    index: Number,
    transitionCount: Number
})

/** @type {Function} */
const localize = inject("localize")

/** @type {Function} */
const showProjectModal = inject("showProjectModal")

const transitionStatus = ref("hidden")
const iconView = ref(null)
const tag = utils.generateUniqueRandomString("portfolio-item")

onMounted(() => { _showAfterLoading() })
onUnmounted(() => { _hide() })
watch(() => props.transitionCount, () => { _showAfterLoading() })

const _hide = () => {
    transitionStatus.value = "hidden"
    scheduler.clearAllWithTag(tag)
}

const _showAfterLoading = () => {
    _hide()

    scheduler.interval(() => {
        const isLoading = iconView.value.imageView && iconView.value.imageView.isLoading()
        const hasImage = props.item.img
        if(!hasImage || !isLoading) {
            _show()
        }
    }, 1000/30, tag)
}

const _show = () => {
    scheduler.clearAllWithTag(tag)

    const timeout = 30 + (props.index || 0) * 60
    scheduler.schedule(() => {
        transitionStatus.value = "showing"
    }, timeout, tag)

    scheduler.schedule(() => {
        transitionStatus.value = "shown"
        scheduler.clearAllWithTag(tag)
    }, timeout + 350, tag)
}

const _onClick = () => {
    showProjectModal(props.item)
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

$multipliers: (
    xxxl: 0.9,
    xxl: 0.81,
    xl: 0.81,
    lg: 0.72,
    md: 0.6875,
    sm: 0.5
);

$multipliers-texts: (
    xxxl: 1.00,
    xxl: 0.95,
    xl: 0.9,
    lg: 0.85,
    md: 0.8,
    sm: 0.675
);

div.portfolio-item {
    display: inline-flex;
    flex-direction: column;
    cursor: pointer;
    //background-color: teal;
}

div.portfolio-item-hidden {
    opacity: 0;
}

div.portfolio-item-showing {
    animation: appear 0.3s ease-out forwards;
}

@keyframes appear {
    from {
        opacity:0;
        transform: scale(0.3) translateY(-30%);
    }
    to {
        opacity:1
    }
}

div.portfolio-item-icon-wrapper {
    position: relative;
    margin: 0 auto;
    cursor: pointer;
    overflow: hidden;
    border-radius: 25%;
    aspect-ratio: 1/1;

    @each $breakpoint, $multiplier in $multipliers {
        @include media-breakpoint-down($breakpoint) {
            width: clamp(calc(160px * $multiplier), 9vw, calc(180px * $multiplier));
            height: clamp(calc(160px * $multiplier), 9vw, calc(180px * $multiplier));
        }
    }
}

div.portfolio-icon-view {
    font-size: 90px;

    @each $breakpoint, $multiplier in $multipliers {
        @include media-breakpoint-down($breakpoint) {
            font-size: calc(90px * $multiplier);
        }
    }
}

div.portfolio-item-thumb-overlay {
    position: absolute;
    top: 0;
    opacity: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;
    border-radius: 25%;

    background: fade-out(lighten($primary, 5%), 0.1);
    transition: all ease-in-out 0.25s;

    &-content {
        color: $white;
    }
}

button.portfolio-item-title {
    border: none;
    padding: 0;
    background-color: transparent;
    color: $dark;
    font-weight: bold;

    @each $breakpoint, $multiplier in $multipliers-texts {
        @include media-breakpoint-down($breakpoint) {
            font-size: calc(1.25rem * $multiplier);
            margin-top: calc(9px * $multiplier);
        }
    }
}

p.portfolio-item-category {
    margin: 0;
    padding: 0;
    color: $light-6!important;

    @each $breakpoint, $multiplier in $multipliers-texts {
        @include media-breakpoint-down($breakpoint) {
            font-size: calc(1rem * $multiplier);
        }
    }
}

div.portfolio-item:hover {
    div.portfolio-item-thumb-overlay {
        opacity: 1;
    }

    button.portfolio-item-title {
        color: lighten($primary, 10%);
        transition: color ease-in-out 0.3s;
    }
}
</style>