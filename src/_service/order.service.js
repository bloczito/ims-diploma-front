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
        .then(res => {
            return res.data;
        });
}

function getPaginated(page, size) {
    const pageable = {};
    if (page) pageable.page = page;
    if (size) pageable.size = size;

    return axiosClient
        .get(rootPath, {
            params: pageable
        })
        .then(res => {
            return res.data;
        });

}

function addNewOrder(newOrder) {
    return axiosClient.post(rootPath, newOrder)
}

function getById(id) {
    return axiosClient
        .get(`${rootPath}/${id}`)
        .then(res => res.data);
}

function updateOrder(order) {
    return axiosClient
        .post(`${rootPath}/${order.id}`, order)
        .then(res => res.data);
}







