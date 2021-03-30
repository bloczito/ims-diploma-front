import {userConstants} from "../_constants";
import {userService} from "../_service";
import {history} from "../_helpers/history";

export const userActions = {
    login
}

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push("/")
                },
                error => {
                    dispatch(failure(error));
                    console.log("Error: ", error);
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}