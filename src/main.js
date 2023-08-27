/**
 * Created by Ryan Balieiro on 08.23.2023
 * App's entry point
 */
import './scss/style.scss'
import {useData} from "./composables/data.js"
import {useLanguage} from "./composables/language.js"
import {useNavigation} from "./composables/navigation.js"
import {createAppRouter} from "./router/router.js"
import {createApp} from "vue"
import App from './vue/core/App.vue'

const data = useData()

data.fetchEssentials().then(r => {
    const language = useLanguage()
    language.init(data.getSettings()['supportedLanguages'])

    const navigation = useNavigation()
    navigation.init(data.getSections(), data.getCategories())

    const router = createAppRouter()
    createApp(App).use(router).mount('#app')
})