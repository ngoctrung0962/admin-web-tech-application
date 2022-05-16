import axiosClient from "./axiosClient"

const reviewApi = {
    getAll() {
        const url = '/reviews'
        return axiosClient.get(url);
    },
    // get 10 products first
    get(id) {
        const url = `/reviews/${id}`
        return axiosClient.get(url);
    },
    add(data) {
        const url = `/reviews`
        return axiosClient.post(url, data);
    },

    update(data, id, username) {
        const url = `/reviews/${username}/${id}`
        return axiosClient.put(url, data);
    },

    remove(username, id) {
        const url = `/reviews/${username}/${id}`
        return axiosClient.delete(url);
    },
}

export default reviewApi;