import axiosClient from "./axiosClient"

const url = '/categories'

export const getAllCategories = async () =>{
    return await axiosClient.get(url);
}

export const getCategory = (id) => {
    return axiosClient.get(`${url}/${id}`);
}

export const insertCategory = (data) => {
    return axiosClient.post(url, data);
}

export const deleteCategory = (id) => {
    return axiosClient.delete(`${url}/${id}`, id);
}

export const updateCategories = (id, data) => {
    return axiosClient.put(`${url}/${id}`, data)
}

