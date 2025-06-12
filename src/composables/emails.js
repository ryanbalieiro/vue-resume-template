/**
 * Created by Ryan Balieiro on 03.29.2025
 * API integration with EmailJS for sending e-mails.
 */
import emailjs from "@emailjs/browser"
import {useUtils} from "/src/composables/utils.js"

const _params = {
    publicKey: null,
    serviceId: null,
    templateId: null
}

const utils = useUtils()

export const useEmails = () => {
    /**
     * @constructs
     * @param {String} publicKey
     * @param {String} serviceId
     * @param {String} templateId
     */
    const init = (publicKey, serviceId, templateId) => {
        _params.publicKey = publicKey
        _params.serviceId = serviceId
        _params.templateId = templateId
        
        if(!publicKey || !serviceId || !templateId)
            throw new Error("Error initializing emails.js! Make sure you informed all parameters correctly.")
        
        emailjs.init(_params.publicKey)
    }

    /**
     * @param {String} fromName
     * @param {String} fromEmail
     * @param {String} customSubject
     * @param {String} message
     * @return {Promise<boolean>}
     */
    const sendContact = async (fromName, fromEmail, customSubject, message) => {
        if(!_params.serviceId || !_params.templateId)
            throw new Error("EmailJS hasn't been initialized!")
        
        const requestParams = {
            name: fromName,
            from_name: fromName,
            email: fromEmail,
            from_email: fromEmail,
            custom_subject: customSubject,
            custom_source: utils.getAbsoluteLocation(),
            custom_source_name: "Vue Resume",
            message: message
        }

        try {
            const response = await emailjs.send(
                _params.serviceId,
                _params.templateId,
                requestParams
            )
            return true
        } catch (error) {
            return false
        }
    }

    return {
        init,
        sendContact
    }
}