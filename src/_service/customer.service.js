import { axiosClient } from "../_helpers";

export const customerService = {
    getAll,
    getPaginated,
    addNew,
}


function getAll() {
    return axiosClient
        .get("/customers/list")
}

function getPaginated(page, size) {
    const pageable = {};

    if (page) pageable.page = page;
    if (size) pageable.size = size;

    return axiosClient
        .get("/customers", {
            params: pageable
        })
}

function addNew(newCustomer) {
    return axiosClient.post("/customers", newCustomer);
}