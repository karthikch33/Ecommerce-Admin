import axios from 'axios'
import {base_url} from "../../utils/base_url"; 
const serverOnOrOff = async()=>{
    console.log(base_url);
    const response = await axios.get(`${base_url}user/serveronoroff`)
    return response.data
}

const serverServices = {
    serverOnOrOff
}

export default serverServices