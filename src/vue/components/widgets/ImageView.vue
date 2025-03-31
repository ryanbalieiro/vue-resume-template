<template>
    <div class="image-view" :class="props.class">
        <img class="image"
             :class="imageClass"
             v-show="shouldShowImage"
             ref="img"
             :src="path"
             :alt="alt"
             @load="_onImageLoadSuccess"
             @error="_onImageLoadError"/>

        <Spinner v-if="props.spinnerEnabled"
                 v-show="shouldShowSpinner"
                 class="spinner"/>

        <div v-if="shouldShowFallback"
             class="image-not-found-fallback"
             :class="imageClass">
            <i class="fa-solid fa-eye-slash"/>
        </div>
    </div>
</template>

<script setup>
import {computed, ref, watch} from "vue"
import Spinner from "/src/vue/components/widgets/Spinner.vue"
import {useUtils} from "/src/composables/utils.js"

const utils = useUtils()

const props = defineProps({
    src: String,
    alt: String,
    class: String,
    spinnerEnabled: Boolean,
    imageClass: String,
    resolvePath: Boolean
})

const LoadStatus = {
    LOADING: "loading",
    LOADED: "loaded",
    ERROR: "error"
}

const emit = defineEmits(["loaded", "error", "completed"])
const img = ref(null)
const loadStatus = ref(LoadStatus.LOADING)

const shouldShowImage = computed(() => { return loadStatus.value === LoadStatus.LOADED })
const shouldShowSpinner = computed(() => { return loadStatus.value === LoadStatus.LOADING })
const shouldShowFallback = computed(() => { return loadStatus.value === LoadStatus.ERROR })

const path = computed(() => {
    if(!props.resolvePath)
        return props.src
    return utils.resolvePath(props.src)
})

watch(() => props.src, () => {
    loadStatus.value = LoadStatus.LOADING
})

const isLoading = () => {
    return loadStatus.value === LoadStatus.LOADING
}

const _onImageLoadSuccess = () => {
    loadStatus.value = LoadStatus.LOADED
    if(img.value) {
        img.value.setAttribute('load-status', LoadStatus.LOADED)
    }
    emit("loaded")
    emit("completed")
}

const _onImageLoadError = () => {
    loadStatus.value = LoadStatus.ERROR
    if(img.value) {
        img.value.setAttribute('load-status', LoadStatus.ERROR)
    }
    emit("error")
    emit("completed")
}

defineExpose({
    loadStatus,
    isLoading
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

div.image-view {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

img.image {
    width: 100%;
    height: 100%;
}

img.spinner {
    position: absolute;
}

div.image-not-found-fallback {
    background-color: rgba(black, 0.2);
    border-radius: 20px;

    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    color: $light-2;
}
</style>