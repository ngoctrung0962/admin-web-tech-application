import axiosClient from "./axiosClient"

const homeApi = {
    chartData() {
        const url = '/chartdata'
        return axiosClient.get(url);
    }

}

export default homeApi;