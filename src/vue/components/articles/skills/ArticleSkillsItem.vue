<template>
    <div class="skills-item"
         :class="colClass">
        <IconView class="skills-item-icon"
                  :class="`skills-item-icon${transparentIcon ? '-transparent' : ''}${smallIcon ? '-shrink' : ''}`"
                  :img="item.img"
                  :fa-icon="item.fallbackFaIcon"
                  :background-color="!transparentIcon ? item.fallbackFaIconColor : null"
                  :fill-color="!transparentIcon ? null : item.fallbackFaIconColor"
                  :prioritize-image="true"
                  :transparency="transparentIcon"/>

        <div class="skills-item-content">
            <!-- Header -->
            <div class="skills-item-header eq-h6">
                <!-- Title -->
                <span class="skills-item-header-title">
                    <span class="fw-bold"
                          v-html="localize(item.locales, 'title')"/>

                    <span v-if="levelDisplay"
                          class="ms-1 text-3 text-light-7"
                          v-html="levelDisplay"/>
                </span>

                <!-- Percentage -->
                <span v-if="percentageDisplay && progressBarAllowed"
                      class="skills-item-percentage-display text-1"
                      v-html="percentageDisplay"/>
            </div>

            <!-- Progress Bar -->
            <div v-if="item.hasPercentage && progressBarAllowed"
                 class="skills-item-progress-display mt-1">
                <div class="skills-item-progress-display-fill"
                     :style="`width:${item.percentage}%; background-color: ${item.fallbackFaIconColor}`"/>
            </div>

            <!-- Experience Time -->
            <div v-if="experienceTimeDisplay && progressBarAllowed"
                 class="skills-item-description">
                <p class="text-3 m-0">
                    <span v-html="experienceTimeDisplay"/>
                </p>
            </div>

            <!-- Description -->
            <div class="skills-item-description">
                <p class="text-3 m-0"
                   :class="experienceTimeDisplay || !progressBarAllowed ? `text-light-7` : ``"
                   v-html="localize(item.locales, 'description', true)"/>
            </div>

            <!-- Links -->
            <ArticleWidgetLinkList  v-if="links && links.length"
                                    class="mt-1 text-3"
                                    :links="links"/>
        </div>
    </div>
</template>

<script setup>
import {computed, inject} from "vue"
import {useUtils} from "/src/composables/utils.js"
import IconView from "/src/vue/components/widgets/IconView.vue"
import ArticleWidgetLinkList from "/src/vue/components/articles/base/ArticleWidgetLinkList.vue"

const utils = useUtils()

const props = defineProps({
    /** @type {ArticleItem} **/
    item: {
        type: Object,
        required: true
    },
    colClass: String,
    transparentIcon: Boolean,
    smallIcon: Boolean,
    progressBarAllowed: Boolean
})

/** @type {Function} */
const localize = inject("localize")

/** @type {Function} */
const localizeFromStrings = inject("localizeFromStrings")

const percentageDisplay = computed(() => {
    if(!props.item.percentage)
        return
    return props.item.percentage + "%"
})

const experienceTimeDisplay = computed(() => {
    const dateStart = props.item.dateStart
    if(!dateStart || !(dateStart instanceof Date))
        return null

    const yearsDiff = utils.getYearsPassedSince(dateStart)
    const floorYearsDiff = Math.floor(yearsDiff)
    if(floorYearsDiff > 1)
        return localizeFromStrings("experience_year_count_plural").replace("{x}", floorYearsDiff + "+")
    else if(floorYearsDiff === 1)
        return localizeFromStrings("experience_year_count_singular").replace("{x}", floorYearsDiff)
    else
        return localizeFromStrings("experience_year_count_less_than_one")

})

const levelDisplay = computed(() => {
    const level = localize(props.item.locales, 'level', true)
    const percentage = percentageDisplay.value

    if(props.progressBarAllowed) {
        if(level)
            return `- ${level}`
        return null
    }

    return `- ${percentage} ${level ? '(' + level + ')' : ''}`
})

const links = computed(() => {
    return props.item.links
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

div.skills-item {
    display: flex;
    @include media-breakpoint-down(sm) {
        width: calc(100% - 5px);
    }
}

div.skills-item-icon {
    @include generate-dynamic-styles-with-hash((
        xxxl:   (width: 48px, min-width: 48px, height: 48px, min-height: 48px, font-size: 22px),
        md:     (width: 36px, min-width: 36px, height: 36px, min-height: 36px, font-size: 16px),
        sm:     (width: 32px, min-width: 32px, height: 32px, min-height: 32px, font-size: 14px),
    ));

    border-radius: 100%;
    overflow: hidden;
    user-select: none;
    pointer-events: none;

    &-transparent {
        @include generate-dynamic-styles-with-hash((
            xxxl:   (font-size: 34px),
            md:     (font-size: 28px),
            sm:     (font-size: 24px),
        ));
    }

    &-shrink, &-transparent-shrink {
        @include generate-dynamic-styles-with-hash((
            xxxl:   (border-width:4px),
            md:     (border-width:2px),
            sm:     (border-width:0),
        ));

        border: 4px solid $default-section-background;
    }

    &-shrink {
        @include generate-dynamic-styles-with-hash((
            xxxl:   (font-size: 20px),
            md:     (font-size: 16px),
            sm:     (font-size: 14px),
        ));
    }

    &-transparent-shrink {
        @include generate-dynamic-styles-with-hash((
            xxxl:   (font-size: 28px),
            md:     (font-size: 22px, border-width:0),
            sm:     (font-size: 20px),
        ));
    }
}

div.skills-item-content {
    flex-grow: 1;
    @include generate-dynamic-styles-with-hash((
        xxxl:   (margin-left: 18px, margin-top: 1px),
        md:     (margin-left: 15px, margin-top: -1px),
        sm:     (margin-left: 12px, margin-top: -2px),
    ));
}

div.skills-item-header {
    display: flex;
    justify-content: space-between;
    align-items: end;
}

span.skills-item-header-title {
    @include media-breakpoint-down(sm) {
        font-size: 0.875rem;
    }
}

div.skills-item-progress-display {
    @include generate-dynamic-styles-with-hash((
        xxxl:   (margin-top: 4px, height: 9px),
        md:     (margin-top: 3px),
        sm:     (margin-top: 2px),
    ));

    width: 100%;
    background-color: rgba($dark, 0.05);
    border: 1px solid rgba(black, 0.1);
    padding: 1px;

    div.skills-item-progress-display-fill {
        background-color: $primary;
        height: 100%;
    }
}

div.skills-item-description {
    @include generate-dynamic-styles-with-hash((
        xxxl:   (margin-top: 4px),
        md:     (margin-top: 3px),
        sm:     (margin-top: 2px),
    ));
}
</style>