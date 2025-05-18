/**
 * @author Ryan Balieiro
 * @description Use this script to wipe all existing resume data and start fresh with a blank resume.
 *
 * @usage
 * npm run resume:clear
 */
import {useNpmLogger} from "./snippets/_npm-log.js"
import {useNpmFileUtils} from "./snippets/_npm-files.js"
import {useNpmJsonUtils} from "./snippets/_npm-json.js"

const logger = useNpmLogger()
const fileUtils = useNpmFileUtils()
const jsonUtils = useNpmJsonUtils()

const foldersToDelete = [
    'public/images/pictures',
    'public/images/places',
    'public/images/portfolio'
]

const foldersToEmpty = [
    'public/data/sections'
]

foldersToDelete.forEach(fileUtils.deleteFolder)
foldersToEmpty.forEach(fileUtils.emptyFolder)

const jSettingsPath = "public/data/settings.json"
const jSettings = jsonUtils.open(jSettingsPath)
jSettings.supportedLanguages = [jSettings.supportedLanguages[0]]
jsonUtils.save(jSettingsPath, jSettings)

const jStringsPath = "public/data/strings.json"
const jStrings = jsonUtils.open(jStringsPath)
delete jStrings.locales["es"]
delete jStrings.locales["fr"]
delete jStrings.locales["zh"]
jsonUtils.save(jStringsPath, jStrings)

const jSectionsPath = "public/data/sections.json"
jsonUtils.update(jSectionsPath, {
    sections: []
})

const jCategoriesPath = "public/data/categories.json"
jsonUtils.update(jCategoriesPath, {
    categories: []
})

const jProfilePath = "public/data/profile.json"
jsonUtils.update(jProfilePath, {
    name: "John Doe",
    profilePictureUrl: "",
    locales: {
        en: {
            name: "John Doe",
            credits: "Designed by <strong><a href='https://github.com/ryanbalieiro'>Ryan Balieiro</a></strong>",
            role: "Role"
        }
    },
    contactOptions: []
})

logger.log(logger.LogTypes.SUCCESS_FINISHED, "Successfully cleared resume data!")
