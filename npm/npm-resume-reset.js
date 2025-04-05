import {deleteFolder, emptyFolder} from "./snippets/_npm-files.js"
import {editJson, openJson, saveJson} from "./snippets/_npm-json.js"
import {LogTypes, log} from "./snippets/_npm-log.js"

const foldersToDelete = [
    'public/images/pictures',
    'public/images/places',
    'public/images/portfolio'
];

const foldersToEmpty = [
    'public/data/sections'
];

foldersToDelete.forEach(deleteFolder);
foldersToEmpty.forEach(emptyFolder);

editJson("public/data/categories.json", {
    categories: []
});

editJson("public/data/sections.json", {
    sections: []
});

editJson("public/data/profile.json", {
    name: "John Doe",
    profilePictureUrl: "",
    locales: {
        en: {
            credits: "Designed by <strong><a href='https://github.com/ryanbalieiro'>Ryan Balieiro</a></strong>",
            role: "Role"
        }
    },
    contactOptions: []
});

const jSettings = openJson("public/data/settings.json");
jSettings.supportedLanguages = [jSettings.supportedLanguages[0]];
saveJson("public/data/settings.json", jSettings);

const jStrings = openJson("public/data/strings.json");
delete jStrings.locales["es"];
delete jStrings.locales["fr"];
delete jStrings.locales["zh"];
saveJson("public/data/strings.json", jStrings);

log(LogTypes.SUCCESS_FINISHED, "Successfully reset the resume!")