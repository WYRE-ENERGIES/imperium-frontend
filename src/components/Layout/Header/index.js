import { ReactComponent as AdminLogo } from '../../../assets/Auth/adminlogo.svg'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../../assets/logo-sm.svg'
import { MenuOutlined } from '@ant-design/icons'
import React from 'react'
import classes from './Header.module.scss'
import { getItemFromLocalStorage } from '../../../utils/helpers'

const redirectTo = (isAdmin, token) => {
  let path = '/'
  if (token) {
    path = isAdmin ? '/admin/overview' : '/overview'
  } else {
    path = isAdmin ? '/admin' : '/'
  }
  return path
}

const Header = ({ isAdmin, toggle }) => {
  const accessToken = getItemFromLocalStorage('access')
  return (
    <header className={`${classes.Header} ${isAdmin && classes.AdminHeader}`}>
      <Link to={redirectTo(isAdmin, accessToken)}>
        {isAdmin ? (
          <AdminLogo
            style={{
              width: '40px',
              height: '40px',
            }}
          />
        ) : (
          <Logo style={{ width: '40px', height: '40px' }} />
        )}
      </Link>
      <MenuOutlined onClick={toggle} style={{ color: isAdmin ? '#fff' : '' }} />
    </header>
  )
}

export default Header
