import React from 'react'
import CustomInput from '../components/CustomInput'

const ForgotPassword = () => {
  return (
    <>
      <div className='py-5' style={{background:"#8443f5",minHeight:"100vh"}}>
          <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                <h3 className='text-center'>ForgotPassword</h3>
                <p className='text-center'>We Will Send Mail To ResetPassword!</p>
              <form action="" className='form'>
              <CustomInput type="email" className="mt-4" placeholder="Email Address" id="email"/>
              <button className='border-0 px-3 py-2 mt-4 text-white fs-6 fw-bold w-100' type='submit' style={{background:"#8443f5"}}>Send Link</button>
              </form>
          </div>
      </div>
    </>
  )
}

export default ForgotPassword