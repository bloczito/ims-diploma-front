import { axiosClient } from "../_helpers";

export const customerService = {
    getAll,
    getPaginated,
    addNew,
}


function getAll() {
    return axiosClient
        .get("/customers/list")
        .then(res => res.data);
}

function getPaginated(page, size) {
    const pageable = {};

    if (page) pageable.page = page;
    if (size) pageable.size = size;

    return axiosClient
        .get("/customers", {
            params: pageable
        })
        .then(res => {
            return res.data;
        });
}

function addNew(newCustomer) {
    return axiosClient.post("/customers", newCustomer);
}