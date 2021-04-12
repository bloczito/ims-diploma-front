import { axiosClient } from "../_helpers";


export const orderService = {
    getAll,

}

function getAll() {
    return axiosClient
        .get("/orders")
        .then(res => {
            return res.data._embedded.orderDtoes;
        });
}







