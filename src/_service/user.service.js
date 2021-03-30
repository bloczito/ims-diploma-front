import { authHeader } from "../_helpers";

export const userService = {
    login
}

const URL = "http://localhost:8080"

function login(username, password) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username, password})
    }

    return fetch(`${URL}/authenticate`, requestOptions)
        .then(handleResponse)
        .then(token => {
            localStorage.setItem("token", JSON.stringify(token.jwt));
            return token;
        });


}


function handleResponse(response) {

    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                console.log("NIE DLA PSA");
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error)
        }
        return data;
    });


}