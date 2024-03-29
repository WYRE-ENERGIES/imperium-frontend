import { Layout, theme } from 'antd'
import React, { useState } from 'react'
import {
  userBottomItems,
  userMenuItems,
  unverifiedUserMenuItems,
} from '../SideBar/menuitems'

import BackDrop from './BackDrop'
import Header from './Header'
import SideDrawer from '../SideDrawer'
import Sidebar from '../SideBar/Sidebar'
import classes from './PageLayout.module.scss'
import { getItemFromLocalStorage } from '../../utils/helpers'

const { Content } = Layout

const PageLayout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false)
  const toggleSidebar = () => setShowSidebar(!showSidebar)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const currentClient = getItemFromLocalStorage('current_client')

  return (
    <Layout hasSider>
      <Sidebar
        bgColor={colorBgContainer}
        menuItems={!currentClient ? unverifiedUserMenuItems : userMenuItems}
        bottomItems={userBottomItems}
      />
      <Layout className={classes.PageLayout}>
        <Header toggle={toggleSidebar} />
        <BackDrop show={showSidebar} />
        <SideDrawer
          show={showSidebar}
          toggle={toggleSidebar}
          menuItems={!currentClient ? unverifiedUserMenuItems : userMenuItems}
          bottomItems={userBottomItems}
        />
        <Content className={classes.PageLayout__content}>{children}</Content>
      </Layout>
    </Layout>
  )
}

export default PageLayout
