import axiosClient from "./axiosClient"

const deliveryApi = {
    getAll() {
        const url = '/deliveries'
        return axiosClient.get(url);
    },
    // get 10 products first
    get(id) {
        const url = `/deliveries/${id}`
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/deliveries`
        return axiosClient.post(url, data);
    },

    update(data, id) {
        const url = `/deliveries/${id}`
        return axiosClient.put(url, data);
    },

    remove(id) {
        const url = `/deliveries/${id}`
        return axiosClient.delete(url);
    },

}

export default deliveryApi;