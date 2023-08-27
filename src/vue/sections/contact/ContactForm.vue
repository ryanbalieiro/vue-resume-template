<template>
    <form id="contact-form">
        <div class="row contact-form-row align-items-stretch">
            <!-- Feedback Alert -->
            <div class="col-12 mb-1" v-if="alertStatus">
                <Alert :type="alertStatus.type" :message="alertStatus.message"/>
            </div>

            <!-- Left Column -->
            <div class="col-xl-6">
                <!-- Name Input -->
                <div class="form-group input-group">
                    <span class="input-group-text input-group-attach"><i class="fa fa-signature"/></span>
                    <input class="form-control" id="form-name" type="text" :placeholder="data.getString('name') + ' *'" required/>
                </div>

                <!-- E-mail Address Input -->
                <div class="form-group input-group">
                    <span class="input-group-text input-group-attach"><i class="fa fa-envelope"/></span>
                    <input class="form-control" id="form-email" type="email" :placeholder="data.getString('email') + ' *'" required/>
                </div>

                <!-- Subject Input -->
                <div class="form-group input-group">
                    <span class="input-group-text input-group-attach"><i class="fa fa-pen-to-square"/></span>
                    <input class="form-control" id="form-subject" type="text" :placeholder="data.getString('subject') + ' *'" required/>
                </div>
            </div>

            <!-- Right Column -->
            <div class="col-xl-6">
                <!-- Message TextArea -->
                <div class="form-group form-group-textarea mb-md-0">
                    <textarea class="form-control" id="form-message" :placeholder="data.getString('message')" required/>
                </div>
            </div>

            <!-- Bottom Column -->
            <div class="col-12 text-center mt-3 mt-lg-4">
                <button class="btn btn-primary btn-xl" type="submit" id="btn-submit-message" :class="{disabled: submitStatus === SubmitStatus.SENDING}">
                    <i class="fa fa-envelope me-1"/> {{ data.getString('sendMessage') }}
                </button>
            </div>
        </div>
    </form>
</template>

<script setup>
import {useData} from "../../../composables/data.js"
import {useLayout} from "../../../composables/layout.js"
import {computed, onMounted, ref} from "vue"
import {useNavigation} from "../../../composables/navigation.js"
import Alert from "../../widgets/Alert.vue"

const data = useData()
const layout = useLayout()
const navigation = useNavigation()

/**
 * @enum
 */
const SubmitStatus = {
    ENABLED: "enabled",
    SENDING: "sending",
    SENT: "sent",
    ERROR: "error"
}

/**
 * @const
 * @type {string[]}
 */
const FORM_FIELDS = ['name', 'email', 'subject', 'message']

/**
 * @type {ref.<SubmitStatus>}
 */
const submitStatus = ref(null)

/**
 * @type {number}
 */
let submitAttempts = 0

/**
 * @private
 */
onMounted(() => {
    const form = document.getElementById('contact-form')
    if (form.attachEvent) {
        form.attachEvent("submit", _onSubmit)
    } else {
        form.addEventListener("submit", _onSubmit)
    }

    submitStatus.value = SubmitStatus.ENABLED
})

/**
 * @private
 */
const _clearAllFields = () => {
    FORM_FIELDS.forEach(field => {
        const elField = document.getElementById(`form-${field}`)
        elField.value = ''
    })
}

/**
 * @param e
 * @return {boolean}
 * @private
 */
const _onSubmit = (e) => {
    if (e.preventDefault) {
        e.preventDefault()
    }

    const values = {}

    FORM_FIELDS.forEach(field => {
        const elField = document.getElementById(`form-${field}`)
        values[field] = elField.value
    })

    submitStatus.value = SubmitStatus.SENDING

    _sendMessage()
    return false
}

/**
 * @private
 */
const _sendMessage = () => {
    const feedbackView = layout.getFeedbackView()
    feedbackView.showActivitySpinner(data.getString("sendingMessage") + "...")
    submitAttempts++

    /** The message sending logic goes here... **/
    setTimeout(() => {
        if(submitAttempts % 2 !== 0) {
            _onMessageSent()
        }
        else {
            _onMessageError()
        }
    }, 1000)
    /** ************************************** **/
}

/**
 * @private
 */
const _onMessageSent = () => {
    const feedbackView = layout.getFeedbackView()
    feedbackView.hideActivitySpinner()

    _clearAllFields()
    submitStatus.value = SubmitStatus.SENT
    if(navigation.isOneAtOnceMode()) {
        layout.instantScrollTo(0, false)
    }
}

/**
 * @private
 */
const _onMessageError = () => {
    const feedbackView = layout.getFeedbackView()
    feedbackView.hideActivitySpinner()
    submitStatus.value = SubmitStatus.ERROR
}

/**
 * @return {{type: string, message: String}|null}
 * @private
 */
const alertStatus = computed(() => {
    switch (submitStatus.value) {
        case SubmitStatus.SENT:
            return {type: 'success', message: data.getString('messageSent')}
        case SubmitStatus.ERROR:
            return {type: 'danger', message: data.getString('messageError')}
        default:
            return null
    }
})
</script>

<style lang="scss" scoped>
@import "/src/scss/_theming.scss";

$form-input-background-color: lighten($light-3, 20%);
$form-input-placeholder-color:$light-5;

$form-input-border-color: $light-2;
$form-input-border-color-focus: lighten($primary, 5%);

$form-input-group-background-color: $light-1;
$form-input-group-font-color: $headings-color;

input,
textarea {
    padding: 1rem;
    font-family: $headings-font-family;

    background-color: $form-input-background-color;
    color: $dark;
    border: 2px solid $form-input-background-color;
    border-radius: 0;

    &:focus {
        border: 2px solid $form-input-border-color-focus;
    }
}

.input-group {
    @include generate-dynamic-styles-with-hash((
        xxxl: (margin-bottom: 0.8rem),
        sm:   (margin-bottom: 0.4rem)
    ));

    border: 2px solid $form-input-border-color;
}

.input-group-text {
    border: none;
    border-right: 2px solid $form-input-border-color;
    min-width: 60px;
    background-color: $form-input-group-background-color;

    border-radius: 0;
    text-align: center;

    i {
        color: $form-input-group-font-color;
        margin: 0 auto;
    }
}

input {
    @include generate-dynamic-styles-with-hash((
        xxxl: (height: auto),
        xl:   (height: max(50px, 6.5vh)),
        lg:   (height: max(40px, 4.5vh)),
        sm:   (height: 40px, font-size: 0.8rem),
    ))
}

textarea {
    @include generate-dynamic-styles-with-hash((
        xxxl: (height: 218px),
        lg:   (height: 200px),
        sm:   (height: 150px, font-size: 0.8rem)
    ));

    border: 2px solid $form-input-border-color;
}

::-webkit-input-placeholder {
    @include generate-dynamic-styles-with-hash((
        xxxl: (font-size: 1.1rem),
        lg:   (font-size: 0.9rem)
    ));

    font-family: $headings-font-family;
    color: $light-5;
}
</style>