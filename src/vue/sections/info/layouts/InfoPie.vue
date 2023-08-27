<template>
    <div class="row gx-0 mb-1 mb-md-3 mb-xl-4">
        <!-- Chart Column -->
        <div class="col-12 col-xl-5 col-xxl-4 d-flex">
            <div class="chart-wrapper">
                <Pie class="chart" :data="chartData" :options="CHART_OPTIONS"/>
            </div>
        </div>

        <!-- Items Column -->
        <div class="col-12 col-xl-7 col-xxl-8 d-flex pt-3">
            <div class="row gy-1 gy-xl-3 gx-md-5 items-wrapper">
                <div v-for="item in props.items" class="col-12 col-sm-6 item-container">
                    <InfoItem :item="item"
                              :highlighted-header="false"
                              :small-description="true"
                              :description-with-progress-bar="false"
                              :icon-color-style="'customColor'"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import InfoItem from "../partials/InfoItem.vue"
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Title, Tooltip } from 'chart.js'
import {computed} from "vue"

/**
 * @property {Object[]} items
 */
const props = defineProps({
    items: Array,
})

ChartJS.register(Title, Tooltip, ArcElement)

/**
 * @const
 * @type {Object}
 */
const CHART_OPTIONS = {
    responsive:true,
    maintainAspectRatio: false,
    animation: false,
    plugins: {
        tooltip: {
            callbacks: {
                label: (tooltipItem, data) => {
                    return " " + Math.round(tooltipItem.parsed) + "% "
                }
            }
        }
    }
}

/**
 * @return {{datasets: [{backgroundColor: *[], data: *[]}], labels: *[]}}
 * @private
 */
const chartData = computed(() => {
    const chartData = {
        labels: [],
        datasets: [{ data: [], backgroundColor: [] }],
    }

    const totalPercentage = props.items.reduce((total, item) => {
        const title = item['locales']['title']
        const value = item['value']

        chartData.labels.push(title)
        return total + value
    }, 0)

    const dataset = chartData.datasets[0]

    props.items.forEach((item, i) => {
        const value = item['value']
        const percentage = Math.round(value * 100 / totalPercentage)

        dataset.data.push(percentage)
        dataset.backgroundColor.push(item['customColor'])
    })

    return chartData
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.chart-wrapper {
    width: 100%;
    height: 100%;
    max-height: clamp(280px, 36.5vh, 430px);
    max-width: calc(100% - 3.5rem);
    align-self: center;

    @include media-breakpoint-down(xxl) {
        max-width: calc(100% - 2.5rem);
    }

    @include media-breakpoint-down(xl) {
        --dimensions: clamp(150px, min(45vw, 45vh), 270px);
        width: var(--dimensions);
        height: var(--dimensions);
        margin: 0 auto calc(var(--dimensions)/8);
    }
}

.items-wrapper {
    align-self: center;
}

.item-container {
    @include generate-dynamic-styles-with-hash((
        xxxl: (min-height:4.0rem),
        xl:   (min-height:4.0rem),
        lg:   (min-height:3.5rem),
        md:   (min-height:3.5rem),
        sm:   (min-height:0)
    ));
}
</style>