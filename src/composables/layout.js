/**
 * Created by Ryan Balieiro on 08.23.2023
 * This composable will implement helper methods that manipulate DOM elements.
 */
import {useConstants} from "./constants.js"

const constants = useConstants()

/**
 * @type {Ref<any>|null}
 * @private
 */
let _feedbackView = null

export function useLayout() {
    /**
     * @param {String} breakpoint
     * @return {boolean}
     */
    const isBootstrapBreakpoint = (breakpoint) => {
        return window.innerWidth >= constants.BOOTSTRAP_BREAKPOINTS[breakpoint]
    }

    /**
     * @return {string}
     */
    const getBootstrapBreakpoint = () => {
        const windowWidth = window.innerWidth
        let windowBreakpoint = ''

        for (const breakpoint in constants.BOOTSTRAP_BREAKPOINTS) {
            if (windowWidth >= constants.BOOTSTRAP_BREAKPOINTS[breakpoint]) {
                windowBreakpoint = breakpoint
            }
        }

        return windowBreakpoint
    }

    /**
     * @param {Ref<any>|null} feedbackView
     */
    const setFeedbackView = (feedbackView) => {
        _feedbackView = feedbackView
    }

    /**
     * @return {*}
     */
    const getFeedbackView = () => {
        if(_feedbackView) {
            return _feedbackView.value
        }

        return null
    }

    /**
     * @param {Boolean} enabled
     */
    const setPageScrollingEnabled = (enabled) => {
        const root = document.getElementsByTagName( 'html' )[0]
        if(!enabled) {
            document.body.className = constants.HTML_CLASSES.bodyNoScroll
            root.className += ' ' + constants.HTML_CLASSES.bodyNoScroll
        }
        else {
            document.body.className = constants.HTML_CLASSES.bodyScroll
            root.className = ''
        }
    }

    /**
     * @param {HTMLElement} element
     * @return {boolean}
     */
    const isElementOutsideBounds = (element) => {
        const rect = element.getBoundingClientRect()

        return (
            rect.bottom < 0 ||
            rect.right < 0 ||
            rect.left > window.innerWidth ||
            rect.top > window.innerHeight
        )
    }

    /**
     * @return {{loaded: number, total: number}}
     */
    const getImageCount = () => {
        const imageElements = document.querySelectorAll('.' + constants.HTML_CLASSES.imageViewImage)
        let totalImages = 0

        const loadedImages = Array.from(imageElements).reduce((count, image) => {
            if(!image.classList.contains(constants.HTML_CLASSES.imageViewImageIgnoredOnCount)) {
                totalImages++
                if (image.getAttribute('loadStatus') !== constants.LoadStatus.LOADING)
                    return count + 1
            }
            return count
        }, 0)

        return {loaded: loadedImages, total: totalImages }
    }

    /**
     * @return {{}}
     */
    const getStylePreferencesForPlugins = () => {
        const preferences = {}
        preferences.colors = {
            primary: getComputedStyle(document.documentElement).getPropertyValue('--bs-primary'),
            dark: getComputedStyle(document.documentElement).getPropertyValue('--bs-dark')
        }

        preferences.colors.random = constants.RANDOM_COLOR_ARRAY.slice()
        return preferences
    }

    /**
     * @param {Number} scrollY
     * @param {Boolean} withTimeout
     */
    const instantScrollTo = (scrollY, withTimeout) => {
        _applyAfterTimeout(() => {
            window.scrollTo({
                top: scrollY ?? 0,
                left: 0,
                behavior: 'instant'
            })
        }, 10)
    }

    /**
     * @param {Number} scrollY
     * @param {Boolean} withTimeout
     */
    const smoothScrollTo = (scrollY, withTimeout) => {
        _applyAfterTimeout(() => {
            window.scrollTo({
                top: scrollY ?? 0,
                left: 0,
                behavior: 'smooth'
            })
        }, 100)
    }

    /**
     * @param {String} elementId
     * @param {Boolean} withTimeout
     */
    const instantScrollToElement = (elementId, withTimeout) => {
        const target = document.getElementById(elementId)
        if(!target) {
            return
        }

        _applyAfterTimeout(() => {
            target.scrollIntoView({
                behavior: 'instant',
                block: 'start'
            })
        }, 10)
    }

    /**
     * @param {String} elementId
     * @param {Boolean} withTimeout
     */
    const smoothScrollToElement = (elementId, withTimeout) => {
        const target = document.getElementById(elementId)
        if(!target) {
            return
        }

        _applyAfterTimeout(() => {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }, 100)
    }

    /**
     * @param {Function} closure
     * @param {Number} timeout
     * @private
     */
    const _applyAfterTimeout = (closure, timeout) => {
        if(timeout) {
            setTimeout(closure, timeout)
        }
        else {
            closure()
        }
    }

    return {
        isBootstrapBreakpoint,
        getBootstrapBreakpoint,
        setFeedbackView,
        getFeedbackView,
        getImageCount,
        getStylePreferencesForPlugins,
        isElementOutsideBounds,
        setPageScrollingEnabled,
        instantScrollTo,
        smoothScrollTo,
        instantScrollToElement,
        smoothScrollToElement
    }
}