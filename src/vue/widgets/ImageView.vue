<template>
    <div class="image-view">
        <!-- Image -->
        <img ref="img"
             v-show="isLoaded()"
             :src="props.src"
             :alt="props.alt"
             :class="classList"
             @load="_onLoad"
             @error="_onError">

        <!-- Loading Spinner -->
        <div v-if="props.spinnerEnabled"
             class="spinner"
             v-show="!isLoaded()">

            <!-- Base 64 Spinner -->
            <img alt="loading..." class="preloader-gif" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0ibWFyZ2luOiBhdXRvOyBiYWNrZ3JvdW5kOiBub25lOyBkaXNwbGF5OiBibG9jazsgc2hhcGUtcmVuZGVyaW5nOiBhdXRvOyIgd2lkdGg9IjIwMHB4IiBoZWlnaHQ9IjIwMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiPgo8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIzMiIgc3Ryb2tlLXdpZHRoPSI4IiBzdHJva2U9IiM1NDUxNTEiIHN0cm9rZS1kYXNoYXJyYXk9IjUwLjI2NTQ4MjQ1NzQzNjY5IDUwLjI2NTQ4MjQ1NzQzNjY5IiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiPgogIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIga2V5VGltZXM9IjA7MSIgdmFsdWVzPSIwIDUwIDUwOzM2MCA1MCA1MCI+PC9hbmltYXRlVHJhbnNmb3JtPgo8L2NpcmNsZT4KPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMjMiIHN0cm9rZS13aWR0aD0iOCIgc3Ryb2tlPSIjYzNjM2M1IiBzdHJva2UtZGFzaGFycmF5PSIzNi4xMjgzMTU1MTYyODI2MiAzNi4xMjgzMTU1MTYyODI2MiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjM2LjEyODMxNTUxNjI4MjYyIiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiPgogIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiBkdXI9IjFzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIga2V5VGltZXM9IjA7MSIgdmFsdWVzPSIwIDUwIDUwOy0zNjAgNTAgNTAiPjwvYW5pbWF0ZVRyYW5zZm9ybT4KPC9jaXJjbGU+CjwhLS0gW2xkaW9dIGdlbmVyYXRlZCBieSBodHRwczovL2xvYWRpbmcuaW8vIC0tPjwvc3ZnPg==" />
        </div>
    </div>
</template>

<script setup>
import {computed, onMounted, ref, watch} from "vue"
import {useConstants} from "../../composables/constants.js"

/**
 * @property {String} src
 * @property {String} alt
 * @property {Boolean} [ignoreOnImageCount=false]
 * @property {Boolean} [spinnerEnabled=false]
 */
const props = defineProps({
    src: String,
    alt: String,
    ignoreOnImageCount: Boolean,
    spinnerEnabled: Boolean
})

const constants = useConstants()

const emit = defineEmits(['loading', 'loaded', 'error', 'completed'])
const img = ref(null)
const loadStatus = ref(null)

/**
 * @type {ComputedRef<String>}
 */
const classList = computed(() => {
    return constants.HTML_CLASSES.imageViewImage + (props.ignoreOnImageCount ? ` ${constants.HTML_CLASSES.imageViewImageIgnoredOnCount}` : '')
})

/**
 * @private
 */
onMounted(() => {
    _onSourceChanged()
})

/**
 * @private
 */
watch(() => props.src, () => {
    _onSourceChanged()
})

/**
 * @return {boolean}
 */
const isLoaded = () => {
    return loadStatus.value === constants.LoadStatus.LOADED || loadStatus.value === constants.LoadStatus.ERROR
}

/**
 * @private
 */
const _onLoad = () => {
    _setLoadStatus(constants.LoadStatus.LOADED)
}

/**
 * @private
 */
const _onError = () => {
    _setLoadStatus(constants.LoadStatus.ERROR)
}

/**
 * @param {constants.LoadStatus} status
 * @private
 */
const _setLoadStatus = (status) => {
    loadStatus.value = status
    img.value.setAttribute('loadStatus', status)
    switch(status) {
        case constants.LoadStatus.LOADING:
            emit('loading')
            break

        case constants.LoadStatus.LOADED:
            emit('loaded')
            emit('completed')
            break

        case constants.LoadStatus.ERROR:
            emit('error')
            emit('completed')
            break
    }
}

/**
 * @private
 */
const _onSourceChanged = () => {
    _setLoadStatus(typeof props.src !== 'string' ? constants.LoadStatus.ERROR : constants.LoadStatus.LOADING)
}

defineExpose({
    isLoaded
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.image-view {
    display: inline-block;
    overflow: hidden;
}

.image-view-img {
    width: 100%;
    height: 100%;
    vertical-align: top;
}

.spinner {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
    background-color: rgba($dark, 0.05);
}

.preloader-gif {
    @include generate-dynamic-styles-with-hash((
        xxxl:   (max-width: 200px,  max-height:200px),
        md:     (max-width: 130px,  max-height:130px),
        sm:     (max-width: 90px,   max-height:90px),
    ));

    margin: 0 auto;
    width: 50%;
    height: 50%;
}
</style>