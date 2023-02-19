import { Layout, theme } from 'antd'
import { adminBottomItems, adminMenuItems } from '../../SideBar/menuitems'

import React from 'react'
import Sidebar from '../../SideBar/Sidebar'
import classes from '../PageLayout.module.scss'

const { Content } = Layout

const AdminPageLayout = ({ children }) => {
  return (
    <Layout hasSider>
      <Sidebar
        bgColor="#294620"
        color="#fff"
        menuItems={adminMenuItems}
        bottomItems={adminBottomItems}
        isAdmin={true}
      />
      <Layout className={classes.PageLayout}>
        <Content className={classes.PageLayout__content}>{children}</Content>
      </Layout>
    </Layout>
  )
}

export default AdminPageLayout
