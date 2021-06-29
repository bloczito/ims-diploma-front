import { axiosClient } from "../_helpers";

const BASE_PATH = "/products"

export const productService = {
    // getAll,
    getPaginated,
    addNewProduct,
    getByQuery,
    getById,
    deleteProduct,
}

// function getAll() {
//     return axiosClient
//         .get("/products/all")
//         .then(res => {
//             return res.data;
//         });
// }


function getPaginated(page, size) {
    const pageable = {};
    if (page) pageable.page = page;
    if (size) pageable.size = size;

    return axiosClient
        .get(BASE_PATH, {
            params: pageable
        })
}

function addNewProduct(newProduct) {
    return axiosClient
        .post(BASE_PATH, newProduct);
}

function getByQuery(query) {
    return axiosClient
        .get(`${BASE_PATH}/all`, {
            params: {query}
        })
}

function getById(id) {
    return axiosClient
        .get(`${BASE_PATH}/${id}`)
}

function deleteProduct(id) {
    return axiosClient.post(`${BASE_PATH}/${id}/delete`)
}
