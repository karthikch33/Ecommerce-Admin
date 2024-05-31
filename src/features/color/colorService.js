import axios from 'axios'
import { base_url } from '../../utils/base_url'
import {config} from '../../utils/axiosConfig'

const colorlist = async()=>{
    const response =await axios.get(`${base_url}color/getallcolor`)
    return response.data
}

const createColor = async (color) =>{
    const response = await axios.post(`${base_url}color/createcolor`,color,config)
    return response.data
}

const getColor = async (colorId)=>{
    const response = await axios.get(`${base_url}color/getcolor/${colorId}`,config)
    return response.data
}

const updateColor = async(colorData)=>{
    const response = await axios.get(`${base_url}color/updatecolor/${colorData?.id}`,config)
    return response.data
}


const deleteColor = async(colorId)=>{
    const response = await axios.delete(`${base_url}color/deletecolor/${colorId}`,config)
    return response.data
}

const colorService = {
    colorlist,
    createColor,
    getColor,
    updateColor,
    deleteColor
}

export default colorService;