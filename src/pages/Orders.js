import { Table } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../features/auth/authSlice';
import { Link } from 'react-router-dom';
import {AiFillEdit} from 'react-icons/ai'
import {MdDelete} from 'react-icons/md'

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
    title: 'Product',
    dataIndex: 'product',
  },
  {
    title: 'OrderStatus',
    dataIndex: 'orderstatus',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
  {
    title:"Date",
    dataIndex:"createdAt"
  }
];
const Orders = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getOrders())
  },[])
  const OrdersState = useSelector(state=>state.auth.orders)  
  const ordersdata = [];

  OrdersState?.forEach((element,i) => {
    ordersdata.push({
      key:i,
      title:element?.title,
      name:element?.orderby.firstname,
      product:element?.products.map((j)=>{
        return <p key={i++}>{j?.product?.title}</p>
      }),
      orderstatus:element?.orderStatus,
      amount:element?.paymentIntent.amount,
      createdAt:new Date(element?.createdAt).toLocaleString()
    })
  });
  return (
    <div>
        <h3>Orders</h3>
        <div className='mt-4'>
            <div>
            <Table columns={columns} dataSource={ordersdata} />
            </div>
        </div>
    </div>
  )
}

export default Orders