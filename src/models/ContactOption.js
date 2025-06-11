import Locales from "/src/models/Locales.js"

export default class ContactOption {
    /** @constructs */
    constructor(jsonData) {
        this._id = jsonData["id"]
        this._value = jsonData["value"]
        this._valueShort = jsonData["valueShort"]
        this._faIcon = jsonData["faIcon"]
        this._href = jsonData["href"] || null
        this._locales = new Locales(jsonData["locales"] || {})
    }

    /** @return {String} */
    get id() {
        return this._id
    }

    /**
     * @param {Function} localizationClosure
     * @param {Boolean} shorten
     * @return {String}
     */
    getValue(localizationClosure, shorten) {
        const key = shorten ? "valueShort" : "value"
        const localizedKey = localizationClosure(this._locales, key, true)

        if(localizedKey) return localizedKey
        return this.getStaticValue(shorten)
    }

    /** @return {String} */
    getStaticValue(shorten) {
        return shorten ? this._valueShort : this._value
    }

    /** @return {String} */
    get faIcon() {
        return this._faIcon
    }

    /** @return {String|null} */
    get href() {
        return this._href
    }
}