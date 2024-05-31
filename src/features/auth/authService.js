import axios from "axios";
import { base_url } from "../../utils/base_url";

const getTokenfromLocalStorage = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null
const config = {
  headers:{
    Authorization: `Bearer ${getTokenfromLocalStorage?.token}`,
    Accept:"application/json"
  }
}



const login = async (userData) => {
  const response = await axios.post(`${base_url}user/adminlogin`, userData,config);
  return response.data;
};  

const activeStatusService = async(userId)=>{
  const response = await axios.put(`${base_url}user/activeStatus`,userId,config)
  return response.data
}

const makeAdminService = async(userId)=>{
  const response = await axios.put(`${base_url}user/updateuserstaus`,userId,config)
  return response.data
}

const getOrders = async ()=>{
  const response = await axios.get(`${base_url}user/getallorders`,config?config:null)
  return response.data
}



const authService = {
  login,
  getOrders,
  activeStatusService,
  makeAdminService
};

export default authService;
