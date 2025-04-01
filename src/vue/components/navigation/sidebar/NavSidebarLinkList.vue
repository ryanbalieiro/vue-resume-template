<template>
    <div class="nav-sidebar-links-wrapper" :class="{
        'nav-sidebar-links-wrapper-shrink': shrink,
        'nav-sidebar-links-wrapper-no-transitions': disableTransitions
    }">
        <ul class="nav-sidebar-links">
            <li v-for="section in props.sections"
                class="nav-sidebar-link-li-container"
                :class="{
                    'nav-sidebar-link-li-container-selected': section.id === currentSection?.id
                }">
                <button class="nav-sidebar-link"
                        :class="utils.isTouchDevice() ? `nav-sidebar-link-no-hover` : ``"
                        @click="(e) => _onLinkClicked(section, e)">
                    <i :class="section.faIcon"/>
                    <span v-html="localize(section.locales, 'nav_label')"/>
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import {inject, ref, watch} from "vue"
import {useScheduler} from "/src/composables/scheduler.js"
import {useUtils} from "/src/composables/utils.js"

const scheduler = useScheduler()
const utils = useUtils()

/** @type {Function} */
const localize = inject("localize")

const props = defineProps({
    /** @type {Section[]} **/
    sections: {
        type: Object,
        required: true
    },
    /** @type {Section} **/
    currentSection: {
        type: Object
    },
    shrink: Boolean
})

const emit = defineEmits(['linkClicked'])

const disableTransitions = ref(false)

watch(() => props.shrink, () => {
    disableTransitions.value = true

    scheduler.clearAllWithTag('nav-sidebar-link-list')
    scheduler.schedule(() => {
        disableTransitions.value = false
    }, 100, 'nav-sidebar-link-list')
})

const _onLinkClicked = (section, e) => {
    emit('linkClicked', section)
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

div.nav-sidebar-links-wrapper {
    width: 100%;
    overflow-y: auto;
    display: flex;
    justify-content: center;
    min-height: 40vh;
    @media (max-height: 600px) {
        min-height: 0;
    }
}

ul.nav-sidebar-links {
    display: flex;
    flex-direction: column;
    justify-content: center;

    list-style: none;
    padding: 0;
    margin: 0;
    @media (max-height: 600px) {
        justify-content: start;
    }
}

li.nav-sidebar-link-li-container {
    width: 100%;

    font-size: 1rem;
    @media (max-height: 800px) {font-size: 0.95rem;}
    @media (max-height: 650px) {font-size: 0.925rem;}
    @media (max-height: 600px) {font-size: 0.9rem;}

    &:not(:last-child) {
        margin-bottom: 10px;
        @media (max-height: 800px) {margin-bottom: 8px;}
        @media (max-height: 650px) {margin-bottom: 7px;}
        @media (max-height: 600px) {margin-bottom: 4px;}
    }
}

::-webkit-scrollbar {max-width: 8px; max-height: 4px}
::-webkit-scrollbar-track {-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5)}
::-webkit-scrollbar-thumb {background: lighten($nav-background, 20%);-webkit-box-shadow: rgba(155,155,155)}
::-webkit-scrollbar-thumb:window-inactive {background: lighten($nav-background, 10%);}

button.nav-sidebar-link {
    background: transparent;
    outline: none;
    border: 0;

    text-transform: uppercase;
    width: 250px;
    text-align: left;

    i {
        color: $nav-contrast-10;
        min-width: 45px;
        text-align: center;
        transition: 0.2s color ease-in;
    }

    span {
        color: $nav-contrast-70;
        transition: 0.2s color ease-in;
    }
}

/** Hover Status **/
button.nav-sidebar-link:hover {
    i, span {
        color: $nav-hover!important;
    }
}

button.nav-sidebar-link-no-hover:hover {
    i {
        color: $nav-contrast-10!important;
    }

    span {
        color: $nav-contrast-70!important;
    }
}

/** Selected Status **/
li.nav-sidebar-link-li-container-selected {
    //pointer-events: none;
    button.nav-sidebar-link {
        i {
            color: $nav-highlight!important;
        }

        span {
            color: $nav-selected!important;
        }
    }
}

div.nav-sidebar-links-wrapper-no-transitions {
    button.nav-sidebar-link {
        i, span {
            transition: none;
        }
    }
}

div.nav-sidebar-links-wrapper-shrink {
    li.nav-sidebar-link-li-container {
        width: 100%;
        &:not(:last-child) {
            margin-bottom: 25px;
            @media (max-height: 740px) {
                margin-bottom: 20px;
            }

            @media (max-height: 560px) {
                margin-bottom: 15px;
            }
        }
    }

    button.nav-sidebar-link {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;


        i {
            font-size: 1.2rem;
            color: $nav-contrast-20;
            @media (max-height: 560px) {
                font-size: 1.1rem;
            }
        }

        span {
            position: absolute;
            background-color: $nav-highlight;
            color: $black!important;
            border-radius: $default-border-radius;
            border: 2px solid darken($nav-highlight, 2%);

            font-size: 0.9rem;
            text-transform: none;

            user-select: none;
            pointer-events: none;

            padding: 3px 12px;
            margin-top: -2px;
            left: calc($nav-sidebar-width-shrink - 20px);
            opacity: 0;
            transition: 0.1s left ease-out;
            white-space: nowrap;

            @media (max-height: 480px) {
                display: none;
            }

            &::before {
                content: '';
                position: absolute;
                top: 9px;
                left: -5px;
                margin-left: -6px;
                border-width: 5px;
                border-style: solid;
                border-color: transparent darken($nav-highlight, 2%) transparent transparent;
            }
        }
    }

    button.nav-sidebar-link:hover {
        span {
            opacity: 1;
            left: calc($nav-sidebar-width-shrink - 30px);
        }
    }
}
</style>