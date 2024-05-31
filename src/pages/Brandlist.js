import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteBrand, getBrandList, resetState } from '../features/brand/brandSlice';
import { AiFillEdit } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import CustomModel from '../components/CustomModel';

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
    title:'Edit Details',
    dataIndex:"edit"
  }
];

const BrandList = () => {
  const dispatch = useDispatch()
  const brandState = useSelector(state=>state.brand.brands)
  const navigate = useNavigate()

   const [open, setOpen] = useState(false);
   const [brandId,setBrandId] = useState(false)
   const [title,setTitle] = useState("")

   const showModal = (e) => {
     setOpen(true);
     setBrandId(e?.id)
     setTitle(e?.title)
   };
   const hideModal = () => {
     setOpen(false);
   };

  useEffect(()=>{
    resetState()
    dispatch(getBrandList())
  },[])

  // const {deletedBrand} = useSelector(state=>state.brand)

  const deletebrand = (e,title)=>{
    dispatch(deleteBrand(e))
    setOpen(false)
    toast.success(`Deleted ${title} Brand Successfully`)
    setTimeout(()=>{
      navigate('/admin/brand-list')
      dispatch(resetState())
      dispatch(getBrandList())
    },2000)
  }

  const brandsdata = [];

  brandState?.forEach((element,i) => {
    brandsdata.push({
      key:i,
      title:element.title,
      edit: 
            <>
              <Link to={`/admin/brand/${element?._id}`} className='fs-4' ><AiFillEdit style={{marginTop:"-30px"}}/></Link>
              <Button onClick={()=>{
                const data = {id:element?._id,title:element?.title}
                showModal(data)
              }} className='fs-3 mx-3'><MdDelete className='' style={{marginTop:"-30px",color:'red'}}/></Button>
            </>
    })
  });

  return (
    <div>
        <h3>Brands</h3>
        <div className='mt-4'>
            <div>
            <Table columns={columns} dataSource={brandsdata} />
            </div>
        </div>
        <CustomModel title={ <> Are You Sure To Delete <span style={{ color: "red",display:"inline" }} className=''>"  {title} " </span>Blog  </>} hideModal={hideModal} open={open} performAction={()=>deletebrand(brandId,title)}/>
    </div>
  )
}

export default BrandList