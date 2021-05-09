import {axiosClient} from "../_helpers";

export const productService = {
    // getAll,
    getPaginated,
    addNewProduct,
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
        .get("/products", {
            params: pageable
        })
        .then(res => {
            return res.data;
        });
}

function addNewProduct(newProduct) {
    return axiosClient.post("/products", newProduct);
}