import axios from 'axios'
import {config} from '../../utils/axiosConfig'
import { base_url } from '../../utils/base_url'
const blogcategorylist = async()=>{
    const response =await axios.get(`${base_url}blogcategory/getallCategory`)
    return response.data
}

const createBlogCategory = async (bcategory) =>{
    const response = await axios.post(`${base_url}blogcategory/createCategory`,bcategory,config)
    return response.data
}

const getBlogCategory = async (bcategoryId)=>{
    const response = await axios.get(`${base_url}blogcategory/getCategory/${bcategoryId}`,config)
    return response.data
}

const updateBlogCategoryService = async (updatedData)=>{
    const response = await axios.put(`${base_url}blogcategory/updateCategory/${updatedData?.id}`,{title:updatedData?.BlogCategoryData?.title},config)
    return response.data
}

const deleteBlogCategoryService = async(deleteId)=>{
    const response = await axios.get(`${base_url}blogcategory/deleteCategory/${deleteId}`,config)
    return response.data
}

const blogcategoryService = {
    blogcategorylist,
    createBlogCategory,
    getBlogCategory,
    updateBlogCategoryService,
    deleteBlogCategoryService
}

export default blogcategoryService;