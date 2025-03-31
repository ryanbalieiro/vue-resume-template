<template>
    <div class="contact-form-thank-you">
        <IconView fa-icon="fa-solid fa-envelope-circle-check"
                  class="icon-view"/>

        <h3 class="fw-bold text-uppercase m-0 mt-3 mt-lg-4"
            v-html="title"/>

        <p class="text-4 m-0 mt-3"
           v-html="description"/>

        <SolidDivider class="mt-3"/>

        <p class="text-4 m-0 mt-3 text-light-6"
           v-html="info"/>

        <button class="btn btn-primary btn-submit mt-3 mt-sm-4 text-4"
                @click="_onAnotherMessageButton">
            <i class="fa-solid fa-pen-to-square me-2"/>
            <span v-html="localizeFromStrings('send_another_message')"/>
        </button>
    </div>
</template>

<script setup>
import IconView from "/src/vue/components/widgets/IconView.vue"
import SolidDivider from "/src/vue/components/widgets/SolidDivider.vue"
import {inject} from "vue"

const props = defineProps({
    title: String,
    description: String,
    info: String,
})

const emit = defineEmits(["reset"])

/** @type {Function} */
const localizeFromStrings = inject("localizeFromStrings")

const _onAnotherMessageButton = () => {
    emit("reset")
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

div.contact-form-thank-you {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 1px dashed rgba(black, 0.1);
    width: 100%;
    padding: 40px 30px;
    border-radius: $default-border-radius;
    text-align: center;
}

div.icon-view {
    border-radius: 100%;
    @include generate-dynamic-styles-with-multipliers((
        width: 120px,
        height: 120px,
        font-size: 60px
    ), $headings-breakpoint-multipliers);
    overflow: hidden;
}
</style>