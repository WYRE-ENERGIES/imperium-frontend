import { Layout, theme } from 'antd'

import React from 'react'
import Sidebar from '../SideBar/Sidebar'
import classes from './PageLayout.module.scss'
import { userMenuItems } from '../SideBar/menuitems'

const { Content } = Layout

const PageLayout = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout hasSider>
      <Sidebar bgColor={colorBgContainer} menuItems={userMenuItems} />
      <Layout className={classes.PageLayout}>
        <Content className={classes.PageLayout__content}>{children}</Content>
      </Layout>
    </Layout>
  )
}

export default PageLayout
