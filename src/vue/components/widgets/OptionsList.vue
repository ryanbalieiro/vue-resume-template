<template>
    <div class="row options-list-row gy-3 gy-lg-4">
        <div v-for="item in props.items"
             class="col-12 col-md-6 col-lg-12 col-xl-6">
            <div class="options-list-item">
                <IconView class="options-list-icon-view"
                          :fa-icon="item.faIcon"
                          :background-color="utils.getRootSCSSVariable('primary')"/>

                <div class="option-list-info">
                    <h5 class="mb-0 lead" v-html="item.label"/>

                    <a v-if="item.href"
                       :href="item.href"
                       target="_blank"
                       class="m-0 text-3 link-masked"
                       v-html="item.value"/>

                    <a v-else
                       class="m-0 text-3 text-light-7"
                       v-html="item.value"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import IconView from "/src/vue/components/widgets/IconView.vue"
import {useUtils} from "/src/composables/utils.js"

const utils = useUtils()

const props = defineProps({
    items:Array
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

div.options-list-item {
    --icon-size: 62px;
    @include media-breakpoint-down(xxl) {--icon-size: 58px;}
    @include media-breakpoint-down(xl) {--icon-size: 52px;}
    @include media-breakpoint-down(md) {--icon-size: 48px;}
    @include media-breakpoint-down(sm) {--icon-size: 46px;}
    display: flex;
    align-items: center;

    div.options-list-icon-view {
        width: var(--icon-size);
        height: var(--icon-size);
        font-size: calc(var(--icon-size)/2);
        border-radius: 30%;
        overflow: hidden;
    }

    div.option-list-info {
        margin-left: calc(var(--icon-size)/3);
    }

    h5 {
        text-transform: capitalize;
        font-weight: bold;
        margin-top: 2px;
    }
}
</style>