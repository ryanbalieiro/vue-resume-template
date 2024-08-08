<template>
    <!-- Thread -->
    <ul class="thread">
        <!-- Item -->
        <li v-for="item in orderedItems" class="thread-item">
            <!-- Circle -->
            <span class="fa fa-stack thread-icon">
                <i class="fa fa-circle fa-stack-1x"/>
            </span>

            <!-- Content -->
            <div class="thread-item-content">
                <!-- Title -->
                <h6 class="thread-item-title text-5 fw-bold pt-1 mb-1"> {{ item['locales']['title'] }}</h6>

                <!-- Tags -->
                <Tags :items="_getTagsForItem(item)" class="mt-1 mb-2 mt-lg-2"/>

                <!-- Description -->
                <p v-html="item['locales']['description']" class="thread-item-description text-3 text-normal mb-1 mb-md-2"/>

                <!-- Link -->
                <a v-if="item['href']" class="text-2" target="_blank" :href="item['href']">
                    <span>{{ props.linkLabel }}</span>
                    <i class="fa-solid fa-arrow-up-right-dots ms-1"/>
                </a>
            </div>
        </li>

        <!-- Trailing Item -->
        <li class="thread-item thread-item-end">
            <!-- Circle -->
            <span class="fa fa-stack thread-icon thread-icon-small">
                <i class="fa fa-circle fa-stack-1x"></i>
            </span>
        </li>
    </ul>
</template>

<script setup>
import {computed} from "vue"
import {useUtils} from "../../../composables/utils.js"
import {useLanguage} from "../../../composables/language.js"
import Tags from "../../widgets/Tags.vue"

/**
 * @property {Object[]} items
 * @property {String} linkLabel
 */
const props = defineProps({
    items: Array,
    linkLabel: String
})

const language = useLanguage()
const utils = useUtils()

/**
 * @type {ComputedRef<Array>}
 */
const orderedItems = computed(() => {
    return utils.reverseArray(props.items)
})

/**
 * @param {Object} item
 * @return {[{faIcon: string, label: String},{faIcon: (String|string), label: *}]}
 * @private
 */
const _getTagsForItem = (item) => {
    const place = item['place']

    return [
        {
            faIcon: 'fa fa-calendar-check',
            label: utils.localizeDate(item['date'], language.getSelectedLanguage()['id'])
        },
        {
            faIcon: place['faIcon'] ? place['faIcon'] : 'fa fa-building',
            label: place['locales'] ? place['locales']['name'] : place
        }
    ]
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

ul.thread {
    --scale:1;
    --line-width:calc(var(--scale)*4px);
    @include media-breakpoint-down(md) {--scale:0.9;}
    @include media-breakpoint-down(sm) {--scale:0.8;}

    position: relative;
    padding: 0;
    list-style: none;
    margin-left: calc(var(--scale)*-5px);

    &:before {
        position: absolute;
        top: 0;
        bottom: 0;
        left: calc(var(--scale)*1.75rem - var(--line-width)/2);

        height: calc(100% - 1rem*var(--scale));
        width: var(--line-width);

        content: "";
        background-color: $light-4;
    }

    .thread-item {
        min-height: calc(5rem * var(--scale));
        margin-bottom: calc(2.5rem * var(--scale));

        .thread-item-content {
            margin-left: calc(var(--scale) * 3.7rem);
        }
    }

    .thread-item-end {
        margin-bottom: 0;
        min-height: calc(1rem * var(--scale));
    }

    .thread-icon {
        display: inline-flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        left: calc(var(--scale)*0.75rem);

        width: calc(var(--scale)*2rem);
        height: calc(var(--scale)*2rem);

        border-radius: 100%;
        font-size: calc(1rem * var(--scale));
        color: $light-1;
        background-color: $light-3;
    }

    .thread-icon-small {
        left: calc(var(--scale)*1rem);

        width: calc(var(--scale)* 1.5rem);
        height: calc(var(--scale)* 1.5rem);

        border: calc(var(--line-width)*1.6) solid $light-3;
        font-size: calc(0.5rem * var(--scale));
        color: transparent;
    }
}
</style>