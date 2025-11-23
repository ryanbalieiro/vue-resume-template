<template>
    <div class="copy-button-wrapper">
        <button class="copy-button text-4"
                :class="infoBadgeVisible ? 'copy-button-disabled' : ''"
                :disabled="infoBadgeVisible"
                @click="_onClick">
            <i :class="icon"/>
        </button>

        <InfoBadge  class="info-badge"
                    :class="!infoBadgeVisible ? 'info-badge-hidden' : ''"
                    variant="nav"
                    fa-icon="fa-solid fa-copy"
                    :value="localizeFromStrings('copied')"/>
    </div>
</template>

<script setup>
import {computed, inject, ref, watch} from "vue"
import InfoBadge from "/src/vue/components/widgets/InfoBadge.vue"

const props = defineProps({
    text: String,
})

const infoBadgeVisible = ref(false)
const infoBadgeTimeout = ref(null)

/** @type {Object} */
const clipboardText = inject("clipboardText")

/** @type {Function} */
const copyToClipboard = inject("copyToClipboard")

/** @type {Function} */
const localizeFromStrings = inject("localizeFromStrings")

const isCopied = computed(() =>
    !props.text || clipboardText?.value === props.text
)

const icon = computed(() => {
    if(infoBadgeVisible.value) return "fa-solid fa-check"
    return "fa-solid fa-copy"
})

watch(() => isCopied.value, value => {
    if(!isCopied.value) {
        infoBadgeVisible.value = false
        clearTimeout(infoBadgeTimeout.value)
    }
})

const _onClick = () => {
    copyToClipboard(props.text)
    infoBadgeVisible.value = true
    clearTimeout(infoBadgeTimeout.value)
    infoBadgeTimeout.value = setTimeout(() => infoBadgeVisible.value = false, 1000)
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

div.copy-button-wrapper {
    display: inline-block;
    position: relative;
}

button.copy-button {
    background-color: transparent;
    border: none;
    outline: none;
    color: $light-6;

    &:hover {
        color: $primary;
    }
}

button.copy-button-disabled {
    opacity: 0.8;
    color: $light-6!important;
    user-select: none!important;
    pointer-events: none!important;
}

div.info-badge {
    position: absolute;
    transition: opacity 0.2s ease-in-out;
    width: 110px;
    left: -40px;
    top: -32px;

    @include media-breakpoint-down(xl) {
        width: 90px;
        top: -25px;
        left: -35px;
    }
}

div.info-badge-hidden {
    opacity: 0;
}
</style>