import {NOTIFICATION_TYPE} from "../_constants";

const initialState = {
    isNotificationOpen: false,
    notificationType: null,
    notificationMsg: null,
}

export function notification (state = initialState, action) {

    switch (action.type) {
        case NOTIFICATION_TYPE.SUCCESS:
            return {
                isNotificationOpen: true,
                notificationType: NOTIFICATION_TYPE.SUCCESS,
                notificationMsg: action.payload.message
            };
        case NOTIFICATION_TYPE.FAILURE:
            return {
                isNotificationOpen: true,
                notificationType: NOTIFICATION_TYPE.FAILURE,
                notificationMsg: action.payload.message
            };
        case NOTIFICATION_TYPE.HIDDEN:
            return {
                ...state,
                isNotificationOpen: false,
            }
        default:
            return state;
    }

}