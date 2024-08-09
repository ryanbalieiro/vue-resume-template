<template>
    <div class="progress-bar-wrapper">
        <!-- Bootstrap Progress -->
        <div class="progress">
            <div class="progress-bar"
                 role="progressbar"
                 :style="style"
                 :aria-valuenow="percentage"
                 aria-valuemin="0"
                 aria-valuemax="100"/>
        </div>

        <!-- ProgressBar Description -->
        <div class="progress-description">
            <p v-if="props.description" class="text-1 text-description mb-0"
               v-html="props.description"/>
        </div>
    </div>
</template>

<script setup>
import {useUtils} from "../../composables/utils.js"
import {computed} from "vue"

/**
 * @property {Number} percentage
 * @property {String} description
 * @property {String} color
 */
const props = defineProps({
    percentage:Number,
    description:String,
    color:String
})

const utils = useUtils()

/**
 * @type {ComputedRef<number>}
 */
const percentage = computed(() => {
    return utils.clamp(props.percentage, 0, 100)
})

/**
 * @type {ComputedRef<string>}
 */
const style = computed(() => {
    const percentageValue = percentage.value
    const opacity = (50 + percentageValue*0.5)/100
    const color = props.color ? `background-color: ${props.color}` : ''

    return `width: ${percentageValue}%; opacity: ${opacity}; ${color}`
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.progress {
    @include generate-dynamic-styles-with-hash((
        xxxl:     (height: 5px),
        md:       (height: 4px)
    ));

    background-color: lighten($light-3, 2%);
}

.progress-bar {
    background-color: lighten($primary, 10%);
    -webkit-transition: none;
    -moz-transition: none;
    -ms-transition: none;
    -o-transition: none;
    transition: none;
}

.progress-description {
    margin-top:0.2rem;
    color:$light-6;
}
</style>