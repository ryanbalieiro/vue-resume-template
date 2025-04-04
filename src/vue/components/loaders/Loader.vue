<template>
    <!-- Loader Wrapper -->
    <div v-if="visible && currentStep"
         id="resume-loader"
         class="resume-loader"
         :class="{
            'resume-loader-tween-in': currentStep === Steps.WILL_ENTER,
            'resume-loader-tween-out': currentStep === Steps.LEAVING
         }">
        <!-- Loader Content -->
        <div class="resume-loader-content">
            <ImageView src="images/icons/resume.ico"
                       alt="Logo"
                       class="image-view-logo"
                       :class="{
                          'image-view-logo-animated': currentStep >= Steps.ANIMATING_LOGO
                       }"
                       @completed="_onLogoLoaded"
                       :spinner-enabled="false"
                       :resolve-path="true"/>

            <div class="resume-loader-progress-display"
                 :class="{
                    'resume-loader-progress-display-hidden': currentStep <  Steps.ANIMATING_PROGRESS,
                    'transition-none': currentStep < Steps.ANIMATING_PROGRESS
                 }">
                <p class="percentage text-2"
                   v-html="`${percentage}%`"/>

                <ProgressBar class="resume-loader-progress-bar"
                             :percentage="percentage"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import {onMounted, watch, ref, inject} from "vue"
import {useScheduler} from "/src/composables/scheduler.js"
import ImageView from "/src/vue/components/widgets/ImageView.vue"
import ProgressBar from "/src/vue/components/widgets/ProgressBar.vue"
import {useUtils} from "/src/composables/utils.js"

const scheduler = useScheduler()
const utils = useUtils()

const props = defineProps({
    visible: Boolean,
    refreshCount: Number,
    smoothTransitionEnabled: Boolean
})

const Steps = {
    NONE: 0,
    WILL_ENTER: 1,
    ENTERING: 2,
    LOADING_LOGO: 3,
    ANIMATING_LOGO: 4,
    ANIMATING_PROGRESS: 5,
    WAITING_FOR_COMPLETION: 6,
    LEAVING: 7
}

const emit = defineEmits(['ready', 'completed'])

/** @type {{value: Boolean}} */
const canScroll = inject("canScroll")

const schedulerTag = "loader"
const didLoadLogo = ref(false)
const didEmitReady = ref(false)
const currentStep = ref(Steps.NONE)
const percentage = ref(0)
const loadingTime = ref(0)
const loadingTimeAfterRendering = ref(0)

onMounted(() => {
    scheduler.clearAllWithTag(schedulerTag)
    _performTransition()
})

watch(() => props.visible, () => {
    scheduler.clearAllWithTag(schedulerTag)
    _performTransition()
})

watch(() => props.refreshCount, () => {
    scheduler.clearAllWithTag(schedulerTag)
    percentage.value = 0
    currentStep.value = Steps.NONE
    _executeAnimatingLogoStep()
})

const _onLogoLoaded = () => {
    didLoadLogo.value = true
}

const _performTransition = () => {
    if(!props.visible)
        return

    percentage.value = 0
    currentStep.value = Steps.NONE

    if(props.smoothTransitionEnabled)
        _executeEnteringStep()
    else
        _executeAnimatingLogoStep()
}

const _executeEnteringStep = () => {
    currentStep.value = Steps.WILL_ENTER

    scheduler.schedule(() => {
        currentStep.value = Steps.ENTERING
    }, 30, schedulerTag)

    scheduler.schedule(() => {
        _executeAnimatingLogoStep()
    }, 350, schedulerTag)
}

const _executeAnimatingLogoStep = () => {
    currentStep.value = Steps.LOADING_LOGO
    canScroll.value = false

    if(!didLoadLogo.value) {
        scheduler.schedule(() => {
            _executeAnimatingLogoStep()
        }, 100, schedulerTag)
        return
    }

    currentStep.value = Steps.ANIMATING_LOGO
    scheduler.schedule(() => {
        _executeAnimatingProgressStep()
    }, 300, schedulerTag)
}

const _executeAnimatingProgressStep = () => {
    currentStep.value = Steps.ANIMATING_PROGRESS
    scheduler.schedule(() => {
        _executeWaitingForCompletionStep()
    }, 200, schedulerTag)
}

const _executeWaitingForCompletionStep = () => {
    currentStep.value = Steps.WAITING_FOR_COMPLETION

    const dt = 1000 / 30
    loadingTime.value = 0
    loadingTimeAfterRendering.value = 0
    didEmitReady.value = false

    scheduler.interval(() => {
        _updateProgress(dt)
    }, dt, schedulerTag)
}

const _updateProgress = (dt) => {
    const isPageLoaded = Boolean(document.querySelector('#resume'))

    loadingTime.value += isPageLoaded ?
        dt :
        dt / Math.max(4, percentage.value)

    loadingTimeAfterRendering.value += isPageLoaded ?
        dt :
        0

    const imageLoadPercentage = _getImageLoadPercentage()
    const minTimePercentage = utils.clamp(loadingTime.value*80/500, 0, 100)
    const minTimePercentageAfterRendering = utils.clamp(loadingTimeAfterRendering.value*100/500, 0, 100)

    const currentPercentage = (imageLoadPercentage + minTimePercentage + minTimePercentageAfterRendering)/3
    _incrementDisplayPercentage(currentPercentage)
}

const _getImageLoadPercentage = () => {
    const imageElements = document.querySelectorAll(".image")
    const imageLoadProgress = {loaded: 0, total: 0}
    Array.from(imageElements).map(item => {
        imageLoadProgress.total++
        if(item.getAttribute('load-status') === "loaded" || item.getAttribute('load-status') === "error")
            imageLoadProgress.loaded++
    })

    if(imageLoadProgress.total < 2)
        return 0
    return utils.clamp(imageLoadProgress.loaded*100/imageLoadProgress.total, 0, 100)
}

const _incrementDisplayPercentage = (currentPercentage) => {
    const diff = currentPercentage - percentage.value
    const smootheningPercentageIncrement = diff > 8 ? 8 : Math.round(diff)
    percentage.value += smootheningPercentageIncrement
    percentage.value = utils.clamp(percentage.value, 0, 100)

    if(percentage.value > 5 && !didEmitReady.value) {
        emit('ready')
    }

    if(percentage.value === 100 || loadingTimeAfterRendering.value >= 5000) {
        _onLoadingComplete()
    }
}

const _onLoadingComplete = () => {
    scheduler.schedule(() => {
        percentage.value = 100
        _executeLeavingStep()
    }, 300, schedulerTag)
}

const _executeLeavingStep = () => {
    currentStep.value = Steps.LEAVING
    canScroll.value = true
    scheduler.schedule(() => {
        emit('completed')
    }, 900, schedulerTag)
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

div.resume-loader {
    position: fixed;
    z-index: $z-index-loader;
    user-select: none;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: $loader-background;
    width: 100vw;
    height: 125vh;
    height: 125svh;
    top: -12.5vh;
    top: -12.5svh;
    transition: opacity 0.3s ease-in;

    &-tween-in {
        opacity: 0;
        transition: none!important;
        user-select: none;
        pointer-events: none;
    }

    &-tween-out {
        top: -125vh;
        transition: 1.2s top cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
}

div.resume-loader-content {
    color: $light;
    text-align: center;
    padding-bottom: 5rem;
}

div.image-view-logo {
    width: 60px;
    height: 60px;
    z-index: 10;
    opacity: 0;

    &-animated {
        animation: popIn 0.3s ease-out forwards;
    }
}

div.resume-loader-progress-display {
    margin-top: 10px;
    overflow: hidden;
    z-index: 5;
    transition: 0.3s all ease-out;

    &-hidden {
        opacity: 0;
        margin-top: -30px;
    }

    p {
        color: $light;
        margin-bottom: 5px;
        font-family: sans-serif;
    }

    .resume-loader-progress-bar {
        max-width: 55px;
        margin: 0 auto;
    }
}

div.transition-none {
    transition: none!important;
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