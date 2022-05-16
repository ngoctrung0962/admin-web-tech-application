import axiosClient from "./axiosClient"

const homeApi = {
    chartData() {
        const url = '/chartdata'
        return axiosClient.get(url);
    },
    topProduct(){
        const url = '/topproduct'
        return axiosClient.get(url);
    },
    topCustomer(){
        const url = '/topcustomer'
        return axiosClient.get(url);
    },
    totalLaptop(){
        const url = '/totallaptop'
        return axiosClient.get(url);
    },
    totalMobile(){
        const url = '/totalmobile'
        return axiosClient.get(url);
    },
    totalAll(){
        const url = '/totalall'
        return axiosClient.get(url);
    }


}

export default homeApi;