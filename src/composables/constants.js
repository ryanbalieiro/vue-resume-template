/**
 * Created by Ryan Balieiro on 08.23.2023
 * Hub for defining app constants.
 */
export function useConstants() {
    /** @type {string} */
    const BASE_URL = import.meta.env.BASE_URL

    /** @const **/
    const BOOTSTRAP_BREAKPOINTS = {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1400,
    }

    /** @type {number} */
    const NAV_SECTION_PICKER_HEIGHT = 50

    /** @type {number} */
    const NAV_SECTION_PICKER_COMPRESSED_HEIGHT = 45

    /** @enum **/
    const PresentationModes = {
        ONE_AT_ONCE: "mode_one_at_once",
        ALL_AT_ONCE: "mode_all_at_once",
        NONE: "mode_none"
    }

    return {
        // Global Constants...
        BASE_URL,
        BOOTSTRAP_BREAKPOINTS,
        NAV_SECTION_PICKER_HEIGHT,
        NAV_SECTION_PICKER_COMPRESSED_HEIGHT,

        // Enums...
        PresentationModes,
    }
}