import axios from "axios"
import { base_url } from "../../utils/base_url"
import { config } from "../../utils/axiosConfig";

const productlists = async ()=>{
    const response = await axios.get(`${base_url}product/getallproducts`);
    return response;
}

const createProduct = async(data)=>{
    const response = await axios.post(`${base_url}product/`,data,config)
    return response.data
}

const getProductService = async(productId)=>{
    const response = await axios.get(`${base_url}product/getproduct/${productId}`,config)
    return response.data
}

const updateProductService = async(updatedProductData)=>{
    const response = await axios.put(`${base_url}product/updateproduct/${updatedProductData?.id}`,{
            title: updatedProductData?.updatedData.title,
            description: updatedProductData?.updatedData.description,
            price: updatedProductData?.updatedData.price,
            tags:updatedProductData?.updatedData.tags,
            quantity:updatedProductData?.updatedData.quantity,
            brand:updatedProductData?.updatedData.brand,
            category:updatedProductData?.updatedData.category
    },config)
    return response.data
}

const deleteProductService = async(productId)=>{
    const response = axios.delete(`${base_url}product/deleteaproduct/${productId}`,config)
    return response.data
}

const productService = {
    productlists,
    createProduct,
    getProductService,
    updateProductService,
    deleteProductService
}

export default productService
