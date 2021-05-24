import {NOTIFICATION_TYPE} from "../_constants";

export const notificationActions = {
    showSuccess,
    showFailure,
    close
}


function showSuccess(message) {
    return {
        type: NOTIFICATION_TYPE.SUCCESS,
        payload: {
            message
        }
    }
}

function showFailure(message) {
    return {
        type: NOTIFICATION_TYPE.FAILURE,
        payload: {
            message
        }
    }
}

function close() {
    return {
        type: NOTIFICATION_TYPE.HIDDEN
    }
}