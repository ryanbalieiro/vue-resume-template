import Locales from "/src/models/Locales.js"
import Article from "/src/models/Article.js"

export default class Section {
    /** @constructs */
    constructor(id, isCover, faIcon, jsonPath, type, locales) {
        this._id = id
        this._faIcon = faIcon
        this._jsonPath = jsonPath
        this._category = null
        this._type = type
        this._locales = new Locales(locales)
        this._isCover = isCover
        this._articles = []

        if(!Object.values(Section.Types).find(existingType => existingType === type)) {
            throw new Error(`Section with ID "${id}" has an invalid type "${type}"`)
        }
    }

    /** @enum */
    static get Types() {
        return {
            CENTERED: "centered",
            COLUMN: "column",
            ROW: "row"
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
    get type() {
        return this._type
    }

    /** @return {boolean} */
    get isCentered() {
        return this._type === Section.Types.CENTERED
    }

    /** @return {boolean} */
    get isDefault() {
        return this._type === Section.Types.ROW || this._type === Section.Types.COLUMN
    }

    /** @return {String} */
    get jsonPath() {
        return this._jsonPath
    }

    /** @return {String} */
    get urlHashId() {
        return this.id
    }

    /** @return {string} */
    get htmlId() {
        return 'resume-section-' + this.id
    }

    /** @return {Boolean} */
    get isCover() {
        return this._isCover
    }

    /** @param {Category} category */
    set category(category) {
        this._category = category
    }

    /** @return {Category} */
    get category() {
        return this._category
    }

    /** @param {Array} rawArticles */
    set articles(rawArticles) {
        this._articles = rawArticles.map(rawArticle => {
            return new Article(rawArticle, this)
        })
    }

    /** @return {Array} */
    get articles() {
        return this._articles
    }

    /** @return {Locales} */
    get locales() {
        return this._locales
    }
}