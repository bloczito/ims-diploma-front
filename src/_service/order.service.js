import { axiosClient } from "../_helpers";

const rootPath = "/orders";

export const orderService = {
    getAll,
    getPaginated,
    addNewOrder,
    getById,
    updateOrder
}

function getAll() {
    return axiosClient
        .get(`${rootPath}/all`)
}

function getPaginated(page, size) {
    const pageable = {};
    if (page) pageable.page = page;
    if (size) pageable.size = size;

    return axiosClient
        .get(rootPath, {
            params: pageable
        })

}

function addNewOrder(newOrder) {
    return axiosClient.post(rootPath, newOrder)
}

function getById(id) {
    return axiosClient
        .get(`${rootPath}/${id}`)
}

function updateOrder(order) {
    return axiosClient
        .post(`${rootPath}/${order.id}`, order)
}







