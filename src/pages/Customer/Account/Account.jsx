import AccountInfo from './AccountProfile'
import { NavLink } from 'react-router-dom'

import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import PageLayout from '../../../components/Layout/PageLayout'
import { React } from 'react'
import classes from './Account.module.scss'
import FormButton from '../../../components/Auth/Forms/Widgets/FormButton'
import { Row, Form, Col } from 'antd'

const Account = ({ children, type, content }) => {
  const userAccountLink = [
    {
      page: 'Detail',
      link: '/account/details',
    },
    {
      page: 'Password',
      link: '/account/password',
    },
    {
      page: 'Business',
      link: '/account/business',
    },
  ]

  return (
    <div className={classes.Account}>
      <PageLayout>
        <PageBreadcrumb title="My Account" items={['My Account']} />
        <div className={classes.Account__NavBar}>
          {userAccountLink.map((display, index) => (
            <div key={index}>
              <NavLink
                to={display.link}
                className={classes.Account__NavLinks}
                style={({ isActive }) => ({
                  color: isActive ? '#18181b' : '#737373',
                  borderBottom: isActive ? '3px solid #5c9d48' : 'white',
                })}
              >
                {display.page}
              </NavLink>
            </div>
          ))}
        </div>
        <div>
          <AccountInfo type={type} content={content} />
        </div>
        {children}
      </PageLayout>
    </div>
  )
}

export default Account
