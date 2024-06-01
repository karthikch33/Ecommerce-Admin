import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import Bulb from "./Bulb";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(state=>state?.auth)
  useEffect(()=>{
    const getTokenfromLocalStorage = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null
    console.log(getTokenfromLocalStorage);
    if(user && user?.loginStatusCount===201 && getTokenfromLocalStorage !== null){
      navigate('/admin')
    }
    else{

    }
  },[user])

  let schema = yup.object().shape({
    email: yup
      .string()
      .email("Email Should be Valid")
      .required("Email is Required"),
    password: yup.string().required("Password is Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  return (
    <>
    <ToastContainer
            position='top-right'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
          />
           <Bulb/>
      <div
        className="py-5 loginbanner"
        style={{ minHeight: "96.7vh" }}
      >
        <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
          <h3 className="text-center">Login</h3>
          <p className="text-center">Login To Your Account To Continue</p>
          <form action="" className="form" onSubmit={formik.handleSubmit}>
            <CustomInput
              type="email"
              className="mt-4"
              name="email"
              placeholder="Email Address"
              id="email"
              onChange={formik.handleChange("email")}
              value={formik.values.email}
            />
            <div className="error">
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </div>
            <CustomInput
              type="password"
              className="mt-4"
              name="password"
              placeholder="Password"
              id="password"
              onChange={formik.handleChange("password")}
              value={formik.values.password}
            />
            <div className="error">
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}
            </div>
            <div style={{ marginTop: "10px", color: "white" }}>
              <Link to={"https://appcq.vercel.app/forgot-password"} style={{ textDecoration: "none" }}>
                Forgot Password
              </Link>
            </div>
            <button
              className="border-0 px-3 py-2 mt-4 text-white fs-6 fw-bold w-100 text-decoration-none text-center"
              type="submit"
              style={{ background: "#8443f5" }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
