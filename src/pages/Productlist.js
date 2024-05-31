import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { deleteProduct, getProducts, resetState } from '../features/product/productSlice';
import { Link, useNavigate } from 'react-router-dom';
import {AiFillEdit} from 'react-icons/ai'
import {MdDelete} from 'react-icons/md'
import { toast } from 'react-toastify';
import CustomModel from '../components/CustomModel';

const columns = [
  {
    title: 'SNO',
    dataIndex: 'key',
    sorter:(a,b)=>a.length-b.length
  },
  {
    title: 'Title',
    dataIndex: 'title',
    sorter:(a,b)=>a.title.length-b.title.length
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
  },
  {
    title:"Category",
    dataIndex:"category"
  },
  {
    title:"Price",
    dataIndex:"price",
    sorter:(a,b)=>a.length-b.length
  },
  {
    title:"Quantity",
    dataIndex:"quantity",
    sorter:(a,b)=>a.length-b.length
  },
  {
    title:"Edit Details",
    dataIndex:"edit"
  }
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
const ProductList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open,setOpen] = useState()
  const [productId,setProductId] = useState()
  const [productTitle,setProductTitle] = useState()

  const hideModal = ()=>{
    setOpen(false)
  }

  const deleteProductUnique = (data)=>{
    setOpen(true)
    setProductId(data?.id)
    setProductTitle(data?.title)
  }


  const deleteProductNow = ()=>{
    dispatch(deleteProduct(productId))
    setOpen(false)
    toast.success(`Deleted ${productTitle} from Database Successfully`)
    setTimeout(()=>{
      dispatch(resetState())
      dispatch(getProducts())
      navigate("/admin/product-list")
    },2000)
  }




  const productState = useSelector(state=>state.product.products.data)

  useEffect(()=>{
    dispatch(getProducts())
  },[])

  const productsdata = [];

  for (let i = 0; i < productState?.length>=1?productState.length:0; i++) {
    productsdata.push({
      key: i,
      title: productState[i].title,
      description: productState[i].description,
      brand: productState[i].brand,
      category: productState[i].category,
      quantity: productState[i].quantity,
      price: `₹${productState[i].price}`,
      edit: 
        <>
        <div className='d-flex flex-column justify-content-between align-items-center'>
          <Link to={`/admin/product/${productState[i]._id}`}><AiFillEdit className='fs-5'/></Link>
          <Button className='ms-1' onClick={
                ()=>{
                  const data = {id:productState[i]?._id,title:productState[i]?.title}
                  deleteProductUnique(data)
                }
              }><MdDelete className='fs-5' style={{color:"red"}}/></Button>
        </div>
        </>
    });
  }
  


  return (
    <div>
        <h3>Products</h3>
        <div className='mt-4'>
            <div>
            <Table columns={columns} dataSource={productsdata.length>=1?productsdata:null} />
            </div>
        </div>
        <CustomModel hideModal={hideModal} open={open} performAction={deleteProductNow} title={<>Are You Sure To Delete <p style={{color:"red",display:"inline"}}>" {productTitle} "</p> Product</>}/>
    </div>
  )
}

export default ProductList