<template>
    <nav class="nav-sidebar" :class="navigation.isSidebarExpanded() ? '' : 'nav-sidebar-shrink'">
        <!-- Main Content -->
        <div class="nav-sidebar-content" v-if="profileData">
            <!-- Profile Card -->
            <NavProfileCard :profile-data="profileData"
                            :shrink="!navigation.isSidebarExpanded()"/>

            <!-- Nav Link List -->
            <ul class="nav-links">
                <!-- Nav Link -->
                <li v-for="section in data.getSections()" :class="_getNavItemClassList(section)">
                    <button class="nav-link" @click="_onLinkClicked(section)">
                        <i :class="section['faIcon']"/>
                        <span>{{ data.getString(section['id']) }}</span>
                    </button>
                </li>
            </ul>
        </div>

        <!-- Footer -->
        <div class="nav-sidebar-footer" v-if="profileData">
            <!-- Language Picker -->
            <LanguagePicker :display-language-label="navigation.isSidebarExpanded()"
                            class="language-picker"
                            :class="navigation.isSidebarExpanded() ? '' : 'mb-3'"/>

            <!-- Credits -->
            <div class="nav-sidebar-footer-credits text-2 mt-2 pt-1 mb-2 mb-xxl-3">
                <span v-html="profileData['locales']['credits']"/>
            </div>
        </div>
    </nav>
</template>

<script setup>
import LanguagePicker from "../../widgets/LanguagePicker.vue"
import NavProfileCard from "../partials/NavProfileCard.vue"
import {computed, onMounted} from "vue"
import {useData} from "/src/composables/data.js"
import {useNavigation} from "/src/composables/navigation.js"

const emit = defineEmits(['linkClicked'])
const data = useData()
const navigation = useNavigation()

onMounted(() => {
    const canShrink = data.getSettings()['sidebarShrinkingEnabled']
    if(!canShrink) {
        navigation.setSidebarStatus(true)
    }
})

/**
 * @type {ComputedRef<Object>}
 */
const profileData = computed(() => {
    return data.getProfile()
})

/**
 * @param {Object} section
 * @private
 */
const _getNavItemClassList = (section) => {
    let classList = 'nav-item'
    if(navigation.isSectionActive(section['id'])) {
        classList += ' nav-item-selected'
    }

    return classList
}

/**
 * @param {Object} section
 * @private
 */
const _onLinkClicked = (section) => {
    emit('linkClicked', section['id'])
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.nav-sidebar {
    position: fixed;
    display: flex;
    flex-direction: column;

    height: 100vh;
    height: 100svh;
    width: $nav-sidebar-column-size;
    overflow: auto;
    z-index: 99;

    background-color: $nav-background-color;
}

.nav-sidebar-content {
    width: 100%;
    margin: auto 0;
}

ul.nav-links {
    position: relative;
    padding: 0;
    list-style: none;

    @media screen and (min-height: 780px) {
        padding-top:1rem;
    }
}

li.nav-item {
    display: inline-flex;
    justify-content: left;
    align-items: center;

    padding: 0 2.7rem 0 2.7rem;
    width: 100%;
    min-height: clamp(2rem, calc(100vh/41)*2, 2.7rem);

    .nav-link {
        cursor: pointer;
        font-size: clamp(0.9rem, calc(100vh/50), 1rem);

        font-family: $headings-font-family;
        text-transform: uppercase;
        text-align: center;

        color: $light-1;

        i {
            min-width: 35px;
            color: $nav-item-grayed-out-color;
            transition: color 0.2s;
        }

        &:hover {
            color: $nav-item-lighten-color;
            i {
                color: $nav-item-lighten-strong-color;
            }
        }
    }

    &.nav-item-selected {
        .nav-link {
            color: $nav-item-lighten-color;
            i {
                color: $nav-item-lighten-strong-color;
            }
        }
    }
}

.nav-sidebar-footer {
    text-align: center;
    padding: 0.5rem 1rem 1rem 1rem;
    color:$white;

    .nav-sidebar-footer-credits {
        font-family: $custom-subheadings-font-family;
        color: $light-4;

        display: block;
        @media screen and (max-height: 100px) {
            display: none;
        }
    }
}

.nav-sidebar-shrink {
    width: $nav-sidebar-column-size-shrink;
    overflow: visible;
    transition: $nav-sidebar-transition;

    li.nav-item {
        border-radius: 7px;
        margin-left: 0.5rem;
        padding: 0;
        width: calc($nav-sidebar-column-size-shrink - 1rem);
        min-height: 2.7rem;

        display: flex;
        align-items: center;
        justify-content: center;
        span {
            display: none;
        }

        &.nav-item-selected {
            background-color: rgba(black, 0.25);
        }
    }

    .nav-sidebar-footer-credits {
        display: none;
    }

    @media screen and (max-height: 620px) {
        ul.nav-links {
            margin-bottom: 0.5rem!important;
        }

        .language-picker {
            display: none;
        }

        .nav-sidebar-footer {
            padding: 0;
        }
    }

    @media screen and (max-height: 550px) {
        overflow-y: auto;
    }
}
</style>