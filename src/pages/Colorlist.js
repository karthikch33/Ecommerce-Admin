import { Table } from 'antd';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getColorList } from '../features/color/colorSlice';
import { AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

const columns = [
  {
    title: 'SNO',
    dataIndex: 'key',
  },
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title:"Edit Details",
    dataIndex:"edit"
  }
];
const Colors = () => {
      const dispatch = useDispatch()
      const colorState = useSelector(state=>state.color.colors)

     
      useEffect(()=>{
        dispatch(getColorList())
      },[])

      const colorlist = [];

      colorState?.forEach((element,i) => {
        colorlist.push({
          key:i,
          title:element.title,
          edit: 
            <>
              <AiFillEdit><Link to="/"></Link></AiFillEdit>
              <MdDelete className='ms-3'><Link></Link></MdDelete>
            </>
        })
      });

  return (
    <div>
        <h3>Colors</h3>
        <div className='mt-4'>
            <div>
            <Table columns={columns} dataSource={colorlist} />
            </div>
        </div>
    </div>
  )
}

export default Colors