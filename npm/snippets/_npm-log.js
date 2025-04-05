export const LogTypes = {
    DEFAULT: "log_type_default",
    WARNING: "log_type_warning",
    SKIP: "log_type_skip",
    SUCCESS: "log_type_success",
    SUCCESS_FINISHED: "log_type_success_finished",
}

const LOG_TYPES_MAPPING = {
    [LogTypes.DEFAULT]: {
        emoji: "⬛"
    },

    [LogTypes.WARNING]: {
        emoji: "⚠️"
    },

    [LogTypes.SKIP]: {
        emoji: "⏭️"
    },

    [LogTypes.SUCCESS]: {
        emoji: "✅ "
    },

    [LogTypes.SUCCESS_FINISHED]: {
        emoji: "🎉"
    },
}

export function log(type, message) {
    const logTypeData = LOG_TYPES_MAPPING[type] || LOG_TYPES_MAPPING[LogTypes.DEFAULT]
    console.log(`${logTypeData.emoji} · ${message}`)
}