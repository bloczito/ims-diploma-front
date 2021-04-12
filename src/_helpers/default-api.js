import axiosClient from "./axios-client";

export const defaultApi = {
    defaultGet
}


function defaultGet(url) {
    return axiosClient
        .get(url)
        .then(res => res.data)
}



