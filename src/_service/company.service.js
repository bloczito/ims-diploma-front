import { axiosClient } from "../_helpers";

export const companyService = {
    getAll,

}


function getAll() {
    return axiosClient
        .get("/companies/list")
        .then(res => res.data);
}