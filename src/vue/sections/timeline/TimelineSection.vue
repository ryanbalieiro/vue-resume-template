<template>
    <SectionTemplate :section-data="props.sectionData">
        <!-- Timeline -->
        <ul class="timeline">
            <!-- Timeline Items -->
            <li v-for="item in orderedItems" class="timeline-item">
                <!-- Logo Wrapper -->
                <div class="timeline-item-logo" :class="{'timeline-item-logo-bg-primary':!(item['place'] && item['place']['logoUrl'])}">
                    <!-- If item has an image... -->
                    <ImageView v-if="item['place'] && item['place']['logoUrl']"
                               :src="item['place']['logoUrl']"
                               :alt="item['place']['locales']['name']"
                               class="timeline-item-img img-fluid rounded-circle"/>

                    <!-- Fallback, use font awesome icon... -->
                    <i v-else  class="timeline-item-fa-icon"
                               :class="item['place']['faIcon'] ? item['place']['faIcon'] : 'fa-solid fa-clock'"/>
                </div>

                <!-- Item Content -->
                <div class="timeline-item-content">
                    <!-- Item Header -->
                    <div class="timeline-item-content-header">
                        <!-- Title + Institution Flex Column -->
                        <div class="flex-column-title">
                            <h4 class="timeline-item-title fw-bold" v-html="item['locales']['title']"/>
                            <h6 class="timeline-item-subtitle text-light-6 text-3">
                                <i class="fa-solid fa-building me-2 ms-2"/>
                                <span>{{item['place'] ? item['place']['locales']['name'] : ''}}</span>
                            </h6>
                        </div>

                        <div class="flex-column-date">
                            <Tags :items="_formatItemDate(item)" class="mt-1 me-1"/>
                        </div>
                    </div>

                    <!-- Item Body -->
                    <div class="timeline-item-content-body mt-3">
                        <p class="text-3 text-normal mb-2 mb-md-3 mb-lg-4" v-html="item['locales']['description']"/>
                        <Tags :item-class="'bg-primary'" :items="item['locales']['tags']"/>
                    </div>
                </div>
            </li>

            <!-- Timeline Trailing Item -->
            <li class="timeline-item timeline-item-tail">
                <div class="timeline-item-logo"/>
            </li>
        </ul>
    </SectionTemplate>
</template>

<script setup>
import SectionTemplate from "../_templates/SectionTemplate.vue"
import {computed} from "vue"
import {useData} from "../../../composables/data.js"
import {useLanguage} from "../../../composables/language.js"
import {useUtils} from "../../../composables/utils.js"
import ImageView from "../../widgets/ImageView.vue"
import Tags from "../../widgets/Tags.vue"

const data = useData()
const language = useLanguage()
const utils = useUtils()

/**
 * @property {Object} sectionData
 */
const props = defineProps({
    sectionData: Object
})

/**
 * @return {Object[]}
 */
const orderedItems = computed(() => {
    return utils.reverseArray(props.sectionData['content']['items'])
})

/**
 * @param {Object} item
 * @return {[{faIcon: string, label: string}]}
 * @private
 */
const _formatItemDate = (item) => {
    const period = item['period']
    const from = utils.localizeDate(period[0], language.getSelectedLanguage()['id'])
    const to = utils.localizeDate(period[1], language.getSelectedLanguage()['id'])

    return [{
        faIcon: 'fa fa-calendar-check',
        label: from + ' <span class="me-1 ms-1">➔</span> ' + to
    }]
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

ul.timeline {
    --image-size:100px;
    --image-border-size:7px;
    --line-width:3px;
    --vertical-spacing:80px;
    --content-padding-top:1rem;

    @include media-breakpoint-down(md) {
        --image-size:75px;
        --vertical-spacing:60px;
    }

    @include media-breakpoint-down(sm) {
        --image-size:50px;
        --image-border-size:5px;
        --vertical-spacing:40px;
        --content-padding-top:0.6rem;
    }

    position: relative;
    padding: 0;
    list-style: none;

    &:before {
        position: absolute;
        top: 0;
        bottom: 0;
        left: calc(var(--image-size)/2 - var(--line-width)/2);
        width: var(--line-width);
        content: "";
        background-color: $light-4;
    }

    .timeline-item {
        position: relative;
        min-height: var(--image-size);

        &:not(:last-child) {
            min-height: var(--image-size);
            margin-bottom: var(--vertical-spacing);
        }
    }

    .timeline-item-logo {
        display: inline-flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        left: 0;
        width: var(--image-size);
        height: var(--image-size);
        z-index: 50;

        border: var(--image-border-size) solid $light-3;
        border-radius: 100%;
        background-color: $light-4;

        &-bg-primary {
            background-color: lighten($primary, 20%);
        }
    }

    .timeline-item-fa-icon {
        color: $white;
        font-size: calc(var(--image-size)/2.5);
    }

    .timeline-item-tail {
        left: calc(var(--image-size)/4);
        min-height: calc(var(--image-size)/2);

        .timeline-item-logo {
            width: calc(var(--image-size)/2);
            height: calc(var(--image-size)/2);
            background-color: $light-4;
        }
    }

    .timeline-item-content {
        margin-left: calc(var(--image-size) + calc(var(--image-size)/5));
    }

    .timeline-item-content-header {
        display: flex;
        padding-top: var(--content-padding-top);

        .flex-column-texts {
            padding-right: 2rem;
        }

        .flex-column-date {
            margin-left: auto;
        }

        @include media-breakpoint-down(lg) {
            display: block;
            .flex-column-texts {
                padding-right: 0;
            }
        }
    }
}
</style>