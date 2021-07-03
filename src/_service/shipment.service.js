import { axiosClient } from "../_helpers";

const ROOT_PATH = "/shipments";

export const shipmentService = {
    deleteShipment,
}


function deleteShipment(id) {
    return axiosClient
        .post(`${ROOT_PATH}/${id}/delete`);
}