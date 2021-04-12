import axios from "axios";
import { authHeader } from "./auth-header";
import { HTTP_STATUS } from "../_constants";
import { store } from "./store";
import { userActions } from "../_actions";

const axiosClient = axios.create({
    baseURL: "http://localhost:8080/",
    headers: {"Content-Type": "application/json"}
})


axiosClient.interceptors.request.use(config => {
    config.headers = {...config.headers, "Authorization": authHeader().Authorization}
    // config.headers["Authorization"] = authHeader().Authorization;
    return config;
});


axiosClient.interceptors.response.use(
    response => response,
    error => {
        console.log("EJEJEJEJEJ ERROR: ", error.response)
        if (error.response) {
            const { status } = error.response;
            if (status === HTTP_STATUS.UNAUTHORIZED) {
                store.dispatch(userActions.logout())
            }
        }
    }
);

export default axiosClient;