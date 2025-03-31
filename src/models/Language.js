export default class Language {
    /** @constructs */
    constructor(id, name, isDefault) {
        this._id = id
        this._name = name
        this._isDefault = isDefault
    }

    /** @return {String} */
    get id() {
        return this._id
    }

    /** @return {String} */
    get name() {
        return this._name
    }

    /** @return {String} */
    get flagUrl() {
        return `images/flags/${this.id}.png`
    }

    /** @return {Boolean} */
    get isDefault() {
        return Boolean(this._isDefault)
    }
}