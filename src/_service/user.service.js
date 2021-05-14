import { axiosClient } from "../_helpers";

export const userService = {
    login,
    logout,
    getAll,
}


function login(username, password) {
    return axiosClient
        .post("/authenticate", {username, password})
        .then(res => {
                localStorage.setItem("user", JSON.stringify(res.data));
                return res.data;
            }
        );
}

function logout() {
    localStorage.removeItem("user");
}

function getAll() {
    return axiosClient
        .get("/users/all")
        .then(res => res.data)
}
