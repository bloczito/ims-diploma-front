import { axiosClient } from "../_helpers";

export const customerService = {
    getAll,

}


function getAll() {
    return axiosClient
        .get("/customers/list")
        .then(res => res.data);
}