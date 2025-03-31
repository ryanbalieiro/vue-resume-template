import Locales from "/src/models/Locales"

export default class ArticleItem {
    /** @constructs */
    constructor(data) {
        this._id = data.id
        this._img = data.img
        this._fallbackFaIcon = data['fallbackFaIcon']
        this._fallbackFaIconColor = data['fallbackFaIconColor']
        this._dateStart = data['dateStart']
        this._dateEnd = data['dateEnd']
        this._percentage = data['percentage']
        this._locales = new Locales(data.locales || {})
        this._links = data.links || []
        this._category = data['category']
    }

    /** @return {String} */
    get id() {
        return this._id
    }

    /** @return {String} */
    get img() {
        return this._img
    }

    /** @return {String} */
    get fallbackFaIcon() {
        return this._fallbackFaIcon
    }

    /** @return {String} */
    get fallbackFaIconColor() {
        return this._fallbackFaIconColor
    }

    /** @return {Date|String} */
    get dateStart() {
        return this._parseDate(this._dateStart)
    }

    /** @return {Date|String} */
    get dateEnd() {
        return this._parseDate(this._dateEnd)
    }

    /**
     * @param {{year: Number, month: Number, day: Number, string: String}} [datePreset = null]
     * @return {null|Date|*}
     * @private
     */
    _parseDate(datePreset) {
        if(!datePreset) return null
        if(datePreset.string) return datePreset.string

        return new Date(
            datePreset.year,
            datePreset.month,
            datePreset.day || 1
        )
    }

    /** @return {Locales} */
    get locales() {
        return this._locales
    }

    /** @return {Number} */
    get percentage() {
        return this._percentage
    }

    /** @return {boolean} */
    get hasPercentage() {
        return this._percentage !== null && this._percentage !== undefined
    }

    /** @return {Array} */
    get links() {
        return this._links
    }

    /** @return {String} */
    get categoryId() {
        return this._category
    }
}