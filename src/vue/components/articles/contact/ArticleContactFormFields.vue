<template>
    <div class="contact-form-fields">
        <Alert type="danger"
               v-if="errorMessage"
               class="mb-3"
               :message="errorMessage"/>

        <div class="contact-form-row mt-0 mt-xl-1">
            <!-- Left Column -->
            <div class="contact-form-column contact-form-column-left">
                <!-- Input Groups -->
                <div v-for="(item) in [
                    {id: 'name', faIcon: 'fa-solid fa-signature', type: 'text'},
                    {id: 'email', faIcon: 'fa-solid fa-envelope', type: 'email'},
                    {id: 'subject', faIcon: 'fa-solid fa-pen-to-square', type: 'text'},
                ]" class="form-group input-group" :class="focusId === item.id ? `form-group-focused` : ``">
                    <!-- Icon Attach -->
                    <span class="input-group-text input-group-attach">
                        <i :class="item.faIcon"/>
                    </span>

                    <!-- Input -->
                    <input class="form-control"
                           :id="`form-${item.id}`"
                           :type="item.type"
                           :name="item.id"
                           :placeholder="`${localizeFromStrings(item.id)} *`"
                           @input="_onInputChanged"
                           @focusin="_onFocusIn(item.id)"
                           @focusout="_onFocusOut(item.id)"
                           required/>
                </div>
            </div>

            <!-- Right Column -->
            <div class="contact-form-column contact-form-column-right">
                <!-- Textarea -->
                <div class="form-group form-group-textarea mb-md-0">
                    <textarea class="form-control"
                              id="message"
                              :placeholder="`${localizeFromStrings('message')} *`"
                              maxlength="2048"
                              @input="_onInputChanged"
                              @focusin="_onFocusIn('message')"
                              @focusout="_onFocusOut('message')"
                              required/>
                </div>
            </div>
        </div>

        <!-- Buttons -->
        <div class="btn-submit-wrapper">
            <XLButton :label="localizeFromStrings('send_message')"
                      class="btn-submit"
                      type="submit"
                      icon="fa-solid fa-envelope"/>
        </div>
    </div>
</template>

<script setup>
import Alert from "/src/vue/components/widgets/Alert.vue"
import XLButton from "/src/vue/components/widgets/XLButton.vue"
import {inject, ref} from "vue"

const props = defineProps({
    errorMessage: String,
})

const emit = defineEmits(["input"])

const focusId = ref(null)

/** @type {Function} */
const localizeFromStrings = inject("localizeFromStrings")

const _onFocusIn = (id) => {
    focusId.value = id
}

const _onFocusOut = (id) => {
    focusId.value = null
}

const _onInputChanged = (e) => {
    const target = e.target
    emit("input", target.id.replace("form-" , ""), target.value)
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

$spacing: clamp(5px, 2vw , 15px);
$submit-button-spacing: clamp(5px, 1.5vw , 10px);

/** ----------- LAYOUT ------------- **/
div.contact-form-fields {
    width: 100%;
    display: flex;
    flex-direction: column;
}

div.contact-form-row {
    display: flex;
    margin: $spacing 0;
    @include media-breakpoint-down(xl) {
        flex-direction: column;
    }
}

div.contact-form-column {
    display: flex;
    flex-direction: column;
    width: 100%;

    &-left {
        margin-right: $spacing;
        @include media-breakpoint-down(xl) {
            margin-right: 0;
            margin-bottom: $spacing;
        }
    }
}

div.form-group {
    &:not(:last-child) {
        margin-bottom: $spacing;
    }
}

input {
    height: 65px;
    border-radius: $default-border-radius;
    @include media-breakpoint-down(xl) {height: 60px;}
    @include media-breakpoint-down(lg) {height: 55px;}
    @include media-breakpoint-down(sm) {height: 45px;}
}

div.form-group-textarea {
    height: 100%;
}

textarea {
    height: 100%;
    flex-grow: 1;
    min-height: 200px;
    border-radius: $default-border-radius;
    @include media-breakpoint-down(sm) {
        min-height: 150px;
    }
}

div.btn-submit-wrapper {
    width: 100%;
    text-align: center;
    margin-top: $submit-button-spacing;
}

/** ----------- SIZES ------------- **/
span.input-group-attach {
    min-width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: $default-border-radius;
    @include media-breakpoint-down(sm) {
        min-width: 50px;
        font-size: 0.9rem;
    }
}

input, textarea {
    font-size: 1rem;
    padding: 1rem;
    @include media-breakpoint-down(lg) {
        font-size: 0.9rem;
        padding: 0.9rem;
    }
    @include media-breakpoint-down(sm) {
        font-size: 0.85rem;
        padding: 0.85rem;
    }
}

/** --------------- COLORS --------------- **/
input, textarea {
    background-color: lighten($default-section-background, 3%);
    border-color: $light-3;
    border-width: 2px;
    color: $dark;
    transition: none;

    &:focus {
        background-color: lighten($default-section-background, 4%);
        border-color: $primary;
        color: $dark;
        box-shadow: none;
    }
}

span.input-group-attach {
    transition: 0.1s color ease-out;
    background-color: lighten($light-3, 1%);
    border-color: $light-3;
    color: $light-7;
}

input {
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active{
        -webkit-box-shadow: 0 0 0 0px $light-2 inset !important;
        -webkit-text-fill-color: $dark !important;
        color: $dark!important;
        transition: background-color 5000s ease-in-out 0s;
    }

    &:-webkit-autofill:focus {
        border-color: $primary;
    }
}

div.form-group-focused {
    span.input-group-attach {
        background-color: $primary;
        border-color: $primary;
        color: $light-1;
    }
}

/** ----------- PLACEHOLDERS ------------- **/
$input-placeholder-text-color: $light-4;

::-webkit-input-placeholder {
    --font-size: 1rem;
    @include media-breakpoint-down(lg) {
        --font-size: 0.9rem;
    }

    font-size: var(--font-size);
    color: $input-placeholder-text-color;
}

*:-moz-placeholder {
    /* FF 4-18 */
    color: $input-placeholder-text-color!important;
    opacity: 1;
}
*::-moz-placeholder {
    /* FF 19+ */
    color: $input-placeholder-text-color!important;
    opacity: 1;
}
*:-ms-input-placeholder {
    /* IE 10+ */
    color: $input-placeholder-text-color!important;
}
*::-ms-input-placeholder {
    /* Microsoft Edge */
    color: $input-placeholder-text-color!important;
}
*::placeholder {
    /* modern browser */
    color: $input-placeholder-text-color!important;
}
</style>