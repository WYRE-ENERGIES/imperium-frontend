import { Link } from 'react-router-dom'
import { React } from 'react'
import classes from './Widget.module.scss'

const FormFooter = ({ footer, action, footerlink, extra }) => {
  return (
    <div className={classes.FormFooter}>
      {extra && extra}
      <div className={classes.FormFooter__OptAuth}>
        {' '}
        {footerlink && (
          <div className={classes.FormFooter__content}>
            <p>
              <Link>Continue with SAML SSO</Link>
            </p>
            <p className={classes.FormFooter__AuthOpt}>
              {footer}
              <Link to={footerlink}>{action}</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default FormFooter
