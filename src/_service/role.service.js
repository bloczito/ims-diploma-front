import { axiosClient } from "../_helpers";

export const roleService = {
    getAll,

}

function getAll() {
    return axiosClient
        .get("/roles/all")
        .then(res => res.data);
}
