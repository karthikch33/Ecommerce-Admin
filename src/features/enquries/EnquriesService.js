import axios from 'axios'
import { base_url } from '../../utils/base_url'
const enquriylist = async()=>{
    const response =await axios.get(`${base_url}enquiry/getallEnquiry`)
    return response.data
}

const EnquiryService = {
    enquriylist
}

export default EnquiryService;