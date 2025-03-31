<template>
    <Pie class="skills-pie-chart"
         :data="chartData"
         :options="chartOptions"/>
</template>

<script setup>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Title, Tooltip } from 'chart.js'
import {computed, inject, onBeforeMount} from "vue"
import {useUtils} from "/src/composables/utils.js"

const utils = useUtils()

const props = defineProps({
    /** @type {Article} **/
    model: {
        type: Object,
        required: true
    }
})

/** @type {Function} */
const localize = inject("localize")

onBeforeMount(() => {
    ChartJS.register(Title, Tooltip, ArcElement)
})

const chartOptions = computed(() => {
    return {
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
})

const chartData = computed(() => {
    const chartData = {
        labels: [],
        datasets: [{ data: [], borderWidth: 3, backgroundColor: [], borderColor: [], hoverBorderColor: [] }],
    }

    const items = props.model.items
    const borderColor = utils.getRootSCSSVariable("chart-js-border-color")
    const hoverBorderColor = utils.getRootSCSSVariable("chart-js-hover-border-color")

    const totalPercentage = items.reduce((total, item) => {
        const title = localize(item.locales, "title")
        const value = item.percentage
        chartData.labels.push(title)
        return total + value
    }, 0)

    const dataset = chartData.datasets[0]
    items.forEach(item => {
        const percentage = Math.round(item.percentage * 100 / totalPercentage)
        dataset.data.push(percentage)
        dataset.backgroundColor.push(item.fallbackFaIconColor)
        dataset.borderColor.push(borderColor)
        dataset.hoverBorderColor.push(hoverBorderColor)
    })

    return chartData
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";
</style>