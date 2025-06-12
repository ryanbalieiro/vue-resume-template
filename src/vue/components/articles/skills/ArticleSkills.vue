<template>
    <Article class="article-skills"
             :model="model">
        <div class="article-content-wrapper">
            <!-- Chart -->
            <div v-if="chartType" class="chart-wrapper">
                <!-- Chart Type: Pie -->
                <ArticleSkillsPieChart v-if="chartType === 'pie'"
                                       :model="props.model"/>
            </div>

            <!-- Items -->
            <div class="items-row-wrapper" :class="chartType ? `items-row-wrapper-with-chart` : ``">
                <div class="row" :class="`${gutterClass}`">
                    <ArticleSkillsItem v-for="item in props.model.items"
                                       :item="item"
                                       :col-class="chartType ? colClassWithChart : colClass"
                                       :max-items-per-line="Number(maxItemsPerLine)"
                                       :transparent-icon="props.model.getSetting('transparent_item_icon_background', false)"
                                       :small-icon="props.model.getSetting('small_icons', false)"
                                       :progress-bar-allowed="!chartType"/>
                </div>
            </div>
        </div>
    </Article>
</template>

<script setup>
import {computed} from "vue"
import Article from "/src/vue/components/articles/base/Article.vue"
import ArticleSkillsItem from "/src/vue/components/articles/skills/ArticleSkillsItem.vue"
import ArticleSkillsPieChart from "/src/vue/components/articles/skills/ArticleSkillsPieChart.vue"

const props = defineProps({
    /** @type {Article} **/
    model: {
        type: Object,
        required: true
    }
})

const chartType = computed(() => {
    return props.model.getSetting("chart", null)
})

const maxItemsPerLine = computed(() => {
    const maxItemsPerLine = props.model.getSetting("max_items_per_line", 1)
    if(maxItemsPerLine < 0 || maxItemsPerLine > 3)
        throw new Error("[ArticleSkills] The setting max_items_per_line must be a number between 1 and 3.")
    return maxItemsPerLine
})

const gutterClass = computed(() => {
    if(!chartType.value)
        return 'gx-5 gy-3 gy-md-4'
    return 'gx-5 gx-xl-3 gx-xxl-4 gy-3 gy-md-4 gy-xl-3 gy-xxl-4'
})

const colClass = computed(() => {
    switch (maxItemsPerLine.value) {
        default: return 'col-12'
        case 2: return 'col-12 col-sm-6 col-lg-12 col-xl-6'
        case 3: return 'col-12 col-sm-6 col-xxl-4'
    }
})

const colClassWithChart = computed(() => {
    switch (maxItemsPerLine.value) {
        default: return 'col-12'
        case 2: return 'col-12 col-sm-6 col-xl-12 col-xxl-12'
        case 3: return 'col-12 col-sm-6 col-xxl-4'
    }
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

div.article-content-wrapper {
    display: flex;
    @include media-breakpoint-down(xl) {
        flex-direction: column;
    }
}

div.chart-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: darken($default-section-background, 2%);

    --proportion: 0.9;
    @media (min-width: 1500px) {--proportion: 0.95;}
    @include media-breakpoint-down(xxl) {--proportion: 0.75;}
    @include media-breakpoint-down(xl) {--proportion: 0.7;}
    @include media-breakpoint-down(lg) {--proportion: 0.65;}
    @include media-breakpoint-down(md) {--proportion: 0.5;}
    @include media-breakpoint-down(sm) {--proportion: 0.45;}

    --margin: calc(45px * var(--proportion));
    width: calc(50% - var(--margin)/2);
    height: calc(500px * var(--proportion));
    min-width: calc(50% - var(--margin)/2);
    border-radius: calc(70px * var(--proportion));
    padding: calc(50px * var(--proportion));
    margin-right: calc(var(--margin));

    margin-top: auto;
    margin-bottom: auto;

    @include media-breakpoint-down(xl) {
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 30px;
        min-width: 100%;
        width: calc(500px * var(--proportion));
        border-radius: calc(50px * var(--proportion));
    }

    @include media-breakpoint-down(lg) {
        width: 100%;
        min-width: 100%;
    }
}

div.items-row-wrapper {
    display: flex;
    flex-grow: 1;
    width: 100%;
    align-items: center;

    .row {
        display: flex;
        flex-grow: 1;
    }
}

div.items-row-wrapper-with-chart {
    max-width: 1200px;
}
</style>