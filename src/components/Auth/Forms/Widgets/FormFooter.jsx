import { Link } from 'react-router-dom'
import { React } from 'react'
import classes from './Widget.module.scss'

const FormFooter = ({ footer, action, footerlink }) => {
  return (
    <div className={classes.FormFooter}>
      <div className={classes.FormFooter__content}>
        <p>
          <Link>Continue with SAML SSO</Link>
        </p>
        <p className={classes.FormFooter__AuthOpt}>
          {footer}
          <Link to={footerlink}>{action}</Link>
        </p>
      </div>
    </div>
  )
}

export default FormFooter
