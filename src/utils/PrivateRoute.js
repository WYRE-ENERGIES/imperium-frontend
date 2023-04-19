import { Navigate, Outlet } from 'react-router-dom'

import React from 'react'
import { isAuthenticated, userRole } from './helpers'
import ErrorPage from '../components/Error/DisabledAccount/ErrorPage'
const PrivateRoute = ({ pathTo }) => {
  return userRole() === pathTo ? (
    <Outlet />
  ) : isAuthenticated() ? (
    <ErrorPage status={403} />
  ) : (
    <Navigate to={pathTo ? '/admin/sign-in' : '/'} />
  )
}

export default PrivateRoute
