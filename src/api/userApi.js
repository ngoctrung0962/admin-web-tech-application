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
    //update user
    update(data) {
        const url = `/users/${data.username}`
        return axiosClient.put(url, data);
    },
    //delete user
    remove(username) {
        const url = `/users/${username}`
        return axiosClient.delete(url);
    },

}
export default userApi;