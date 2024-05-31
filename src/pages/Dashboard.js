import React from 'react'
import {BsArrowDownRight} from 'react-icons/bs'
// import { Column } from '@ant-design/plots';
import { Table } from 'antd';
const Dashboard = () => {
  const data = [
    {
      type: 'Jan',
      sales: 38,
    },
    {
      type: 'Feb',
      sales: 52,
    },
    {
      type: 'Mar',
      sales: 61,
    },
    {
      type: 'Apr',
      sales: 145,
    },
    {
      type: 'May',
      sales: 48,
    },
    {
      type: 'June',
      sales: 38,
    },
    {
      type: 'July',
      sales: 38,
    },
    {
      type: 'Aug',
      sales: 38,
    },
    {
      type: 'Sep',
      sales: 38,
    },
    {
      type: 'Oct',
      sales: 38,
    },
    {
      type: 'Nov',
      sales: 38,
    },
    {
      type: 'Dec',
      sales: 38,
    },
  ];
  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    color: ({ type }) => {
     return "#8443f5";
    },
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Month',
      },
      sales: {
        alias: 'Income',
      },
    },
  };
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
      title: 'Status',
      dataIndex: 'status',
    },
  ];
  const data1 = [];
  for (let i = 0; i < 46; i++) {
    data1.push({
      key: i,
      name: `Edward King ${i}`,
      product: 32,
      status: `London, Park Lane no. ${i}`,

    });
  }
  return (
    <>
    <h3 className='mb-4'>DashBoard</h3>
    <div className='d-flex justify-content-between align-items-center'>
      <div className='d-flex flex-column flex-grow-1 me-3 bg-white roudend-3 p-3'>
          <div className='d-flex justify-content-between'>
            <p>Total</p>
           <h4>&#8377; 10000</h4>
          </div> 
          <div className='d-flex mt-3 justify-content-between'>
            <h6 className='red'> <BsArrowDownRight className='me-2'/>39%</h6>
            <p>Compared To July 2023</p>
          </div>
      </div>
      <div className='d-flex flex-column flex-grow-1 me-3 bg-white roudend-3 p-3'>
          <div className='d-flex justify-content-between'>
            <p>Total</p>
           <h4>&#8377; 10000</h4>
          </div> 
          <div className='d-flex mt-3 justify-content-between'>
            <h6 className='red'> <BsArrowDownRight className='me-2'/>39%</h6>
            <p>Compared To July 2023</p>
          </div>
      </div>
      <div className='d-flex flex-column flex-grow-1 bg-white roudend-3 p-3'>
          <div className='d-flex justify-content-between'>
            <p>Total</p>
           <h4>&#8377; 10000</h4>
          </div> 
          <div className='d-flex mt-3 justify-content-between'>
            <h6 className='red'> <BsArrowDownRight className='me-2'/>39%</h6>
            <p>Compared To July 2023</p>
          </div>
      </div>
    </div>
    <div className='mt-4'>
        <h3 className='mb-4'>Income Statics</h3>
        <div>
        {/* <Column {...config} /> */}
        </div>
    </div>
    <div className='mt-4'>
      <h3 className='mb-4'>Recent Orders</h3>
      <div>
      <Table columns={columns} dataSource={data1} />
      </div>
    </div>
    </>
  )
}

export default Dashboard