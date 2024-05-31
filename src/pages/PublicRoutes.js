import React from 'react'
import { Navigate } from 'react-router-dom'
const PublicRoutes = ({children}) => {
    const getTokenfromLocalStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')):undefined
    return getTokenfromLocalStorage === undefined ? children : <Navigate to={'/admin'} replace={true}/>
}

export default PublicRoutes