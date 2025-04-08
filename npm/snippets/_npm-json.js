/**
 * @author Ryan Balieiro
 * @description Handy utilities to help manage JSON files within your npm scripts.
 */
import {useNpmLogger} from "./_npm-log.js"
import path from "path"
import fs from "fs"

const logger = useNpmLogger()
const baseDir = process.cwd()

export const useNpmJsonUtils = () => {
    /**
     * @param {String} jsonPath
     * @return {*}
     */
    const open = (jsonPath) => {
        let jsonData = {}
        const evaluation = evaluatePath(jsonPath)

        if(!evaluation.fileExists) {
            logger.log(logger.LogTypes.WARNING, `Couldn't find JSON file: ${jsonPath}. Returning empty object instead.`)
            return jsonData
        }

        try {
            jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))
        } catch (e) {
            logger.log(logger.LogTypes.WARNING, `Couldn't parse JSON data: ${jsonPath}.`)
        }

        return jsonData
    }

    /**
     * @param {String} jsonPath
     * @param {Object} jsonData
     */
    const save = (jsonPath, jsonData) => {
        const evaluation = evaluatePath(jsonPath)
        if(!evaluation.fileExists) {
            logger.log(logger.LogTypes.WARNING, `Couldn't find JSON file: ${jsonPath}.`)
            return
        }

        try {
            fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 4))
            logger.log(logger.LogTypes.SUCCESS, `Updated JSON file: ${jsonPath}`)
        }
        catch (err) {
            logger.log(logger.LogTypes.WARNING, `Error saving JSON: ${jsonPath}`)
        }
    }

    /**
     * @param {String} jsonPath
     * @param {Object} newValues
     */
    const update = (jsonPath, newValues) => {
        const jLoaded = open(jsonPath)
        if(!jLoaded)
            return

        for(let field in newValues)
            jLoaded[field] = newValues[field]
        save(jsonPath, jLoaded)
    }

    /**
     * @param {String} jsonPath
     * @return {{resolvedPath: String, jsonPath: String, fileExists: Boolean}}
     */
    const evaluatePath = (jsonPath) => {
        const resolvedPath = path.resolve(baseDir, jsonPath)
        const fileExists = fs.existsSync(resolvedPath)
        return {jsonPath, resolvedPath, fileExists}
    }

    return {
        open,
        save,
        update,
        evaluatePath,
    }
}