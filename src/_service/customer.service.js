import { axiosClient } from "../_helpers";

export const customerService = {
    getAll,
    getPaginated,
    addNew,
    getById,
    updateCustomer,
    deleteById,
}

const ROOT_PATH = "/customers";

function getAll() {
    return axiosClient
        .get(`${ROOT_PATH}/list`)
}

function getPaginated(page, size) {
    const pageable = {};

    if (page) pageable.page = page;
    if (size) pageable.size = size;

    return axiosClient
        .get(ROOT_PATH, {
            params: pageable
        })
}

function addNew(newCustomer) {
    return axiosClient.post(ROOT_PATH, newCustomer);
}

function getById(id) {
    return axiosClient.get(`${ROOT_PATH}/${id}`);
}

function updateCustomer(customer) {
    return axiosClient.post(`${ROOT_PATH}/${customer.id}`, customer);
}

function deleteById(id) {
    return axiosClient.post(`${ROOT_PATH}/${id}/delete`)
}
