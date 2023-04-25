import React, { useState } from 'react'

import CustomerLogo from '../../../../assets/Auth/Logo.svg'
import AdminLogo from '../../../../assets/Auth/admin.svg'
import { ReactComponent as MenuBar } from '../../../../assets/Auth/menubar.svg'
import { Link } from 'react-router-dom'
import SideDrawer from '../../../SideDrawer'
import {
  BarChartOutlined,
  CustomerServiceOutlined,
  LockOutlined,
  SettingOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from '@ant-design/icons'
import classes from './Widget.module.scss'

const FormNavbar = ({
  txtColor1 = '#385e2b',
  txtColor2 = 'white',
  btnColor1 = '#FFFF',
  btnColor2 = '#497a38',
}) => {
  const signUp = btnColor1 === '#FFFF' ? '/sign-up' : '/admin/sign-up'
  const signIn = btnColor1 === '#FFFF' ? '/' : '/admin/sign-ip'

  const [showSidebar, setShowSideBar] = useState(false)

  const sideBarDisplay = () => {
    setShowSideBar(!showSidebar)
  }
  const userUnauthorideSideBar = [
    { icon: LockOutlined, title: 'Sign In', linkTo: signIn },
    {
      icon: CustomerServiceOutlined,
      title: 'Contact Support',
      linkTo: '/contact-error',
    },
  ].map((item) => ({
    key: `${item.linkTo}`,
    icon: React.createElement(item.icon),
    label: <Link to={item.linkTo}>{item.title}</Link>,
  }))

  return (
    <div className={classes.Navbar}>
      <div className={classes.Navbar__element}>
        <div>
          <img src={btnColor1 === '#FFFF' ? CustomerLogo : AdminLogo} alt="" />
        </div>
        <div className={classes.Navbar__btn}>
          <Link style={{ background: btnColor1, color: txtColor1 }} to={signUp}>
            Sign Up
          </Link>
          <Link style={{ background: btnColor2, color: txtColor2 }} to={signIn}>
            Sign In
          </Link>
        </div>
        <div className={classes.Navbar__Menubtn}>
          {' '}
          <MenuBar onClick={sideBarDisplay} />
          <SideDrawer
            show={showSidebar}
            toggle={sideBarDisplay}
            menuItems={userUnauthorideSideBar}
            auth={false}
          />
        </div>
      </div>
    </div>
  )
}

export default FormNavbar
