import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import * as yup from "yup";
import CustomInput from '../components/CustomInput'
import { createBrand, getBrand, resetState, updateBrand } from '../features/brand/brandSlice';

let schema = yup.object().shape({
  title: yup.string().required("Title Is Required")
})


const AddBrand = () => {
  
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const getBrandId = location.pathname.split('/')[3];
  let {isSuccess,isError,isPending,createdBrand,brandtitle,updatedBrand} = useSelector(state=>state.brand)

  useEffect(()=>{
    if(getBrandId !== undefined)
    {
      dispatch(getBrand(getBrandId))
      formik.values.title = brandtitle
    }
    else{
      dispatch(resetState())
    }
  },[getBrandId,dispatch,brandtitle,updatedBrand])

  const formik = useFormik({
    initialValues:{
      title:brandtitle||""
    },
    validationSchema:schema,
    onSubmit: (values)=>{
      if(getBrandId!==undefined)
      {
        const data = {id:getBrandId,brandData:values}
        dispatch(updateBrand(data))
        if(formik.values.title !==brandtitle)
        { 
          toast.success("Brand Updated Successfully")
          setTimeout(()=>{
            navigate('/admin/brand-list')
          },4000)
        }
        else
        {
          toast.error("Error in Updating")
        }
      }
      else{
        dispatch(createBrand(values))
      }
      formik.resetForm()
      setTimeout(()=>{
        dispatch(resetState())
      },2000)
    }
})

    


    useEffect(()=>{
      if(isSuccess && createdBrand==="Success")
      {
        toast.success("Brand Created Successfully")
      }
      if(updatedBrand && isSuccess){
      }
      if(isError){
        toast.error("Unable To Create Brand Now")
      }
    },[isSuccess,isError,isPending,brandtitle])

  return (
    <div>
        <h3>{getBrandId!==undefined?"Edit":"Add"} Brand</h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput type="text" name="title" value={formik.values.title} onChange={formik.handleChange("title")} onBlur={formik.handleBlur("blur")}  placeholder="Enter Brand"/>
                
                <div className="error">
                  {
                    formik.touched.title && formik.errors.title
                  }

                </div>
                <button style={{backgroundColor:"#8443f5"}} className='btn btn-success my-5 border-0 rounded-5' type='submit'>{getBrandId!==undefined ? "Edit ": "Add "}Brand</button>
            </form>
        </div>
    </div>
  )
}

export default AddBrand
