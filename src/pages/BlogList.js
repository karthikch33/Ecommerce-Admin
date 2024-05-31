import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, getbloglists, resetState } from '../features/blog/blogSlice';
import { AiFillEdit } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import CustomModel from '../components/CustomModel';
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
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Category',
    dataIndex: 'category',
  },
  {
    title:"author",
    dataIndex:'author'
  },
  {
    title:"Edit Details",
    dataIndex:"edit"
  }
];
const BlogList = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open,setOpen] = useState()
  const [blogTitle,setBlogTitle] = useState()
  const [blogid,setBlogId] = useState()

  const detailsModal = (data)=>{
      setOpen(true)
      setBlogId(data.id)
      setBlogTitle(data.title)
  }

  const deleteBlogUnique = ()=>{
    dispatch(deleteBlog(blogid))
    setOpen(false)
    toast.success(`Deleted ${blogTitle} from Database Successfully`)
    setTimeout(()=>{
      dispatch(resetState())
      dispatch(getbloglists())
      navigate('/admin/blog-list')
    },2000)
  }

  const hideModal = ()=>{
    setOpen(false)
  }



  useEffect(()=>{
    dispatch(getbloglists())
  },[])
 
  const blogState = useSelector(state=>state.blog.blogs)
  const bloglist = []
     
  blogState?.forEach((element,i) => {
    bloglist.push({
     key:i,
     title:element.title,
     description:element.description,
     category:element.category,
     author:element.author,
     edit: 
        <>
        <div className='d-flex justify-content-between flex-column align-items-center'>
          <Link to={`/admin/add-blog/${element?._id}`} className='fs-5'><AiFillEdit/></Link>
          <Button className='fs-6' onClick={()=>{
            const data = {id:element?.id,title:element?.title}
            detailsModal(data)
          }} style={{width:"10px"}}><MdDelete className='fs-5' style={{marginLeft:"-10px",color:"red"}}/></Button>
          </div>
        </>
   })
 });

  return (
    <div>
        <h3>Blog List</h3>
        <div className='mt-4'>
            <div>
            <Table columns={columns} dataSource={bloglist} />
            </div>
        </div>
        <CustomModel title={<>Are You Sure To Delete <p style={{color:"red",display:"inline"}}>" {blogTitle} "</p> Blog</>} hideModal = {hideModal} performAction={deleteBlogUnique} open={open}/>
    </div>
  )
}

export default BlogList