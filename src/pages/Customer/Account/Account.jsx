import { React, useState } from 'react'
import { NavLink } from 'react-router-dom'
import PageLayout from '../../../components/Layout/PageLayout'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import AccountProfile from './AccountProfile'
import classes from './Account.module.scss'

const Account = ({ children, props }) => {
  const accountInfo = {
    firstName: 'John',
    lastName: 'Kahan',
    email: 'JonniKahan@gmail.com',
  }

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
        <PageBreadcrumb title="My Account" />
        <div className={classes.Account__NavBar}>
          {userAccountLink.map((display, index) => (
            <NavLink
              key={index}
              to={display.link}
              className={classes.Account__NavLinks}
              style={({ isActive }) => ({
                color: isActive ? '#18181b' : '#737373',
                borderBottom: isActive ? '3px solid #5c9d48' : 'white',
              })}
            >
              {display.page}
            </NavLink>
          ))}
        </div>
        <div>
          <AccountProfile accountInfo={accountInfo} type={props} />
        </div>
        {children}
      </PageLayout>
    </div>
  )
}

export default Account
