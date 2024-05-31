import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";



const uploadImg = async(data)=>{
    try {
        const response = await axios.post(`${base_url}upload/`, data, config);
        return response; 
      } catch (error) {
        throw error;
      }
}

const deleteImg = async(data)=>{
    try {
        await axios.delete(`${base_url}upload/deleteimages/${data}`, config);
        return data;
      } catch (error) {
        throw error;
      }
}

const uploadService = {
    uploadImg,
    deleteImg
}

export default uploadService