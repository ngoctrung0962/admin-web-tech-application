import axiosClient from "./axiosClient"

const userApi = {
    getAll() {
        const url = '/users'
        return axiosClient.get(url);
    },
    getUserByUsername(username) {
        const url = `/users/${username}`
        return axiosClient.get(url);
    },
    //create user
    add(data) {
        const url = `/users`
        return axiosClient.post(url, data);
    },
    //delete user
    remove(username) {
        const url = `/users/${username}`
        return axiosClient.delete(url);
    },
    update(username, data) {
        const url = `/users/${username}`
        return axiosClient.put(url, data);
    },
    login(data) {
        const url = `/login`
        return axiosClient.post(url, data)
    },

}

export default userApi;