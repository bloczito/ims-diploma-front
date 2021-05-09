import { axiosClient } from "../_helpers";


export const orderService = {
    getAll,
    getPaginated,
    addNewOrder,
}

function getAll() {
    return axiosClient
        .get("/orders")
        .then(res => {
            return res.data;
        });
}

function getPaginated(page, size) {
    const pageable = {};
    if (page) pageable.page = page;
    if (size) pageable.size = size;

    return axiosClient
        .get("/orders", {
            params: pageable
        })
        .then(res => {
            return res.data;
        });

}

function addNewOrder(newOrder) {
    return axiosClient.post("/orders", newOrder)
}







