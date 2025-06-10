/**
 * Created by Ryan Balieiro on 08.26.2023
 * This composable will implement helper functions that can be used by multiple components within the architecture.
 */
import {useConstants} from "/src/composables/constants.js"

const constants = useConstants()

export function useUtils() {
    /**
     * @param {Number} value
     * @param {Number} min
     * @param {Number} max
     * @return {number}
     */
    const clamp = (value, min, max) => {
        if(isNaN(Number(value)) || value === null || value === undefined)
            return min

        return Math.min(Math.max(value, min), max)
    }

    /**
     * @Boolean
     */
    const isAndroid = () => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        return /android/.test(userAgent);
    }

    /**
     * @return {boolean}
     */
    const isIOS = () => {
        const userAgent = window.navigator.userAgent.toLowerCase()
        return /iphone|ipad|ipod/.test(userAgent)
            || /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    }

    /**
     * @return {boolean}
     */
    const isChromeOS = () => {
        const userAgent = window.navigator.userAgent.toLowerCase()
        return /cros/.test(userAgent);
    }

    /**
     * @param {String} string
     * @return {boolean}
     */
    const isStringAnImageUrl = (string) => {
        return /\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(string)
    }

    /**
     * @return {boolean}
     */
    const isTouchDevice = () => {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0))
    }

    /**
     * @param {String} string
     * @return {boolean}
     */
    const isValidEmail = (string) => {
        return Boolean(String(string)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ))
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
     * @param {Array} array
     * @param {string} key
     * @return {boolean}
     */
    const hasDuplications = (array, key) => {
        const seen = new Set()
        for (const item of array) {
            if (seen.has(item[key])) return true
            seen.add(item[key])
        }
        return false
    }

    /** @return {string} */
    const getRootSCSSVariable = (colorName) => {
        const root = document.documentElement
        return getComputedStyle(root).getPropertyValue('--' + colorName).trim()
    }

    /** @return {Number} **/
    const getYearsPassedSince = (date) => {
        const currentDate = new Date()
        const differenceInMilliseconds = currentDate - date
        const millisecondsPerYear = 365.25 * 24 * 60 * 60 * 1000
        return differenceInMilliseconds / millisecondsPerYear
    }

    /**
     * @param {String} [prefix]
     * @return {string}
     */
    const generateUniqueRandomString = (prefix) => {
        prefix = prefix || 'key'
        window.randStrGenCount = window.randStrGenCount || 0
        window.randStrGenCount++
        return prefix + "-rand-" + window.randStrGenCount
    }

    /**
     * @param {String} path
     * @return {String}
     */
    const resolvePath = (path) => {
        const baseUrl = constants.BASE_URL || ''
        return baseUrl + path
    }

    /**
     * @return {string}
     */
    const getAbsoluteLocation = () => {
        const { protocol, host, pathname, search, hash } = window.location
        return `${protocol}//${host}${pathname}${search}${hash}`
    }

    return {
        clamp,
        isAndroid,
        isIOS,
        isChromeOS,
        isStringAnImageUrl,
        isTouchDevice,
        isValidEmail,
        isElementOutsideBounds,
        hasDuplications,
        getRootSCSSVariable,
        getYearsPassedSince,
        generateUniqueRandomString,
        resolvePath,
        getAbsoluteLocation
    }
}