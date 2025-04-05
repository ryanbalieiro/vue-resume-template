import path from "path"
import fs from "fs"
import {log, LogTypes} from "./_npm-log.js"

const baseDir = process.cwd();

export function openJson(relativePath) {
    const resolvedPath = path.resolve(baseDir, relativePath);
    const fileExists = fs.existsSync(resolvedPath);
    if(!fileExists) {
        log(LogTypes.WARNING, `Couldn't find JSON file with path: ${relativePath}`);
        return null;
    }

    try {
        return JSON.parse(fs.readFileSync(relativePath, 'utf-8'));
    }
    catch (err) {
        log(LogTypes.WARNING, `Couldn't parse JSON file with path: ${relativePath}`);
        return null;
    }
}

export function saveJson(relativePath, content) {
    const resolvedPath = path.resolve(baseDir, relativePath);
    const fileExists = fs.existsSync(resolvedPath);
    if(!fileExists) {
        log(LogTypes.WARNING, `Couldn't find JSON file with path: ${relativePath}`);
        return;
    }

    try {
        fs.writeFileSync(relativePath, JSON.stringify(content, null, 4));
        log(LogTypes.SUCCESS, `Updated JSON file: ${relativePath}`);
    }
    catch (err) {
        log(LogTypes.WARNING, `Couldn't save JSON file with path: ${relativePath}`);
    }
}

export function editJson(relativePath, changes) {
    const jLoaded = openJson(relativePath);
    if(!jLoaded)
        return;

    for(let field in changes)
        jLoaded[field] = changes[field];
    saveJson(relativePath, jLoaded);
}