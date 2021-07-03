import { axiosClient } from "../_helpers";

const ROOT_PATH = "/customerObjects";

export const customerObjectService = {
    deleteCustomerObject,
}

function deleteCustomerObject(id) {
    return axiosClient.post(`${ROOT_PATH}/${id}/delete`);
}
