import { Layout, theme } from 'antd'
import { userBottomItems, userMenuItems } from '../SideBar/menuitems'

import React from 'react'
import Sidebar from '../SideBar/Sidebar'
import classes from './PageLayout.module.scss'

const { Content } = Layout

const PageLayout = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout hasSider>
      <Sidebar
        bgColor={colorBgContainer}
        menuItems={userMenuItems}
        bottomItems={userBottomItems}
      />
      <Layout className={classes.PageLayout}>
        <Content className={classes.PageLayout__content}>{children}</Content>
      </Layout>
    </Layout>
  )
}

export default PageLayout
