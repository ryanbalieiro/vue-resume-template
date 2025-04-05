import {log, LogTypes} from "./_npm-log.js"
import path from "path"
import fs from "fs"

const baseDir = process.cwd();

export function deleteFolder(relativePath) {
    const fullPath = path.resolve(baseDir, relativePath);
    if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, { recursive: true, force: true });
        log(LogTypes.SUCCESS, `Deleted folder: ${relativePath}`);
    } else {
        log(LogTypes.SKIP, `Skipped folder: ${relativePath}`);
    }
}

export function emptyFolder(relativePath) {
    const fullPath = path.resolve(baseDir, relativePath);
    if (fs.existsSync(fullPath)) {
        const contents = fs.readdirSync(fullPath);
        contents.forEach(item => {
            const itemPath = path.join(fullPath, item);
            fs.rmSync(itemPath, { recursive: true, force: true });
        });
        log(LogTypes.SUCCESS, `Emptied folder: ${relativePath}`);
    } else {
        log(LogTypes.SKIP, `Skipped folder: ${relativePath}`);
    }
}