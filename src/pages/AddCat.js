import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import * as yup from "yup";
import CustomInput from '../components/CustomInput'
import { createCategory, getCategory, resetState, updateCategory } from '../features/category/categorySlice';

let schema = yup.object().shape({
  title: yup.string().required("Title Is Required")
})

const AddCat = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const getCategoryId = location. pathname.split("/")[3];

  let {isSuccess,isError,isPending,createdCategory,categorytitle} = useSelector(state=>state.category)

  useEffect(()=>{
    if(getCategoryId!==undefined)
    {
        dispatch(getCategory(getCategoryId))
        formik.values.title = categorytitle
    }
    else{
        dispatch(resetState())
    }
  },[getCategoryId,categorytitle])

  const formik = useFormik({
    initialValues:{
      title:""
    },
    validationSchema:schema,
    onSubmit: (values)=>{
      if(getCategoryId !== undefined)
      {
        const data = {id:getCategoryId,Data:values}
        dispatch(updateCategory(data))
        if(formik.values.title !==categorytitle)
        { 
          toast.success("Category Updated Successfully")
          setTimeout(()=>{
            navigate('/admin/category-list')
          },4000)
        }
        else
        {
          toast.error("Error in Updating")
        }
      }
      else{
        dispatch(createCategory(values))
      }
      formik.resetForm()
      setTimeout(()=>{
        dispatch(resetState())
      },3000)
    }
})
    

    

    useEffect(()=>{
      if(isSuccess && createdCategory==="Success")
      {
        toast.success("Category Created Successfully")
      }
      if(isError){
        toast.error("Unable To Create Category Now")
      }
    },[isSuccess,isError,isPending,createdCategory])

    
  return (
    <div>
        <h3>{getCategoryId?"Edit ":"Add "} Category</h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput type="text" name="title" value={formik.values.title} onChange={formik.handleChange("title")} onBlur={formik.handleBlur("blur")}  placeholder="Enter Category"/>

            <div className="error">
                  {
                    formik.touched.title && formik.errors.title
                  }

             </div>

                <button style={{backgroundColor:"#8443f5"}} className='btn btn-success my-5 border-0 rounded-5' type='submit'>{getCategoryId?"Edit ":"Add "}  Category</button>
            </form>
        </div>
    </div>
  )
}

export default AddCat