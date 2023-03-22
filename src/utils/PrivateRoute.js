import { Navigate, Outlet } from 'react-router-dom'

import React from 'react'
import { isAuthenticated } from './helpers'

const PrivateRoute = ({ pathTo }) => {
  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to={pathTo ? '/admin/sign-in' : '/'} />
  )
}

export default PrivateRoute
