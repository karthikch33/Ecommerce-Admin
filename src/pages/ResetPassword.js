import React from 'react'
import CustomInput from '../components/CustomInput'

const ResetPassword = () => {
  return (
    <>
      <div className='py-5' style={{background:"#8443f5",minHeight:"100vh"}}>
          <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
                <h3 className='text-center'>ResetPassword</h3>
                <p className='text-center'>Reset Your Password Here</p>
              <form action="" className='form'>
              <CustomInput type="password" className="mt-4" placeholder="New Password" id="password"/>
              <CustomInput type="password" className="mt-4" placeholder="Confirm Password" id="password"/>
              <button className='border-0 px-3 py-2 mt-4 text-white fs-6 fw-bold w-100' type='submit' style={{background:"#8443f5"}}>Submit</button>
              </form>
          </div>
      </div>
    </>
  )
}

export default ResetPassword