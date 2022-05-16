import axiosClient from "./axiosClient";
const url = '/categories';

const categoryApi = {
    getAll() {
        const url = '/categories'
        return axiosClient.get(url);
    },

    get(id) {
        return axiosClient.get(`${url}/${id}`);
    },

    add(data){
        return axiosClient.post(url, data);
    },

    remove(id){
        return axiosClient.delete(`${url}/${id}`, id);
    },
     
    update(id, data){
        return axiosClient.put(`${url}/${id}`, data)
    }
}

export default categoryApi;