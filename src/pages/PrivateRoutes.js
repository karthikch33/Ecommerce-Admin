import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoutes = ({children}) => {
    const getTokenfromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : undefined
    return getTokenfromLocalStorage !== undefined ? children : <Navigate to={'/login'}/>
}

export default PrivateRoutes