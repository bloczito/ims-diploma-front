import { userConstants } from "../_constants";
import { userService } from "../_service";
import { history } from "../_helpers/history";

export const userActions = {
    login,
    logout
}

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    if (user) {
                        console.log("HAHAHAHAHHA", user)
                        dispatch(success(user));
                        // history.push("/orders")
                    } else {
                        dispatch(failure())
                    }
                },
                error => {
                    console.log("EQEQEQEQEQEQE")
                    dispatch(failure(error));
                    console.log("Error: ", error);
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT }
}
