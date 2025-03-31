import ArticleItem from "/src/models/ArticleItem.js"
import Locales from "/src/models/Locales.js"

export default class Article {
    /** @constructs */
    constructor(data, section) {
        this._id = data.id
        this._component = data.component
        this._settings = data.settings || {}
        this._locales = new Locales(data.locales || {})
        this._faIcon = data.faIcon

        this._items = data.items?.map(rawItem => new ArticleItem(rawItem)) || []
        this._section = section
    }

    /**
     * @enum
     * @constructor
     */
    static get ItemSortingTypes() {
        return {
            ASCENDING: "asc",
            DESCENDING: "desc"
        }
    }

    /** @return {String} */
    get id() {
        return this._id
    }

    /** @return {String} */
    get faIcon() {
        return this._faIcon
    }

    /** @return {String} */
    get componentName() {
        return this._component
    }

    /** @return {ArticleItem[]}*/
    get items() {
        let itemsCopy = [...this._items]
        const sortingKey = this.getSetting("order_items_by", "id")
        const sortingType = this.getSetting("order_items_sort", Article.ItemSortingTypes.ASCENDING)

        itemsCopy.sort((a, b) => (a[sortingKey] > b[sortingKey] ? 1 : -1))
        if (sortingType === Article.ItemSortingTypes.DESCENDING)
            itemsCopy.reverse()

        return itemsCopy
    }

    /** @return {Section} */
    get section() {
        return this._section
    }

    /** @return {Locales} */
    get locales() {
        return this._locales
    }

    /**
     * @param {String} key
     * @param {*} [fallback]
     * @return {*}
     */
    getSetting(key, fallback) {
        return this._settings[key] || fallback
    }
}