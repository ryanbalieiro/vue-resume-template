/**
 * Created by Ryan Balieiro on 08.24.2023
 * This composable will be responsible for managing the navigation data.
 */

import {reactive} from "vue"
import {useConstants} from "./constants.js"
import {useLayout} from "./layout.js"

const constants = useConstants()
const layout = useLayout()

/**
 * @enum
 */
const NavigationModes = {
    ONE_AT_ONCE: "navigationModeOneAtOnce",
    ALL_AT_ONCE: "navigationModeAllAtOnce"
}

/**
 * @constant
 * @type {string}
 */
const LOCAL_STORAGE_KEY = 'navigation.state'

/**
 * @type {any|{}}
 * @private
 */
const _savedState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {}

/**
 * @type {Object}
 * @private
 */
const _navigationOptions = reactive({
    mode: NavigationModes.ALL_AT_ONCE,
    activeSectionId: null,
    lastVisitedSections: {},
    isSidebarExpanded: _savedState.isSidebarExpanded !== undefined ? _savedState.isSidebarExpanded : true
})

/**
 * @type {{}}
 * @private
 */
const _categorySectionMapping = {}

export function useNavigation() {
    /**
     * @param {Array} sections
     * @param {Array} categories
     */
    const init = (sections, categories) => {
        categories.forEach(category => {
            _categorySectionMapping[category['id']] = []
        })

        sections.forEach(section => {
            _categorySectionMapping[section['categoryId']].push(section['id'])
        })
    }

    /**
     * @return {boolean}
     */
    const isOneAtOnceMode = () => {
        return _navigationOptions.mode === NavigationModes.ONE_AT_ONCE
    }

    /**
     * @return {boolean}
     */
    const isAllAtOnceMode = () => {
        return _navigationOptions.mode === NavigationModes.ALL_AT_ONCE
    }

    /**
     * @return {String|null}
     */
    const getActiveSectionId = () => {
        return _navigationOptions.activeSectionId
    }

    /**
     * @param {String} sectionId
     * @return {boolean}
     */
    const isSectionActive = (sectionId) => {
        return _navigationOptions.activeSectionId === sectionId
    }

    /**
     * @param {String} sectionId
     * @return {boolean}
     */
    const isSectionVisible = (sectionId) => {
        return _navigationOptions.activeSectionId === sectionId || _navigationOptions.mode === NavigationModes.ALL_AT_ONCE
    }

    /**
     * @public
     * @return {boolean}
     */
    const isSidebarExpanded = () => {
        return _navigationOptions.isSidebarExpanded
    }

    /**
     * @public
     */
    const toggleSidebarStatus = () => {
        _navigationOptions.isSidebarExpanded = !_navigationOptions.isSidebarExpanded
        _saveState()
    }

    /**
     * @public
     * @param {Boolean} expanded
     */
    const setSidebarStatus = (expanded) => {
        _navigationOptions.isSidebarExpanded = expanded
        _saveState()
    }

    /**
     * @return {String|null}
     */
    const getActiveCategoryId = () => {
        let activeCategoryId = null

        Object.entries(_categorySectionMapping).forEach(([categoryId, sectionArray]) => {
            if (sectionArray.includes(_navigationOptions.activeSectionId)) {
                activeCategoryId = categoryId
            }
        })

        return activeCategoryId
    }

    /**
     * @param {String} categoryId
     * @return {boolean}
     */
    const isCategoryActive = (categoryId) => {
        return categoryId === getActiveCategoryId()
    }

    /**
     * @private
     * @param {String} routeName
     */
    const update = (routeName) => {
        if(layout.isBootstrapBreakpoint(constants.NAVIGATION_SIDEBAR_BREAKPOINT)) {
            _navigationOptions.mode = NavigationModes.ALL_AT_ONCE
            _navigationOptions.activeSectionId = _scrollSpy('section')
        }
        else {
            _navigationOptions.mode = NavigationModes.ONE_AT_ONCE
            _navigationOptions.activeSectionId = routeName
        }
    }

    /**
     * @param {String} elementClass
     * @return {*|null}
     */
    const _scrollSpy = (elementClass) => {
        const sections = document.querySelectorAll('.' + elementClass)
        if(!sections)
            return null

        let currentSectionId = null
        let lowestYPosition = null

        sections.forEach(section => {
            let divBounds = section.getBoundingClientRect()
            let distanceFromZero = Math.abs(divBounds.y)

            if (lowestYPosition === null || distanceFromZero < lowestYPosition) {
                lowestYPosition = distanceFromZero
                currentSectionId = section.id
            }
        })

        return currentSectionId
    }

    /**
     * @param {String} categoryId
     * @return {*}
     */
    const getLastVisitedSectionOn = (categoryId) => {
        if(_navigationOptions.lastVisitedSections[categoryId])
            return _navigationOptions.lastVisitedSections[categoryId]

        return _categorySectionMapping[categoryId][0]
    }

    /**
     * @param {String} sectionId
     */
    const registerSectionVisit = (sectionId) => {
        let targetCategoryId = null

        Object.entries(_categorySectionMapping).forEach(([categoryId, sectionArray]) => {
            if (sectionArray.includes(sectionId)) {
                targetCategoryId = categoryId
            }
        })

        _navigationOptions.lastVisitedSections[targetCategoryId] = sectionId
    }

    const _saveState = () => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
            isSidebarExpanded: _navigationOptions.isSidebarExpanded
        }))
    }

    return {
        init,
        isOneAtOnceMode,
        isAllAtOnceMode,
        isSidebarExpanded,
        getActiveSectionId,
        isSectionActive,
        isSectionVisible,
        getActiveCategoryId,
        isCategoryActive,
        getLastVisitedSectionOn,
        registerSectionVisit,
        setSidebarStatus,
        toggleSidebarStatus,
        update
    }
}