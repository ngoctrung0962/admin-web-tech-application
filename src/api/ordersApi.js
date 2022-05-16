import axiosClient from "./axiosClient";
const url = '/orders';

const ordersApi = {
    getAll() {
        return axiosClient.get(url);
    },

    getById(id) {
        return axiosClient.get(`${url}/${id}`);
    },

    add(username, data){
        return axiosClient.post(`${url}/${username}`, data);
    },

    remove(id){
        return axiosClient.delete(`${url}/${id}`);
    },
     
    update(id, username, data){
        return axiosClient.put(`${url}/${username}/${id}`, data)
    }
}

export default ordersApi;