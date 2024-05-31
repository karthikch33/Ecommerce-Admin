import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/customers/customerSlice';
import { Link, useNavigate } from 'react-router-dom';
import CustomModel from '../components/CustomModel';
import { activeStatus, makeAdmins } from '../features/auth/authSlice';
import { GrStatusCritical } from "react-icons/gr";
import { MdAdminPanelSettings } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { toast } from 'react-toastify';
import { resetState } from '../features/brand/brandSlice';
import { MdDelete } from 'react-icons/md';
import { GrStatusGood } from "react-icons/gr";

const columns = [
  {
    title: 'SNO',
    dataIndex: 'key',
    defaultSortOrder:"ascend",
    sorter:(a,b)=>a.key-b.key
  },
  {
    title: 'FirstName',
    dataIndex: 'firstname',
    defaultSortOrder:"ascend",
    sorter:(a,b)=>a.firstname.length-b.firstname.length
  },
  {
    title: 'LastName',
    dataIndex: 'lastname',
    defaultSortOrder:"ascend",
    sorter:(a,b)=>a.lastname-b.lastname
  },
  {
    title: 'Email',
    dataIndex: 'email',
    defaultSortOrder:"ascend",
    sorter:(a,b)=>a.email-b.email
  },
  {
    title:"Phone",
    dataIndex:'mobile',
    defaultSortOrder:"ascend",
    sorter:(a,b)=>a.mobile-b.mobile
  },
  {
    title:"Role",
    dataIndex:"role",
    defaultSortOrder:"ascend",
    sorter:(a,b)=>a.role-b.role
  },
  {
    title:"Account Status",
    dataIndex:"isBlocked"
  },
  {
    title:"",
    dataIndex:"activestatus"
  }
];

const Customers = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

   const [open, setOpen] = useState(false);
   const [customerId,setCustomerId] = useState("")
   const [customername,setCustomerName] = useState("")
   const [customerrole,setcustomerrole] = useState()


   const showModal = (id,firstname,role) => {
    setOpen(true);
    setcustomerrole(role)
    setCustomerId(id)
    setCustomerName(firstname)
  };

  const hideModal = () => {
    setOpen(false);
  };


    useEffect(()=>{
      dispatch(getUsers())
    },[])

    const activeState = (customerid,title,role)=>{
      if(title !== "No"){
      dispatch(activeStatus(customerid))
      setOpen(false)
      toast.success(`Updated ${title} Status Successfully`)
      setTimeout(()=>{
        navigate('/admin/customers')
        dispatch(resetState())
        dispatch(getUsers())
      },2000)
    }
     else if(title === "No"){
      dispatch(makeAdmins(customerid))
      setOpen(false)
      setTimeout(()=>{
        navigate('/admin/customers')
        dispatch(resetState())
        dispatch(getUsers())
      },2000)
     }
    }
  

    const state = useSelector(state => state.customer.customers);
    const usersdata = [];
    
    state.forEach((customer, i) => {
      usersdata.push({
        key: i,
        firstname: customer.firstname,
        lastname: customer.lastname,
        email: customer.email,
        mobile: customer.mobile,
        isBlocked: customer?.isBlocked ? "Blocked" : "Active",
        activestatus: <>
          <Button onClick={()=>{
              const data = {id:customer?._id,firstname:customer?.firstname}
              showModal(data?.id,data?.firstname,"NO")
          }} className='fs-3 mx-3'>
           { customer?.isBlocked ?<GrStatusCritical  className='' style={{marginTop:"-30px",color:'red'}}/> : <GrStatusGood className='' style={{marginTop:"-30px",color:'red'}}/>}
          </Button>
        </>,
        role: <>
         { customer?.role === 'user' ?  <Button onClick={()=>{
            const data = {id:customer?._id,role:customer?.role}
            showModal(data?.id,"No",data?.role)
        }} className='fs-3 mx-3'><CiUser className='' style={{marginTop:"-30px",color:'red'}}/> </Button>: 'Admin'}
        
      </>,
      });
    });

    
  return (
    <div>
        <h3>Customers</h3>
        <div className='mt-4'>
            <div>
            <Table columns={columns} dataSource={usersdata} />
            </div>
        </div>
        <CustomModel title={ <> Are You Sure To Update { customername !== "No" ? <span style={{ color: "red",display:"inline" }} className=''>"  {customername} "  </span>:"" } Status </>} hideModal={hideModal} open={open} performAction={()=>activeState(customerId,customername,customerrole)}/>
    </div>
  )
}

export default Customers