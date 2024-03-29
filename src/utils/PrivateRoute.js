import { Navigate, Outlet, useNavigate } from 'react-router-dom'

import React, { useEffect } from 'react'
import { isAuthenticated, userRole } from './helpers'
import ErrorPage from '../components/Error/DisabledAccount/ErrorPage'
import { useIdleTimer } from 'react-idle-timer'
import { useDispatch } from 'react-redux'
import { logOutUser } from '../features/slices/auth/authSlice'

const DEFAULT_TIMER = 10

const PrivateRoute = ({ pathTo, isAdmin }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onLogout = () => {
    const getAdmin = localStorage.getItem('user_role')
    const navigateTo = getAdmin === '"admin"' ? '/admin/sign-in' : '/'
    dispatch(logOutUser())
    navigate(navigateTo)
  }
  const onIdle = () => {
    onLogout()
  }

  const onActive = () => {
    const getRole = localStorage.getItem('user_role')
    const rolesOfUser = getRole === '"admin"' ? 'admin' : 'client'

    // if last active time is greater than current time, log user our
    const getLastActiveDate = localStorage.getItem(
      `${rolesOfUser}last_active_time`,
    )

    if (getLastActiveDate) {
      // checking if current date is greater than last active date
      const lastActiveInDate = new Date(getLastActiveDate)
      const IDLETIME_IN_MINS =
        (Number(process.env.REACT_APP_IDLETIME_IN_MINS) || DEFAULT_TIMER) *
        60 *
        1000
      var duration = Date.now() - lastActiveInDate
      if (duration > IDLETIME_IN_MINS) {
        onLogout()
      }
    }
    localStorage.setItem(`${rolesOfUser}last_active_time`, new Date())
  }

  useEffect(() => {
    onActive()
  }, [])

  useIdleTimer({
    onIdle,
    onActive,
    timeout:
      (Number(process.env.REACT_APP_IDLETIME_IN_MINS) || DEFAULT_TIMER) *
      60 *
      1000,
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
