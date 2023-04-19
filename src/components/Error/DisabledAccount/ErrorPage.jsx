import React from 'react'
import ErrorLayout from '../Layout/ErrorLayout'
import FormButton from '../../Auth/Forms/Widgets/FormButton'
import classes from './ErrorPage.module.scss'
import { useNavigate } from 'react-router-dom'
import {
  emptyLocalStorage,
  getItemFromLocalStorage,
} from '../../../utils/helpers'
const DisabledAccountInfo = ({ status }) => {
  const navigate = useNavigate()
  const user_role = getItemFromLocalStorage('user_role')
  const navigateTo = user_role === 'admin' ? '/' : '/admin/sign-in'

  const handleOnClick = () => {
    if (user_role) {
      emptyLocalStorage()
      navigate(navigateTo)
    } else {
      navigate('/contact-error')
    }
  }
  const ERRORS = [
    {
      error:
        "We couldn't find what you were looking for. Please try again or contact us for assistance.",
      status: 404,
      header: 'Page Not Found',
      message: 'Oops! This page could not be found.',
    },
    {
      error: 'You do not have the necessary permissions to view this content.',
      status: 403,
      header: 'Access Denied',
      message: 'You do not have permission to view this page.',
    },
  ]
  return (
    <div>
      <ErrorLayout width={'300px'} status={status}>
        <div className={classes.DisabledAccountInfo}>
          {ERRORS.map((error, key) =>
            error.status === status ? (
              <div key={key}>
                <p className={classes.DisabledAccountInfo__Header}>
                  {error?.message}
                </p>
                <p className={classes.DisabledAccountInfo__Caption}>
                  {error?.error}
                </p>

                <div
                  onClick={handleOnClick}
                  className={classes.DisabledAccountInfo__Btn}
                >
                  <FormButton
                    type={'submit'}
                    action={
                      error.status === 403 ? 'Sign In' : 'Contact Support'
                    }
                  />
                </div>
              </div>
            ) : (
              ''
            ),
          )}
        </div>
      </ErrorLayout>
    </div>
  )
}

export default DisabledAccountInfo
