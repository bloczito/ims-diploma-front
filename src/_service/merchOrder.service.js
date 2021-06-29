import axiosClient from "../_helpers/axios-client";

const ROOT_PATH = "/merchOrders";

export const merchOrderService = {
    deleteMerchOrder,
};


function deleteMerchOrder(id) {
    return axiosClient
        .post(`${ROOT_PATH}/${id}/delete`);
}