export default class Locales {
    /** @constructs */
    constructor(localesHash) {
        this._localesHash = localesHash['locales'] || localesHash
    }

    /**
     * @param {String} key
     * @param {Language} [language]
     * @param {Language} [fallbackLanguage]
     */
    getTranslation(key, language, fallbackLanguage) {
        const targetLanguageId = language?.id
        const defaultLanguageId = fallbackLanguage?.id

        const targetLanguageHash = this._localesHash[targetLanguageId]
        const defaultLanguageHash = this._localesHash[defaultLanguageId]

        if(targetLanguageHash && targetLanguageHash[key])
            return this._parse(targetLanguageHash[key])
        if(defaultLanguageHash && defaultLanguageHash[key])
            return this._parse(defaultLanguageHash[key])
        return `locales.${key}`
    }

    /**
     * @param {String} text
     * @return {string|*}
     * @private
     */
    _parse(text) {
        if(!text)
            return `locales.error`

        if(!(typeof text === 'string'))
            return text

        return text.replace(/\*(.*?)\*/g, '<span class="text-primary">$1</span>')
    }
}