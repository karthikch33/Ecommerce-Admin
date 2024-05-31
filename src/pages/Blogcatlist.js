import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlogCategory, getBlogCategoryList, resetState } from '../features/blogCategory/bCategorySlice';
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
    title:"Edit Details",
    dataIndex:"edit"
  }
];

const Blogcatlist = () => {

      const dispatch = useDispatch()
      const navigate = useNavigate()

      const [open,setOpen] = useState(false)
      const [blogCatId,setBlogCatId] = useState()
      const [blogCatTitle,setBlogCatTitle] = useState("")  

      const showModel = (data)=>{
          setOpen(true)
          setBlogCatId(data?.id)
          setBlogCatTitle(data?.title)
      }

      const hideModal = ()=>{
        setOpen(false)
      }

      const deleteBlog = (id,title)=>{
        dispatch(deleteBlogCategory(id))
        setOpen(false)
        toast.success(`Deleted ${title} BlogCategory Successfully`)
        setTimeout(()=>{
          navigate('/admin/blog-category-list')
          dispatch(resetState())
          dispatch(getBlogCategoryList())
        },2000)
      }

        useEffect(()=>{
          dispatch(getBlogCategoryList())
        },[])

      const blogCategoryState = useSelector(state=>state.blogCategory.blogcategories)
    
      const blogCategoryList = [];
      blogCategoryState?.forEach((element,i) => {
        blogCategoryList.push({
         key:i,
         title:element.title,
         edit: 
            <>
              <Link to={`/admin/blog-category/${element?._id}`} className='fs-4'><AiFillEdit className=''style={{marginTop:"-30px"}}/></Link>
              <Button className='fs-3 mx-3' onClick={
                ()=>{
                  const data = {id:element?._id,title:element?.title}
                  showModel(data)
                }
                } ><MdDelete className=''style={{marginTop:"-30px",color:'red'}} /></Button>
            </>
       })
     });
  return (
    <div>
        <h3>Blog Categories</h3>
        <div className='mt-4'>
            <div>
            <Table columns={columns} dataSource={blogCategoryList} />
            </div>
        </div>
        <CustomModel open={open} performAction={(e)=>deleteBlog(blogCatId,blogCatTitle)} hideModal={hideModal} title={ <> Are You Sure To Delete <span style={{ color: "red",display:"inline" }} className=''>"  {blogCatTitle} " </span>Blog  </>}/>
    </div>
  )
}

export default Blogcatlist