import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import * as yup from "yup";
import CustomInput from '../components/CustomInput'
import { createColor, resetState } from '../features/color/colorSlice';


let schema = yup.object().shape({
  title: yup.string().required("Color Selection Is Required")
})


const AddColor = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const formik = useFormik({
    initialValues:{
      title:""
    },
    validationSchema:schema,
    onSubmit: (values)=>{
      dispatch(createColor(values))
      formik.resetForm()
      setTimeout(()=>{
        dispatch(resetState())
      },1000)
    }
})
    

    let {isSuccess,isError,isPending,createdColor} = useSelector(state=>state.color)

    useEffect(()=>{
      if(isSuccess && createdColor)
      {
        toast.success("Color Created Successfully")
      }
      // else if(isPending)
      // {
      //   toast.loading("Creating Brand")
      // }
      if(isError){
        toast.error("Unable To Create Color Now")
      }
    },[isSuccess,isError,isPending,createdColor])



  return (
    <div>
        <h3>Add Color</h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput type="color" placeholder="Choose Color" name="title" onBlur={formik.handleBlur("title")} onChange={formik.handleChange("title")} value={formik.values.title} />
                <div className="error">
                  {
                    formik.touched.title && formik.errors.title
                  }
             </div>
                <button style={{backgroundColor:"#8443f5"}} className='btn btn-success my-5 border-0 rounded-5' type='submit'>Add Color</button>
            </form>
        </div>
    </div>
  )
}

export default AddColor