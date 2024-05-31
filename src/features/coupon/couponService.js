import axios from 'axios'
import { base_url } from '../../utils/base_url'
import {config} from '../../utils/axiosConfig'

const couponlist = async()=>{
    const response =await axios.get(`${base_url}coupon/allcoupons`,config)
    return response.data
}

const createCoupon = async (coupon) =>{
    const response = await axios.post(`${base_url}coupon/createcoupon`,coupon,config)
    return response.data
}

const getCoupon = async(couponId)=>{
    const response = await axios.get(`${base_url}coupon/getcoupon/${couponId}`,config)
    return response.data
}

const updateCouponService = async(updatedCouponData)=>{
    const response = await axios.put(`${base_url}coupon/updatecoupon/${updatedCouponData?.id}`,{ 
        name:updatedCouponData?.updatedData.name,
        expiry:updatedCouponData?.updatedData.expiry,
        discount:updatedCouponData?.updatedData.discount
    },config)
    return response.data
}

const deleteCouponService = async(couponId)=>{
    const response =await axios.delete(`${base_url}coupon/deletecoupon/${couponId}`,config)
    return response.data
}

const couponService = {
    couponlist,
    createCoupon,
    getCoupon,
    updateCouponService,
    deleteCouponService
}

export default couponService;