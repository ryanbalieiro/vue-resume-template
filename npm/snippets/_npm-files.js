/**
 * @author Ryan Balieiro
 * @description Handy utilities to help manage files within your npm scripts.
 */
import {useNpmLogger} from "./_npm-log.js"
import path from "path"
import fs from "fs"

const logger = useNpmLogger()
const baseDir = process.cwd()

export const useNpmFileUtils = () => {
    /**
     * @param {string} folderPath
     */
    const deleteFolder = (folderPath) => {
        const fullPath = path.resolve(baseDir, folderPath)
        if(!fs.existsSync(fullPath)) {
            logger.log(logger.LogTypes.SKIP, `Skipped folder: ${folderPath}`)
            return
        }

        fs.rmSync(fullPath, { recursive: true, force: true })
        logger.log(logger.LogTypes.SUCCESS, `Deleted folder: ${folderPath}`)
    }

    /**
     * @param {string} folderPath
     */
    const emptyFolder = (folderPath) => {
        const fullPath = path.resolve(baseDir, folderPath)
        if(!fs.existsSync(fullPath)) {
            logger.log(logger.LogTypes.SKIP, `Skipped folder: ${folderPath}`)
            return
        }

        const contents = fs.readdirSync(fullPath)
        contents.forEach(item => {
            const itemPath = path.join(fullPath, item)
            fs.rmSync(itemPath, { recursive: true, force: true })
        })
        logger.log(logger.LogTypes.SUCCESS, `Emptied folder: ${folderPath}`)
    }

    return {
        deleteFolder,
        emptyFolder
    }
}