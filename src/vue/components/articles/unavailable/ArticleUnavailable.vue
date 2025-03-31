<template>
    <Article class="article-not-found"
             :model="model">
        <Alert type="danger"
               class="w-100"
               :message="`Invalid component <b>${model.componentName}</b>. Make sure the component exists and is registered in the <i>ARTICLES_MAP</i> inside <b>SectionBody.vue</b>.`"/>

        <div v-if="model.items.length"
             class="article-not-found-viewer">
            <div class="fw-bold text-5 p-0 m-0">Article Items:</div>

            <div v-for="(item) in model.items" class="mt-3 mb-0">
                <p class="fw-bold text-3 mb-1">
                    Item {{item.id}}:
                </p>

                <ul class="text-3">
                    <li v-for="prop in localesProps">
                        <template v-if="localize(item.locales, prop, true)">
                            <span class="text-light-7 fw-bold" v-html="'• ' + prop + ': '"/>
                            <span v-html="_toDisplayFormat(localize(item.locales, prop, true))"/>
                        </template>
                    </li>

                    <li v-for="prop in itemProps">
                        <template v-if="_toDisplayFormat(item[prop])">
                            <span class="text-light-7 fw-bold" v-html="'• ' + prop + ': '"/>
                            <span v-html="_toDisplayFormat(item[prop])"/>
                        </template>
                    </li>
                </ul>
            </div>
        </div>
    </Article>
</template>

<script setup>
import Alert from "/src/vue/components/widgets/Alert.vue"
import Article from "/src/vue/components/articles/base/Article.vue"
import {inject} from "vue"

const props = defineProps({
    /** @type {Article} **/
    model: {
        type: Object,
        required: true
    }
})

/** @type {Function} */
const localize = inject("localize")

const itemProps = ["img", "fallbackFaIcon", "fallbackFaIconColor", "dateStart", "dateEnd", "percentage", "links"]
const localesProps = ["title", "description", "institution", "location", "country", "tags"]

const _toDisplayFormat = (value) => {
    if(!value)
        return null

    if(typeof value === "string")
        return value

    if(Array.isArray(value))
        return value.length

    if(value instanceof Date)
        return value.toDateString()

    return "{Obj}"
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.article-not-found-viewer {
    display: flex;
    flex-direction: column;
    background-color: rgba(black, 0.05);
    border: 1px solid rgba(black, 0.1);
    border-radius: 5px;
    padding: 15px;
    overflow-x: auto;
    width: 100%;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
</style>