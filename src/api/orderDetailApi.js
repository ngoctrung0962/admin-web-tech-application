import axiosClient from "./axiosClient";
const url = '/order-details';

const orderDetailApi = {
    getAllByUsername(username) {
        return axiosClient.get(`${url}/username/${username}`);
    },

    getById(id) {
        return axiosClient.get(`${url}/${id}`);
    },

    add(username, data){
        return axiosClient.post(`${url}/${username}`, data);
    },

    remove(orderId, productId){
        return axiosClient.delete(`${url}/${orderId}/${productId}`);
    },
     
    update(username, id, productId, data){
        return axiosClient.put(`${url}/${username}/${id}/${productId}`, data);
    }
}

export default orderDetailApi;