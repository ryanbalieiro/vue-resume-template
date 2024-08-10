<template>
    <!-- Loader Wrapper -->
    <div class="loader-full-screen"
         :class="{
            'loader-full-screen-faded': !didReachStep(Steps.LOADING_LOGO),
            'loader-full-screen-tween-out': didReachStep(Steps.LEAVING)
         }">

        <!-- Loader Content -->
        <div class="loader-full-screen-content" v-show="didReachStep(Steps.SHOWING_LOGO)">
            <!-- Logo -->
            <ImageView  :src="'images/icons/resume.ico'"
                        :alt="'Logo'"
                        :ignore-on-image-count="true"
                        ref="uiLogo"
                        class="img-fluid img-logo"/>

            <!-- Progress Display -->
            <div class="progress-display" :class="{
                'progress-display-expanded': didReachStep(Steps.SHOWING_PROGRESS_BAR)
            }">
                <!-- Percentage -->
                <p class="mt-1 mb-2 text-2 text-white">{{ percentage }}%</p>

                <!-- Progress Bar -->
                <ProgressBar ref="progressBar"
                             class="progress-bar-wrapper"
                             :percentage="percentage"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import {computed, onMounted, ref} from "vue"
import ProgressBar from "../widgets/ProgressBar.vue"
import ImageView from "../widgets/ImageView.vue"
import {useData} from "/src/composables/data.js"
import {useLayout} from "/src/composables/layout.js"

const data = useData()
const layout = useLayout()

const emit = defineEmits(['shown', 'hiding', 'hidden'])

const Steps = {
    HIDDEN: 'steps.hidden',
    LOADING_LOGO: 'steps.loading_logo',
    SHOWING_LOGO: 'steps.showing_logo',
    SHOWING_PROGRESS_BAR: 'steps.showing_progress_bar',
    PRELOADING: 'steps.preloading',
    LEAVING: 'steps.leaving',
}

const STEPS_ORDER = Object.values(Steps)
const INTERVAL_TIMEOUT = 1/60

/** Controls **/
const currentStep = ref(Steps.HIDDEN)
const currentStepElapsedTime = ref(0)
const intervalId = ref(-1)
const percentage = ref(0)

/** UI Refs **/
const uiLogo = ref(null)

const run = () => {
    stop()
    currentStep.value = Steps.LOADING_LOGO
    intervalId.value = setInterval(() => { _onIntervalTick() }, INTERVAL_TIMEOUT * 1000)
}

const stop = () => {
    clearInterval(intervalId.value)
    percentage.value = 0
    currentStep.value = Steps.HIDDEN
}

const didReachStep = (step) => {
    const targetStepId = STEPS_ORDER.indexOf(step)
    const currentStepId = STEPS_ORDER.indexOf(currentStep.value)
    return currentStepId >= targetStepId
}

const _onIntervalTick = () => {
    currentStepElapsedTime.value += INTERVAL_TIMEOUT

    let stepFinished = false
    switch (currentStep.value) {
        case Steps.LOADING_LOGO:
            stepFinished = uiLogo.value && uiLogo.value.isLoaded() && currentStepElapsedTime.value > 0.4
            break

        case Steps.SHOWING_LOGO:
            stepFinished = currentStepElapsedTime.value > 0.2
            break

        case Steps.SHOWING_PROGRESS_BAR:
            stepFinished = currentStepElapsedTime.value > 0.3
            break

        case Steps.PRELOADING:
            _updateProgressStatus()
            stepFinished = percentage.value >= 100
            break

        case Steps.LEAVING:
            stepFinished = currentStepElapsedTime.value >= 0.8
            break
    }

    if(stepFinished) {
        _nextStep()
    }
}

const _nextStep = () => {
    currentStepElapsedTime.value = 0

    let currentStepId = STEPS_ORDER.indexOf(currentStep.value)
    currentStepId++

    if(currentStepId < STEPS_ORDER.length) {
        currentStep.value = STEPS_ORDER[currentStepId]
        _notify()
    }
    else {
        _finish()
    }
}

const _updateProgressStatus = () => {
    const jsonLoadProgress = data.getLoadProgress()
    const imageCount = layout.getImageCount()

    let imageLoadProgress = 0
    if(imageCount.total > 0) {
        imageLoadProgress = Math.round(100 * imageCount.loaded / imageCount.total)
    }
    else if(jsonLoadProgress === 100) {
        imageLoadProgress = 100
    }

    const durationPercentage = 100 * currentStepElapsedTime.value/1.2
    const loadingPercentage = imageLoadProgress
    const average = (durationPercentage + loadingPercentage)/2

    const diff = Math.min(2, average - percentage.value)
    percentage.value += Math.round(diff)
    if(percentage.value > 100)
        percentage.value = 100
}

const _notify = async () => {
    switch (currentStep.value) {
        case Steps.SHOWING_LOGO:
            emit('shown')
            break

        case Steps.LEAVING:
            emit('hiding')
            break
    }
}

const _finish = () => {
    emit('hidden')
    stop()
}

defineExpose({
    Steps,
    run,
    didReachStep,
    stop
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.loader-full-screen {
    position: fixed;

    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 9999;
    background-color: $dark;

    width: 100vw;
    height: 125vh;
    top: -12.5vh;
}

.loader-full-screen-faded {
    opacity: 0;
    transition: none!important;
    user-select: none;
    pointer-events: none;
}

.loader-full-screen-tween-out {
    top: -125vh;
    transition: 1.2s top cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.loader-full-screen-content {
    color: $text-normal-contrast;
    text-align: center;
    padding-bottom: 5rem;
}

.img-logo {
    max-height: 60px;
    aspect-ratio: 1/1;
    z-index: 99;
    animation: popIn 0.3s ease-out forwards;
}

.progress-display {
    opacity: 0;
    transform: translateY(-30px);
    overflow: hidden;
    z-index: 50;
    transition: 0.3s all ease-out;

    &-expanded {
        opacity: 1;
        transform: none;
    }
}

.progress-bar-wrapper {
    max-width: 55px;
    margin: 0 auto;
}

@keyframes popIn {
    from {
        opacity:0;
        transform: scale(0.2) translateY(-100%);
    }
    to {
        opacity:1
    }
}
</style>