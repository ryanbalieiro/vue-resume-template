import Locales from "/src/models/Locales.js"
import ContactOption from "/src/models/ContactOption.js"

export default class Profile {
    /** @constructs */
    constructor(jsonData) {
        this._name = jsonData["name"]
        this._profilePictureUrl = jsonData["profilePictureUrl"]
        this._locales = new Locales(jsonData["locales"])
        this._contactOptions = jsonData["contactOptions"].map(contactOptionData => {
            return new ContactOption(contactOptionData)
        })
    }

    /** @return {String} */
    get name() {
        return this._name
    }

    /** @return {String} */
    get profilePictureUrl() {
        return this._profilePictureUrl
    }

    /** @return {ContactOption[]} */
    get contactOptions() {
        return this._contactOptions
    }

    /** @return {ContactOption} */
    getContactOptionWithId(id) {
        return this.contactOptions.find(contactOption => contactOption.id === id)
    }

    /** @return {Locales} */
    get locales() {
        return this._locales
    }
}