<template>
    <button v-if="canShrink" class="nav-toggle-button" @click="_onToggleButton()">
        <i :class="navigation.isSidebarExpanded() ? 'fa-solid fa-caret-left' : 'fa-solid fa-caret-right'"/>
    </button>
</template>

<script setup>
import {computed} from "vue"
import {useData} from "/src/composables/data.js"
import {useNavigation} from "/src/composables/navigation.js"

const data = useData()
const navigation = useNavigation()

const canShrink = computed(() => {
    return data.getSettings()['sidebarShrinkingEnabled']
})

/**
 * @private
 */
const _onToggleButton = () => {
    navigation.toggleSidebarStatus()
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

.nav-toggle-button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 24px;
    height: 24px;
    font-size: 0.8em;
    border-radius: 100%;
    border:none;

    position: fixed;
    top: 8px;
    left: 8px;
    z-index: 99;

    background-color: rgba(white, 0.02);
    color: $light-3;
    opacity: 0.5;

    &:hover {
        background-color: rgba(black, 0.1);
        color: $light-1;
        opacity: 1;
    }
}
</style>