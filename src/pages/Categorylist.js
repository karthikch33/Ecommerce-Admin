import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, getCategoryList, resetState } from '../features/category/categorySlice';
import { AiFillEdit } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import CustomModel from '../components/CustomModel';
import { deleteBlogCategory } from '../features/blogCategory/bCategorySlice';
import { toast } from 'react-toastify';

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

const Categorylist = () => {
    
     const dispatch = useDispatch()
     const [open,setOpen] = useState()
     const [categoryTitle,setCategoryTitle] = useState()
     const [categoryId,setCategoryId] = useState()
     const navigate = useNavigate()

     const showModal = (data)=>{
        setOpen(true)
        setCategoryTitle(data.title)
        setCategoryId(data.id)
      }

      const hideModal = ()=>{
        setOpen(false)
      }

      const deleteCategoryUnique = ()=>{
          dispatch(deleteCategory(categoryId))
          setOpen(false)
          toast.success(`Deleted ${categoryTitle} from Database Successfully`)
          setTimeout(()=>{
            dispatch(getCategoryList())
            dispatch(resetState())
            navigate("/admin/category-list")
          },3000)
      }

     useEffect(()=>{
      dispatch(getCategoryList())
     },[])

     const categoryState = useSelector(state=>state.category.categories);

     const categorylist = []
     
     categoryState?.forEach((element,i) => {
      categorylist.push({
        key:i,
        title:element.title,
        edit: 
            <>
              <Link to={`/admin/category/${element?._id}`} className='fs-4 mx-3'><AiFillEdit/></Link>
              <Button onClick={()=>{
                const data = {id:element?._id,title:element.title}
                showModal(data)
              }}><MdDelete className='fs-3 ' style={{marginTop:"-7px",color:"red"}}/></Button>
            </>
      })
    });

  return (
    <div>
        <h3>Product Categories</h3>
        <div className='mt-4'>
            <div>
            <Table columns={columns} dataSource={categorylist} />
            </div>
        </div>
        <CustomModel open={open} performAction={()=>deleteCategoryUnique()} hideModal={hideModal} title={<>Are You Sure To Delete <p style={{color:"red",display:"inline"}}>" {categoryTitle} "</p> Category</>}/>
    </div>
  )
}

export default Categorylist