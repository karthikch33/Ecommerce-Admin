import axios from 'axios'
import { base_url } from '../../utils/base_url'
import {config} from '../../utils/axiosConfig'


const bloglist = async()=>{
    const response =await axios.get(`${base_url}blog/getallblogs`)
    return response.data
}

const createBlog = async (blog) =>{
    const response = await axios.post(`${base_url}blog/`,blog,config)
    return response.data
}

const getBlogService = async (blogId)=>{
    const response = await axios.get(`${base_url}blog/getblog/${blogId}`,config)
    return response.data
}

const updateBlogService = async(blogData)=>{
    console.log(blogData);
    const response = await axios.put(`${base_url}blog/updateblog/${blogData?.id}`,{
        title:blogData?.BlogData.title,
        description:blogData?.BlogData.description,
        category:blogData?.BlogData.category
    },config)
    return response.data
}

const deleteBlogService = async(blogId)=>{
    const response = axios.delete(`${base_url}blog/deleteblog/${blogId}`,config)
    return response.data
}


const blogService = {
    bloglist,
    createBlog,
    updateBlogService,
    getBlogService,
    deleteBlogService
}

export default blogService;