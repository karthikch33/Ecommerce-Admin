import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import { useFormik } from "formik";
import * as yup from "yup";
import CustomInput from '../components/CustomInput'
import { createCoupon, getCoupon, resetState, updateCoupon } from '../features/coupon/couponSlice';

let schema = yup.object().shape({
  name: yup.string().required("Title Is Required"),
  discount:yup.number().required("Discount is Required"),
  expiry:yup.date().required("Expiry Date is Mandatory")
})


const AddCoupon = () => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const getCouponId = location.pathname.split('/')[3]

  const {isSuccess,isError,isPending,createdCoupon,coupontitle,coupondiscount,couponcreateddate} = useSelector(state=>state.coupon)

  useEffect(()=>{
    if(getCouponId !== undefined){
    dispatch(getCoupon(getCouponId))
    formik.values.name = coupontitle
    const date = new Date(couponcreateddate);
    const year = date.getFullYear()
    const month = date.getMonth()+1
    const day = date.getDate()
    const exactdate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2,'0')}`
    formik.values.expiry = exactdate
    formik.values.discount = coupondiscount
    }
    else
    {
      dispatch(resetState())
    }
  },[getCouponId,coupontitle,coupondiscount,couponcreateddate,dispatch])

  const formik = useFormik({
    initialValues:{
      name:"",
      expiry:"",
      discount:""
    },
    validationSchema:schema,
    onSubmit: (values)=>{
        if(getCouponId !== undefined)
        {
          const data = {id:getCouponId,updatedData:values}
          dispatch(updateCoupon(data))

          if(formik.values.title !== coupontitle || formik.values.discount !== coupondiscount || formik.values.expiry !== couponcreateddate)
          {
            toast.success("Coupon Details Updated Successfull")
          }
          else{
            toast.error("Unable To Update Coupon Details")
          }
          setTimeout(()=>{
            navigate('/admin/coupon-list')
          },4000)
        }
        else{
          dispatch(createCoupon(values))
        }
      formik.resetForm()
      setTimeout(()=>{
        dispatch(resetState())
      },1000)
    }
})
    

    

    useEffect(()=>{
      if(isSuccess && createdCoupon==="Success")
      {
        toast.success("Coupon Created Successfully")
      }
      // else if(isPending)
      // {
      //   toast.loading("Creating Brand")
      // }
      if(isError){
        toast.error("Unable To Create Coupon Now")
      }
    },[isSuccess,isError,isPending,createdCoupon])

  return (
    <div>
        <h3>{getCouponId?"Edit ":"Add "} Coupon</h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput type="text" name="name" value={formik.values.name} onChange={formik.handleChange("name")} onBlur={formik.handleBlur("name")}  placeholder="Enter Coupon"/>

                <div className="error">
                  {
                    formik.touched.name && formik.errors.name
                  }

                </div>

                <CustomInput type="date" className='my-4' name="expiry" value={formik.values.expiry} onChange={formik.handleChange("expiry")} onBlur={formik.handleBlur("expiry")}  placeholder="Select Expiry Date"/>
                
                <div className="error">
                  {
                    formik.touched.expiry && formik.errors.expiry
                  }

                </div>

                <CustomInput type="number" className='my-4' name="discount" value={formik.values.discount} onChange={formik.handleChange("discount")} onBlur={formik.handleBlur("discount")}  placeholder="Enter Discount Percentage"/>
                
                <div className="error">
                  {
                    formik.touched.discount && formik.errors.discount
                  }

                </div>

                <button style={{backgroundColor:"#8443f5"}} className='btn btn-success my-5 border-0 rounded-5' type='submit'>{getCouponId?"Edit ":"Add "}Coupon</button>
            </form>
        </div>
    </div>
  )
}

export default AddCoupon