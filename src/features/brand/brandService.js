import axios from 'axios'
import { base_url } from '../../utils/base_url'
import { config } from '../../utils/axiosConfig'

const brandlist = async()=>{
    const response =await axios.get(`${base_url}brand/getallBrand`)
    return response.data
}


const createBrand = async (brand) =>{
    const response = await axios.post(`${base_url}brand/createBrand`,brand,config)
    return response.data
}

const updateBrand = async (brand) =>{
    const response = await axios.put(`${base_url}brand/updateBrand/${brand?.id}`,{title:brand?.brandData.title},config)
    return response.data
}

const getBrand = async(brandid) =>{
    const response = await axios.get(`${base_url}brand/getBrand/${brandid}`)
    return response.data
}

const deleteBrand = async(brandid)=>{
    const response = await axios.get(`${base_url}brand/deleteBrand/${brandid}`,config)
    return response.data
}

const brandService = {
    brandlist,
    createBrand,
    getBrand,
    updateBrand,
    deleteBrand
}

export default brandService;