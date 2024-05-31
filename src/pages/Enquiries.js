import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { getEnquiryList } from '../features/enquries/EnquriesSlice';

const columns = [
  {
    title: 'SNO',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
  },
  {
    title: 'Comment',
    dataIndex: 'comment',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'CreatedAt',
    dataIndex: 'createdAt',
  },
  {
    title:"Edit Details",
    dataIndex:"edit"
  }
];

const Enquiries = () => {
   
   const dispatch = useDispatch()

   useEffect(()=>{
    dispatch(getEnquiryList())
   },[])

   const enquiryState = useSelector(state=>state.enquiry.Enquries)

   const enquiryList = []

   enquiryState?.forEach((element,i) => {
    enquiryList.push({
      key:i,
      name:element.name,
      email:element.email,
      mobile:element.mobile,
      comment:element.comment,
      status:<>
      <select name="" id="" className='form-control form-select'>
        <option value="">Set Status</option>
      </select>
      </>,
      createdAt:element.createdAt,
      edit: 
        <>
          <AiFillEdit><Link to="/"></Link></AiFillEdit>
          <MdDelete className='ms-3'><Link></Link></MdDelete>
        </>
    })
  });

  return (
    <div>
        <h3>Enquires</h3>
            <div className='mt-4'>
                <div>
                    <Table columns={columns} dataSource={enquiryList} />
                </div>
            </div>
    </div>
  )
}

export default Enquiries