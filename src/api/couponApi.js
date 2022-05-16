import axiosClient from "./axiosClient"

const couponApi = {
    getAll() {
        const url = '/coupons'
        return axiosClient.get(url);
    },
    getCouponByCode(code) {
        const url = `/coupons/${code}`
        return axiosClient.get(url);
    },
    //create coupon
    add(data) {
        const url = `/coupons`
        return axiosClient.post(url, data);
    },
    //delete coupon
    remove(code) {
        const url = `/coupons/${code}`
        return axiosClient.delete(url);
    },
    update(code, data) {
        const url = `/coupons/${code}`
        return axiosClient.put(url, data);
    },
}

export default couponApi;