export default class Language {
    /** @constructs */
    constructor(id, name, isDefault, flagUrl) {
        this._id = id
        this._name = name
        this._isDefault = isDefault
        this._flagUrl = flagUrl
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
        return this._flagUrl
    }

    /** @return {Boolean} */
    get isDefault() {
        return Boolean(this._isDefault)
    }
}