import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import * as yup from "yup";
import CustomInput from '../components/CustomInput'
import { createBlogCategory, getBlogCategoryService, resetState, updateBlogCategory } from '../features/blogCategory/bCategorySlice';

let schema = yup.object().shape({
  title: yup.string().required("Title Is Required")
})

const AddBlogCat = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const getBlogCategoryId = location.pathname.split('/')[3]

  const {isSuccess,isError,isPending,createdBlogCategory,updatedTitle} = useSelector(state=>state.blogCategory)

  useEffect(()=>{
    if(getBlogCategoryId!==undefined)
    {
        dispatch(getBlogCategoryService(getBlogCategoryId))
        formik.values.title = updatedTitle
    }
    else{
        dispatch(resetState())
    }
  },[getBlogCategoryId,updatedTitle,dispatch])

  const formik = useFormik({
    initialValues:{
      title:""
    },
    validationSchema:schema,
    onSubmit: (values)=>{
      if(getBlogCategoryId !== undefined)
      {
          const data = {id:getBlogCategoryId,BlogCategoryData:values}
          dispatch(updateBlogCategory(data))
          if(formik.values.title !== updatedTitle)
          {
            toast.success("Blog Category Updated Successfully")
            setTimeout(()=>{
              navigate('/admin/blog-category-list')
            },4000)
          }
          else{
            toast.error("Unable to Update Blog Category ")
          }
      } 
      else{
        dispatch(createBlogCategory(values))
      }
      formik.resetForm()
      setTimeout(()=>{
        dispatch(resetState())
      },1000)
    }
})
    

    

    useEffect(()=>{
      if(isSuccess && createdBlogCategory==="Success")
      {
        toast.success("BlogCategory Created Successfully")
      }
      // else if(isPending)
      // {
      //   toast.loading("Creating Brand")
      // }
      if(isError){
        toast.error("Unable To Create BlogCategory Now")
      }
    },[isSuccess,isError,isPending,createdBlogCategory])


  return (
    <div>
        <h3>{getBlogCategoryId?"Edit ":"Add "} Blog Category</h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput type="text" name="title" value={formik.values.title} onChange={formik.handleChange("title")} onBlur={formik.handleBlur("blur")}  placeholder="Enter Blog Category"/>

              <div className="error">
                    {
                      formik.touched.title && formik.errors.title
                    }

              </div>
                <button style={{backgroundColor:"#8443f5"}} className='btn btn-success my-5 border-0 rounded-5' type='submit'>{getBlogCategoryId?"Edit ":"Add "} Blog Category</button>
            </form>
        </div>
    </div>
  )
}

export default AddBlogCat