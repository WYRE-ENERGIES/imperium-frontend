import { Navigate, Outlet, useNavigate } from 'react-router-dom'

import React from 'react'
import { isAuthenticated, userRole } from './helpers'
import ErrorPage from '../components/Error/DisabledAccount/ErrorPage'
import { useIdleTimer } from 'react-idle-timer'
import { useDispatch } from 'react-redux'
import { logOutUser } from '../features/slices/auth/authSlice'
const redirectTo = (isAdmin, token) => {
  let path = '/'
  if (token) {
    path = isAdmin ? '/admin/overview' : '/overview'
  } else {
    path = isAdmin ? '/admin' : '/'
  }
  return path
}
const PrivateRoute = ({ pathTo, isAdmin }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onLogout = () => {
    const navigateTo = isAdmin ? '/admin/sign-in' : '/'
    dispatch(logOutUser())
    navigate(navigateTo)
  }
  const onIdle = () => {
    console.log('user herwe ', isAuthenticated())
    onLogout()
  }

  const onActive = () => {
    // if last active time is greater than current time, log user our
    const getLastActiveDate = localStorage.getItem('last_active_time')
    if (getLastActiveDate) {
      // checking if current date is greater than last active date
      const lastActiveInDate = new Date(getLastActiveDate)
      const IDLETIME_IN_MINS =
        (Number(process.env.REACT_APP_IDLETIME_IN_MINS) || 1) * 60 * 1000
      var duration = Date.now() - lastActiveInDate
      if (duration > IDLETIME_IN_MINS) {
        onLogout()
      }
    }
    localStorage.setItem('last_active_time', new Date())
  }

  // const onAction = () => {
  //   setCount(count + 1)
  // }
  useIdleTimer({
    onIdle,
    onActive,
    // onAction,
    timeout: (Number(process.env.REACT_APP_IDLETIME_IN_MINS) || 1) * 60 * 1000,
    throttle: 500,
  })
  return userRole() === pathTo ? (
    <Outlet />
  ) : isAuthenticated() ? (
    <ErrorPage status={403} />
  ) : (
    <Navigate to={pathTo ? '/admin/sign-in' : '/'} />
  )
}

export default PrivateRoute
