<template>
    <Article class="article-contact-form"
             :model="model">
        <form id="contact-form"
              ref="form"
              @submit="_onFormSubmit">
            <ArticleContactFormFields v-if="shouldDisplayFormFields"
                                      :error-message="errorMessage"
                                      @input="_onInput"/>

            <ArticleContactFormThankYou v-else
                                        :title="localize(model.locales, 'contact_thank_you')"
                                        :description="localize(model.locales, 'contact_thank_you_description')"
                                        :info="localize(model.locales, 'contact_thank_you_reply').replaceAll('{email}', email || '')"
                                        @reset="_onFormReset"/>
        </form>
    </Article>
</template>

<script setup>
import {computed, inject, onMounted, ref} from "vue"
import {useEmails} from "/src/composables/emails.js"
import {useUtils} from "/src/composables/utils.js"
import Article from "/src/vue/components/articles/base/Article.vue"
import ArticleContactFormFields from "/src/vue/components/articles/contact/ArticleContactFormFields.vue"
import ArticleContactFormThankYou from "/src/vue/components/articles/contact/ArticleContactFormThankYou.vue"

const emails = useEmails()
const utils = useUtils()

const props = defineProps({
    /** @type {Article} **/
    model: {
        type: Object,
        required: true
    }
})

/** @type {Function} */
const setSpinnerEnabled = inject("setSpinnerEnabled")

/** @type {Function} */
const localize = inject("localize")

/** @type {Function} */
const localizeFromStrings = inject("localizeFromStrings")

/** @type {Function} */
const scrollToTopOfCurrentSection = inject("scrollToTopOfCurrentSection")

const name = ref("")
const email = ref("")
const subject = ref("")
const message = ref("")
const apiResponse = ref(null)
const validationError = ref(null)

const shouldDisplayFormFields = computed(() => {
    return !apiResponse.value || !apiResponse.value.success
})

const errorMessage = computed(() => {
    if(apiResponse.value && !apiResponse.value.success)
        return localizeFromStrings("error_sending_message")

    if(validationError.value)
        return localizeFromStrings(validationError.value)

    return null
})

onMounted(() => {
    const publicKey = props.model.getSetting("contact_js_public_key")
    const serviceId = props.model.getSetting("contact_js_service_id")
    const templateId = props.model.getSetting("contact_js_template_id")
    emails.init(publicKey, serviceId, templateId)
})

const _onInput = (field, value) => {
    switch (field) {
        case "name": name.value = value; break
        case "email": email.value = value; break
        case "subject": subject.value = value; break
        case "message": message.value = value; break
    }
}

const _onFormSubmit = async (e) => {
    e.preventDefault && e.preventDefault()

    _validate()
    if(validationError.value) {
        scrollToTopOfCurrentSection()
        return
    }

    _submit().then(r => {})
}

const _onFormReset = () => {
    name.value = ""
    email.value = ""
    subject.value = ""
    message.value = ""
    apiResponse.value = null
    validationError.value = null
}

const _validate = () => {
    validationError.value = null
    if(!name.value.length || !email.value.length || !subject.value.length || !message.value.length) {
        validationError.value = "error_fill_all_fields"
    }
    if(!utils.isValidEmail(email.value)) {
        validationError.value = "error_invalid_email"
    }
}

const _submit = async () => {
    setSpinnerEnabled && setSpinnerEnabled(true, localizeFromStrings('sending_message'))

    const success = await emails.sendContact(name.value, email.value, subject.value, message.value)
    apiResponse.value = {success: success}

    scrollToTopOfCurrentSection()
    setSpinnerEnabled && setSpinnerEnabled(false)
}
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

#contact-form {
    display: flex;
    width: 100%;
}
</style>