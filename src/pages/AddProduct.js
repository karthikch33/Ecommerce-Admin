import React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill';
import { useFormik } from "formik";
import Dropzone from 'react-dropzone'
import * as yup from "yup";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useLocation, useNavigate} from 'react-router-dom'
import {PiFilesFill} from 'react-icons/pi'
import { Select } from 'antd';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { getBrandList } from '../features/brand/brandSlice';
import { getCategoryList } from '../features/category/categorySlice';
import { getColorList } from '../features/color/colorSlice';
import { deleteImg, uploadImg,resetStateUpload } from '../features/upload/uploadSlice';
import { createProduct, getProduct, resetState, updateProduct } from '../features/product/productSlice';
import Loading from './Loading';



let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price:yup.string().required('Price is Required'),
  quantity:yup.string().required("Quantity of Product is Required"),
  color:yup.array().min(1,"Choose Atleast One Color").required("Color is Required"),
  brand:yup.string().required("Brand is Required"),
  category:yup.string().required("Category is Required"),
  tags:yup.string().required("Tags Are Required By One Comma Specified")
});

const AddProduct = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const location = useLocation()
    const getProductId = location.pathname.split('/')[3]

    const brandState = useSelector(state=>state.brand.brands)
    const categoryState = useSelector(state=>state.category.categories)
    const colorState = useSelector(state=>state.color.colors)
    const imgState = useSelector(state=>state.upload.images)
    const {isPending} = useSelector(state=>state.upload)
    const newproduct = useSelector(state=>state.product)

    const {isSuccess,isError,isLoading,createdProduct,updatedTitle,updatedDescription,updatedPrice,updatedBrand,updatedCategory,updatedQuantity,updatedTags} = newproduct

    const formik = useFormik({
      initialValues: {
        title: "",
        description: "",
        price:"",
        images:"",
        tags:"",
        quantity:"",
        brand:"",
        color:[],
        category:""
      },
      validationSchema: schema,
      onSubmit: (values) => {
        if(getProductId !== undefined)
        {
           const data = {id:getProductId,updatedData:{
            title: formik.values.title,
            description: formik.values.description,
            price: formik.values.price,
            tags:formik.values.tags,
            quantity:formik.values.quantity,
            brand:formik.values.brand,
            category:formik.values.category
           }}
           dispatch(updateProduct(data))
           if(formik.values.brand !== updatedBrand || formik.values.category !== updatedCategory || formik.values.description !== updatedDescription || formik.values.price !== updatedPrice || formik.values.tags !== updatedPrice || formik.values.title !== updatedTitle)
           {
            toast.success("Product Details Updated Successfully")
           }
           else{
            toast.error("Unable To Update Product Details")
           }
        }
        else{
          dispatch(createProduct(values))
        }
        formik.resetForm()
        setColor([]);
        dispatch(resetState())
        setTimeout(()=>{
          dispatch(resetStateUpload())
        },3000)
      },
    });

    useEffect(()=>{
        dispatch(getBrandList())
        dispatch(getCategoryList())
        dispatch(getColorList())
    },[])

    
    useEffect(()=>{
      if(getProductId !== undefined)
      {
        dispatch(getProduct(getProductId))
        formik.values.brand = updatedBrand
        formik.values.category = updatedCategory
        formik.values.description = updatedDescription
        formik.values.tags = updatedTags
        formik.values.quantity = updatedQuantity
        formik.values.price = updatedPrice
        formik.values.title = updatedTitle
      }
      else{
        dispatch(resetState())
      }
    },[getProductId,updatedTitle,updatedDescription,updatedPrice,updatedBrand,updatedCategory,updatedQuantity,updatedTags,dispatch,createdProduct])
   

    useEffect(()=>{
      if(isSuccess && createdProduct)
      toast.success("Product Added Successfully")

      if(isError)
      toast.error("Product Not Created ")

    },[isSuccess,isError,isLoading,createdProduct])

    const img = []
    const [color,setColor] = useState();


    imgState?.forEach(i=>{
      img.push({
        public_id:i.public_id,
        url:i.url
      })
    })

    
    

    useEffect(()=>{
      formik.values.color = color ? color : []
      formik.values.images = img
    },[color,img])

    const coloropt = []
    colorState?.forEach(i=>{
      coloropt.push({
        value:i._id,
        label:i.title
      })
    })
   
    const handleColors =  (e)=>{
      setColor(e)
    }

  return (
    <div>
        <h3 className='mt-4'>{getProductId !== undefined ? "Edit ":"Add "} Product</h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput type="text" placeholder="Enter Product Title" name="title" onChange={formik.handleChange("title")} onBlur={formik.handleBlur("title")} value={formik.values.title}/>

                <div className='error'>
                {
                  formik.touched.title && formik.errors.title
                }
                </div>

                <ReactQuill className='my-3' theme="snow" name="description" onChange={formik.handleChange("description")} value={formik.values.description}/>

                <div className='error'>
                {
                  formik.touched.description && formik.errors.description
                }
                </div>

                <CustomInput name="price" onChange={formik.handleChange("price")} onBlur={formik.handleBlur("price")} type="number" placeholder={`Enter Product Price`} value={formik.values.price}/>



                <div className='error'>
                {formik.touched.price && formik.errors.price}
                </div>

                <select className='form-control py-3 my-3 form-select' name='category' onChange={formik.handleChange("category")} onBlur={formik.handleBlur("category")} value={formik.values.category}>
                    <option value="">Select Category</option>
                    {
                      categoryState?.map((element,i)=>{
                        return <option value={element.title} key={i}>{element.title}</option>
                      })
                    }
                </select>

                <div className='error'>
                    {formik.touched.category && formik.errors.category}
                </div>

                <select className='form-control py-3 my-3 form-select' name='brand' onBlur={formik.handleBlur("brand")} value={formik.values.brand} onChange={formik.handleChange("brand")}>
                    <option value="">Select Brand</option>
                    {
                      brandState.map((brand,i)=>{
                        return <option value={brand.title} key={i}>{brand.title}</option>
                      })
                    }
                </select>

                <div className="error">
                  {formik.touched.brand && formik.errors.brand}
                </div>

                <CustomInput name="tags" value={formik.values.tags} type="text" onChange={formik.handleChange("tags")} onBlur={formik.handleBlur("tags")} placeholder="Enter Product Tags"/>

                <div className="error">
                  {
                    formik.touched.tags && formik.errors.tags
                  }
                </div>

                  <Select mode='multiple' allowClear className='w-100 my-3' placeholder="Select Multiple Colors if Required" defaultValue={color} onChange={(e)=>handleColors(e)} options={coloropt}/>

                  <div className="error">
                    {
                      formik.touched.color && formik.errors.color
                    }
                  </div>
                
                <CustomInput name="quantity" value={formik.values.quantity} onChange={formik.handleChange("quantity")} type="number" placeholder="Enter Product Quantity"/>

                <div className='error'>
                {
                  formik.touched.quantity && formik.errors.quantity
                }
                </div>

                <div className='bg-white p-5 d-flex justify-content-center align-items-center my-3 '>
                <Dropzone onDrop={acceptedFiles => dispatch(uploadImg(acceptedFiles))}>
                  {({getRootProps, getInputProps}) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <PiFilesFill className='' style={{fontSize:"75px",marginLeft:"30px"}}/>
                        <p>Drag 'n' drop Images here, or click to select Images</p>
                      </div>
                    </section>
                  )}
                </Dropzone>
               </div>
                <div className='showImages d-flex'>
                    {
                   isPending === false ?  imgState?.map((i,j)=>{
                        return (
                   <div className='position-relative' key={j} >
                      <button className='fs-5 btn btn-danger position-absolute' onClick={()=>dispatch(deleteImg(i.public_id))} style={{right:"0px"}}>X</button>
                       <img className='img-fluid mx-4' style={{width:"200px",height:"200px"}} src={i.url}  alt="" />  
                   </div>
                        )
                      }) : <Loading/>
                    }
                </div>

            <button style={{backgroundColor:"#8443f5",color:'white'}} className='btn my-3 border-0 rounded-5' type='submit'>{getProductId !== undefined ? "Edit ":"Add "} Product</button>
            </form>
        </div>
    </div>
  )
}

export default AddProduct