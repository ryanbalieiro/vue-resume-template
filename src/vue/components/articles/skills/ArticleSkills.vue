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
    return 'gx-5 gx-xl-3 gx-xxl-4 gy-4 gy-xl-3 gy-xxl-4'
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
        case 2: return 'col-12 col-sm-6 col-xl-6 col-xxl-6'
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
    min-width: auto;
    margin-right: 30px;

    @include generate-dynamic-styles-with-hash((
        xxxl:   (min-width: max(350px, 16vw), width: max(600px, 16vw), min-height: 320px, height: 100%, margin-right:40px, margin-top: 10px, margin-bottom: 10px),
        xxl:   (min-width: max(280px, 18.5vw), width: max(280px, 18.5vw), min-height: 220px, margin-right:30px),
        xl:   (min-width: 200px, min-height: 250px, height: 250px, margin-right:auto, margin-left: auto, margin-top: 5px, margin-bottom:30px),
        lg:   (min-height: 250px, height: 250px, margin-top:5px),
        md:   (min-height: 225px, height: 225px, margin-bottom:35px),
        sm:   (min-height: 200px, height: 200px, margin-bottom:30px),
    ));

    display: flex;
    align-items: center;
    justify-content: center;
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