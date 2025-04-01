<template>
    <Article class="article-portfolio"
             :model="model">
        <div class="article-portfolio-content-wrapper">
            <FilterTabs :categories="filterTabsCategories"
                        :selected-category-id="selectedCategoryId"
                        class="mt-lg-3"
                        @select="_onCategorySelected"/>

            <div class="items-grid">
                <div v-for="(item, index) in filteredItems">
                    <ArticlePortfolioItem  :item="item"
                                           :category-name="_getCategoryName(item.categoryId)"
                                           :index="index"
                                           :transition-count="refreshTimes"/>
                </div>
            </div>
        </div>
    </Article>
</template>

<script setup>
import {computed, inject, onMounted, ref} from "vue"
import Article from "/src/vue/components/articles/base/Article.vue"
import FilterTabs from "/src/vue/components/widgets/FilterTabs.vue"
import ArticlePortfolioItem from "/src/vue/components/articles/portfolio/ArticlePortfolioItem.vue"

const props = defineProps({
    /** @type {Article} **/
    model: {
        type: Object,
        required: true
    }
})

/** @type {Function} */
const localize = inject("localize")

const defaultCategoryId = "all"
const selectedCategoryId = ref(defaultCategoryId)
const refreshTimes = ref(0)

const items = computed(() => {
    return props.model.items
})

const filteredItems = computed(() => {
    return _filterProjectsBy(selectedCategoryId.value)
})

const categoryIds = computed(() => {
    const mappedCategoryIds = items.value.map(item => item.categoryId)

    const uniqueCategoryIds = []
    for(const categoryId of mappedCategoryIds) {
        if(categoryId && !uniqueCategoryIds.includes(categoryId)) {
            uniqueCategoryIds.push(categoryId)
        }
    }

    return uniqueCategoryIds
})

const filterTabsCategories = computed(() => {
    const categories = [{
        id: defaultCategoryId,
        label: _getCategoryName(defaultCategoryId),
        count: _filterProjectsBy(defaultCategoryId).length
    }]

    const mapped = categoryIds.value.map(categoryId => {
        return {
            id: categoryId,
            label: _getCategoryName(categoryId),
            count: _filterProjectsBy(categoryId).length
        }
    })

    return [...categories, ...mapped]
})

const _getCategoryName = (categoryId) => {
    return localize(props.model.locales, "category_" + categoryId)
}

const _filterProjectsBy = (categoryId) => {
    if(categoryId === defaultCategoryId)
        return items.value
    return items.value.filter(item => item.categoryId === categoryId)
}

const _onCategorySelected = (categoryId) => {
    if(categoryId === selectedCategoryId.value)
        return

    refreshTimes.value++
    selectedCategoryId.value = categoryId
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

article.article-portfolio {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    align-items: center;
    @include media-breakpoint-down($navigation-sidebar-breakpoint) {
        justify-content: start;
    }
}

div.article-portfolio-content-wrapper {
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 100%;
    min-height: min(70vh, 800px);

    @include media-breakpoint-down($navigation-sidebar-breakpoint) {
        min-height: 300px;
    }
}

div.items-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-content: space-between;
    column-gap: 35px;
    row-gap: 50px;
    margin-top: 55px;

    @media (min-width: 1750px) {
        grid-template-columns: repeat(5, 1fr);
    }

    @media (min-width: 2000px) {
        grid-template-columns: repeat(6, 1fr);
        row-gap: calc(65px + 2vh);
        margin-top: calc(65px + 2vh);
    }

    @include media-breakpoint-down(xxl) {
        grid-template-columns: repeat(4, 1fr);
        column-gap: 35px;
        row-gap: 45px;
        margin-top: 50px;
    }

    @include media-breakpoint-down(xl) {
        grid-template-columns: repeat(3, 1fr);
    }

    @include media-breakpoint-down(lg) {
        grid-template-columns: repeat(4, 1fr);
        column-gap: 60px;
        row-gap: 40px;
        margin-top: 40px;
    }

    @include media-breakpoint-down(md) {
        grid-template-columns: repeat(3, 1fr);
        column-gap: 25px;
        row-gap: 30px;
        margin-top: 35px;
    }

    @include media-breakpoint-down(sm) {
        margin-top: 30px;
        row-gap: 25px;
    }

    @media (max-width: 370px) {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>