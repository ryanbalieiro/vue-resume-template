<template>
    <div class="portfolio-item"
         :class="`portfolio-item-${transitionStatus}`"
         @click="_onClick">
        <div class="portfolio-item-content-wrapper">
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

div.portfolio-item {
    display: flex;
    align-items: start;
    justify-content: center;

    width: 100%;
    height: 100%;
    background-color: darken($default-section-background, 1%);
    border-radius: 30px;
    @include media-breakpoint-down(sm) {
        border-radius: 15px;
    }
}

/** ----------------- TRANSITIONS ------------------- **/
div.portfolio-item-hidden {
    opacity: 0;
}

div.portfolio-item-showing {
    animation: appear 0.3s ease-out forwards;
}

@keyframes appear {
    from {
        opacity:0;
        transform: scale(0.8) translateY(30%);
    }
    to {
        opacity:1
    }
}

/** ------------------- CONTENT ---------------------- **/
div.portfolio-item-content-wrapper {
    --proportion: 0.9;
    --base-icon-size: 180px;
    --base-title-size: 22px;

    @media (max-width: 2000px) {
        --proportion: 0.85;
        --base-title-size: 23px;
    }
    @media (max-width: 1560px) {
        --proportion: 0.775;
        --base-title-size: 24px;
    }
    @include media-breakpoint-down(xxl) {
        --proportion: 0.675;
        --base-title-size: 25px;
    }
    @include media-breakpoint-down(lg) {
        --proportion: 0.7;
    }
    @include media-breakpoint-down(md) {
        --proportion: 0.65;
    }
    @include media-breakpoint-down(sm) {
        --proportion: 0.6;
    }
    @media (max-width: 500px) {
        --proportion: 0.45;
        --base-title-size: 29px;
    }

    display: inline-flex;
    flex-direction: column;
    cursor: pointer;
    margin: calc(30px * var(--proportion));

    /** Icon View Wrapper **/
    div.portfolio-item-icon-wrapper {
        position: relative;
        margin: 0 auto;
        cursor: pointer;
        overflow: hidden;
        user-select: none;
        pointer-events: none;
        border-radius: 25%;
        aspect-ratio: 1/1;
        width: calc(var(--base-icon-size) * var(--proportion));
        height: calc(var(--base-icon-size) * var(--proportion));
    }

    /** Icon View **/
    div.portfolio-icon-view {
        font-size: calc(var(--base-icon-size)/2 * var(--proportion));
    }

    /** Overlay Feedback **/
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

    /** Title **/
    button.portfolio-item-title {
        border: none;
        padding: 0;
        background-color: transparent;
        color: $dark;
        font-weight: bold;
        font-size: calc(var(--base-title-size) * var(--proportion));
        margin-top: calc(19px * var(--proportion));
        line-height: calc(var(--base-title-size) * var(--proportion));
        margin-bottom: 3px;
    }

    p.portfolio-item-category {
        padding: 0;
        color: $light-7!important;
        font-size: calc(var(--base-title-size)*0.73 * var(--proportion));
        margin: 0;
        @include media-breakpoint-up(lg) {
            margin-top: 2px;
        }
    }
}

div.portfolio-item-content-wrapper:hover {
    div.portfolio-item-thumb-overlay {
        opacity: 1;
    }

    button.portfolio-item-title {
        color: lighten($primary, 10%);
        transition: color ease-in-out 0.3s;
    }
}
</style>