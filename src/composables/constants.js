/**
 * Created by Ryan Balieiro on 08.23.2023
 * Hub for defining app constants.
 */
export function useConstants() {
    /** @const **/
    const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '')

    /** @const **/
    const BOOTSTRAP_BREAKPOINTS = {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1400,
    }

    /** @const **/
    const HTML_CLASSES = {
        bodyScroll: '',
        bodyNoScroll: 'no-scroll',
        imageViewImage: 'image-view-img',
        imageViewImageIgnoredOnCount: 'image-view-img-ignored-on-count'
    }

    /** @const **/
    const LOCAL_STORAGE_ITEMS = {
        language: 'app.preferences.language'
    }

    /** @const **/
    const NAVIGATION_SIDEBAR_BREAKPOINT = "lg"

    /** @const **/
    const RANDOM_COLOR_ARRAY = [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(197,176,255)',
        'rgb(142, 227, 197)',
        'rgb(238, 183, 154)',
        'rgb(164,205,253)',
        'rgb(246,169,255)',
        'rgb(171, 235, 198)',
        'rgb(255, 201, 214)',
        'rgb(209, 247, 200)',
        'rgb(235, 214, 169)',
        'rgb(174, 229, 248)',
        'rgb(246, 224, 196)',
        'rgb(255, 217, 232)'
    ]

    /** @enum **/
    const LoadStatus = {
        LOADING: "loading",
        LOADED: "loaded",
        ERROR: "error"
    }

    return {BASE_PATH, HTML_CLASSES, BOOTSTRAP_BREAKPOINTS, LOCAL_STORAGE_ITEMS, NAVIGATION_SIDEBAR_BREAKPOINT, RANDOM_COLOR_ARRAY, LoadStatus}
}