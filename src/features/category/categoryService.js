import axios from 'axios'
import { base_url } from '../../utils/base_url'
import {config} from '../../utils/axiosConfig'
const categorylist = async()=>{
    const response =await axios.get(`${base_url}category/getallCategory`)
    return response.data
}

const createService = async (category) =>{
    const response = await axios.post(`${base_url}category/createCategory`,category,config)
    return response.data
}

const getCategoryService = async(categoryId) =>{
    const response = await axios.get(`${base_url}category/getCategory/${categoryId}`,config)
    return response.data
}

const updateCategoryService = async(categoryData) =>{
    const response = await axios.put(`${base_url}category/updateCategory/${categoryData?.id}`,{title:categoryData?.Data.title},config)
    return response.data
}

const deleteCategoryService = async(categoryId)=>{
     const response = axios.get(`${base_url}category/deleteCategory/${categoryId}`,config)
     return response.data
}

const categoryService = {
    categorylist,
    createService,
    getCategoryService,
    updateCategoryService,
    deleteCategoryService
}

export default categoryService;