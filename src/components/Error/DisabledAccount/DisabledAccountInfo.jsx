import React from 'react'
import ErrorLayout from '../Layout/ErrorLayout'
import FormButton from '../../Auth/Forms/Widgets/FormButton'
import classes from './DisabledAccount.module.scss'
import { Link } from 'react-router-dom'
const DisabledAccountInfo = () => {
  return (
    <div>
      <ErrorLayout>
        <div className={classes.DisabledAccountInfo}>
          <div>
            <p className={classes.DisabledAccountInfo__Header}>
              Opps! something went wrong loading your account
            </p>
            <p className={classes.DisabledAccountInfo__Caption}>
              Your account has been deactivated because your payment due date
              has elapse. To activate your account, you need to make payment or
              contact support for more assistance.{' '}
            </p>

            <div className={classes.DisabledAccountInfo__Btn}>
              <Link to="/contact-error">
                <FormButton type={'submit'} action={'Contact Support'} />
              </Link>
            </div>
          </div>
        </div>
      </ErrorLayout>
    </div>
  )
}

export default DisabledAccountInfo
