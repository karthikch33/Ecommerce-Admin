import React, { useEffect, useState } from 'react'
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropzone from 'react-dropzone'
import {useLocation, useNavigate} from 'react-router-dom'
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { PiFilesFill } from 'react-icons/pi';
import {getBlogCategoryList} from '../features/blogCategory/bCategorySlice'
import { deleteImg, uploadImg } from '../features/upload/uploadSlice';
import { createBlog, getBlog, resetState, updateBlog } from '../features/blog/blogSlice';
import { toast } from 'react-toastify';

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  category:yup.string().required("Blog Category is Required"),
});


const AddBlog = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[3]

  const categoryState = useSelector(state=>state.blogCategory.blogcategories)
  const imgState = useSelector(state=>state.upload.images.data)
  const newproduct = useSelector(state=>state.blog)
  const {isSuccess,isError,isLoading,createdBlog,updatedTitle,updatedDescription,updatedCategory} = newproduct

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category:"",
      images:""
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if(getBlogId!==undefined)
      {
        const data = {id:getBlogId,BlogData:{
          title:formik.values.title,
          description:formik.values.description,
          category:formik.values.category
        }}
        dispatch(updateBlog(data))
        if(formik.values.category !== updatedCategory || formik.values.title !== updatedTitle || formik.values.description !== updatedDescription)
        {
          toast.success("Blog Data Updated Successfully")
        }
        else{
          toast.error("Blog Data Not Updated")
        }
        setTimeout(()=>{
          navigate('/admin/blog-list')
        },4000)
      }
      else{
        dispatch(createBlog(values))
      }
      formik.resetForm()
      setTimeout(()=>{
        dispatch(resetState())
      },1000)
    },
  });

  useEffect(()=>{
      if(getBlogId !== undefined)
      {
        dispatch(getBlog(getBlogId))
        formik.values.category = updatedCategory
        formik.values.description = updatedDescription
        formik.values.title = updatedTitle
      }
      else{
        dispatch(resetState())
      }
  },[getBlogId,updatedTitle,updatedDescription,updatedCategory,dispatch])

  useEffect(()=>{
        dispatch(getBlogCategoryList())
    },[])

    const img = []
    imgState?.forEach(i=>{
      img.push({
        public_id:i.public_id,
        url:i.url
      })
    })

    useEffect(()=>{
      if(isSuccess && createdBlog ==="Success")
      toast.success("Blog Added Successfully")

      if(isError)
      toast.error("Blog Not Created ")

    },[isSuccess,isError,isLoading,createdBlog])

    useEffect(()=>{
      formik.values.images = img
    },[img])

  return (
    <div>
        <h3 className='mb-4'>{getBlogId !== undefined?"Edit ":"Add "} Blog</h3>
        <div className=''>
            <form action="" className='gap-5' onSubmit={formik.handleSubmit}>
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
                      imgState?.map((i,j)=>{
                        return (
                   <div className='position-relative' key={j} >
                      <button className='fs-5 btn btn-danger position-absolute' onClick={()=>dispatch(deleteImg(i.public_id))} style={{right:"0px"}}>X</button>
                       <img className='img-fluid mx-4' style={{width:"200px",height:"200px"}} src={i.url}  alt="" />
                   </div>
                        )
                      })
                    }
                </div>

                <div className='mt-4'>
                  
                <CustomInput type={"text"} placeholder="Enter Blog Title" name="title" onChange={formik.handleChange("title")} onBlur={formik.handleBlur("title")} value={formik.values.title}  />

                <div className="error">
                  {
                    formik.touched.title && formik.errors.title
                  }
                </div>

                <select className='form-control py-3 my-3 form-select' name='category' value={formik.values.category} onChange={formik.handleChange('category')}onBlur={formik.handleBlur('category')}>
                    <option value="">Select Blog Category</option>
                    {updatedCategory !== " " ? <option value={formik.values.category}>{formik.values.category}</option>:null}
                    {
                      categoryState?.map((element,i)=>{
                      return formik.values.category !== element?.title ?<option value={element?.title}>{element?.title}</option> :null
                      })
                    }
                </select>

                <div className="error">
                  {
                    formik.touched.category && formik.errors.category
                  }
                </div>

                <ReactQuill theme="snow" name="description" onChange={formik.handleChange("description")}  value={formik.values.description} />

                <div className="error">
                  {
                    formik.touched.description && formik.errors.description
                  }
                </div>

                <button style={{backgroundColor:"#8443f5"}} className='btn btn-success my-5 border-0 rounded-5' type='submit'>{getBlogId !== undefined?"Edit ":"Add "} Blog</button>

                </div>
            </form>
        </div>
    </div>
  )
}

export default AddBlog