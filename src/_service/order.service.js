import { axiosClient } from "../_helpers";

const ROOT_PATH = "/orders";

export const orderService = {
    getAll,
    getPaginated,
    addNewOrder,
    getById,
    updateOrder,
    deleteOrder,
}

function getAll() {
    return axiosClient
        .get(`${ROOT_PATH}/all`);
}

function getPaginated(page, size) {
    const pageable = {};
    if (page) pageable.page = page;
    if (size) pageable.size = size;

    return axiosClient
        .get(ROOT_PATH, {
            params: pageable
        });

}

function addNewOrder(newOrder) {
    return axiosClient.post(ROOT_PATH, newOrder);
}

function getById(id) {
    return axiosClient
        .get(`${ROOT_PATH}/${id}`);
}

function updateOrder(order) {
    return axiosClient
        .post(`${ROOT_PATH}/${order.id}`, order);
}

function deleteOrder(id) {
    return axiosClient
        .post(`${ROOT_PATH}/${id}/delete`);
}







