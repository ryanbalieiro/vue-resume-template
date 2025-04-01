import Language from "/src/models/Language.js"

export default class Settings {
    /** @constructs */
    constructor(jsonData) {
        this._preloaderEnabled = jsonData['preloaderEnabled']
        this._navToggleEnabled = jsonData['navToggleEnabled']
        this._supportedLanguages = jsonData['supportedLanguages'].map(
            ({ id, name, default: isDefault, flagUrl: flagUrl }) => new Language(id, name, isDefault, flagUrl)
        )
    }

    /** @return {Boolean} */
    get preloaderEnabled() {
        return this._preloaderEnabled
    }

    /** @return {Language[]} */
    get supportedLanguages() {
        return this._supportedLanguages
    }

    /** @return {Boolean} */
    get navToggleEnabled() {
        return this._navToggleEnabled
    }
}