export default class ContactOption {
    /** @constructs */
    constructor(jsonData) {
        this._id = jsonData["id"]
        this._value = jsonData["value"]
        this._valueShort = jsonData["valueShort"]
        this._faIcon = jsonData["faIcon"]
        this._href = jsonData["href"] || null
    }

    /** @return {String} */
    get id() {
        return this._id
    }

    /** @return {String} */
    getValue(shorten) {
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