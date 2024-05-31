import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AiFillEdit } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { deleteCoupon, getCouponList, resetState } from '../features/coupon/couponSlice';
import CustomModel from '../components/CustomModel';
import { toast } from 'react-toastify';

const columns = [
  {
    title: 'SNO',
    dataIndex: 'key',
  },
  {
    title: 'Coupon',
    dataIndex: 'coupon',
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
  },
  {
    title: 'Expiry',
    dataIndex: 'expiry',
  },
  {
    title:'Edit Details',
    dataIndex:"edit"
  }
];

const CouponList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open,setOpen] = useState()
  const [couponId,setCouponId] = useState()
  const [couponTitle,setCouponTitle] = useState()
  
  useEffect(()=>{
      dispatch(getCouponList())
    },[])

    const hideModal = ()=>{
      setOpen(false)
    }

    const deleteCouponUnique = (data)=>{
      setOpen(true)
      setCouponId(data?.id)
      setCouponTitle(data?.title)
    }

    const deleteCouponNow = ()=>{
      dispatch(deleteCoupon(couponId))
      setOpen(false)
      toast.success(`Deleted ${couponTitle} from Database Successfully`)
      setTimeout(()=>{
        dispatch(resetState())
        dispatch(getCouponList())
        navigate("/admin/coupon-list")
      },2000)
    }
    
    const couponState = useSelector(state=>state.coupon.coupons)
  const couponsdata = [];

  couponState?.forEach((element,i) => {
    couponsdata.push({
      key:i,
      coupon:element.name,
      discount:element.discount,
      expiry:new Date(element.expiry).toLocaleString(),
      edit: 
            <>
              <Link to={`/admin/coupon/${element?._id}`}className='fs-4'><AiFillEdit/></Link>
              <Button className='ms-2' onClick={
                ()=>{
                  const data = {id:element._id,title:element.name}
                  deleteCouponUnique(data)
                }
              }><MdDelete className='fs-4' style={{color:"red"}}/></Button>
            </>
    })
  });

  return (
    <div>
        <h3>Coupons</h3>
        <div className='mt-4'>
            <div>
            <Table columns={columns} dataSource={couponsdata} />
            </div>
        </div>
        <CustomModel hideModal={hideModal} open={open} performAction={deleteCouponNow} title={<>Are You Sure To Delete <p style={{color:"red",display:"inline"}}>" {couponTitle} "</p> Category</>}/>
    </div>
  )
}

export default CouponList