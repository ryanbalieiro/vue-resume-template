<template>
    <div class="project-modal-content">
        <!-- Title -->
        <h1 class="mb-2 fw-bold"
            v-html="localize(item.locales, 'title')"/>

        <!-- Tags -->
        <div v-if="parsedTags && parsedTags.length"
             class="tags-wrapper text-3 mt-2 mt-lg-3">
            <span class="d-none d-lg-inline">
                <i class="fa-solid fa-tag opacity-75"/>
                {{localizeFromStrings("tags")}}:
            </span>

            <Tags class="mt-1 mt-lg-0" :tags="parsedTags"/>
        </div>

        <!-- Blocks -->
        <template v-for="block in blocks">
            <div v-if="block.visibility" class="project-modal-content-block">
                <h5 :class="block.titleClass">
                    <i :class="`${block.titleFaIcon}`"/>
                    <span v-html="block.title"/>
                </h5>

                <p class="text-3 mb-0" v-html="block.description"/>

                <SocialLinks v-if="block.links"
                             :items="block.links"
                             class="social-links"
                             size="2"
                             variant="dark"/>
            </div>
        </template>
    </div>
</template>

<script setup>
import {computed, inject} from "vue"
import Tags from "/src/vue/components/widgets/Tags.vue"
import SocialLinks from "/src/vue/components/widgets/SocialLinks.vue"

const props = defineProps({
    /** @type {ArticleItem} **/
    item: {
        type: Object,
        required: false
    },
})

/** @type {Function} */
const localize = inject("localize")

/** @type {Function} */
const localizeFromStrings = inject("localizeFromStrings")

const parsedTags = computed(() => {
    const tags = localize(props.item.locales, "tags")
    if(Array.isArray(tags))
        return tags
    return []
})

const blocks = computed(() => {
    const description = localize(props.item.locales, "description")
    const links = props.item.links

    return [
        {
            visibility: description,
            titleClass: "d-none d-lg-inline-block",
            title: localizeFromStrings("about"),
            titleFaIcon: "fa-solid fa-file",
            description: description,
            links: null
        },

        {
            visibility: links?.length,
            titleClass: "",
            title: localizeFromStrings("where_to_find"),
            titleFaIcon: "fa-solid fa-globe",
            description: localizeFromStrings("where_to_find_description")
                .replace("{project}", `<b>${localize(props.item.locales, "title")}</b>`),
            links: links.map((link) => {return {
                href: link.href,
                faIcon: link.faIcon,
                id: link.stringKey
            }})
        }
    ]
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

div.project-modal-content {
    width: 100%;
    @include media-breakpoint-down($navigation-sidebar-breakpoint) {
        text-align: center;
    }
}

div.tags-wrapper {
    display: flex;

    span {
        display: flex;
        align-items: center;
        justify-content: center;

        white-space: nowrap;
        margin-right: 10px;
        margin-bottom: 3px;

        i {
            margin-right: 4px;
        }
    }

    @include media-breakpoint-down($navigation-sidebar-breakpoint) {
        flex-direction: column;
        span {
            margin-bottom: 8px;
        }
    }
}

div.project-modal-content-block {
    margin-top: 30px;

    h5 {
        font-weight: bold;
    }

    i {
        min-width: 25px;
        margin-right: 5px;
        text-align: center;
        @include media-breakpoint-down(md) {
            min-width: 0;
        }
    }

    div.social-links {
        margin-top: 12px;
    }

    @include media-breakpoint-down($navigation-sidebar-breakpoint) {
        margin-top: 25px;
    }
}
</style>