import axiosClient from "./axiosClient"

const brandApi = {
    getAll() {
        const url = '/brands'
        return axiosClient.get(url);
    },
    // get 10 products first
    get(id) {
        const url = `/brands/${id}`
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/brands`
        return axiosClient.post(url, data);
    },

    update(data, id) {
        const url = `/brands/${id}`
        return axiosClient.put(url, data);
    },

    remove(id) {
        const url = `/brands/${id}`
        return axiosClient.delete(url);
    },
    getproductbybrandId(brandId) {
        const url = `/products/brand/${brandId}`
        return axiosClient.get(url);
    }

}

export default brandApi;