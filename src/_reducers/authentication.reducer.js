import { userConstants } from "../_constants";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? {
    loggedIn: true,
    token: user.token,
    username: user.username,
    roles: user.roles,
    wrongData: false
} : {
    roles: []
};


export function authentication(state = initialState, action) {

    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return action.user ? {
                loggedIn: true,
                token: action.user.token,
                username: action.user.username,
                roles: action.user.roles,
            } : state;
        case userConstants.LOGIN_FAILURE:
            return {
                ...state,
                wrongData: true,
            };
        case userConstants.LOGOUT:
            return {};
        default:
            return state;
    }
}

