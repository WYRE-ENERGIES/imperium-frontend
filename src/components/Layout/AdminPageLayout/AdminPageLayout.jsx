import { Layout, theme } from 'antd'

import React from 'react'
import Sidebar from '../../SideBar/Sidebar'
import { adminMenuItems } from '../../SideBar/menuitems'
import classes from '../PageLayout.module.scss'

const { Content } = Layout

const AdminPageLayout = ({ children }) => {
  return (
    <Layout hasSider>
      <Sidebar bgColor="#294620" color="#fff" menuItems={adminMenuItems} />
      <Layout className={classes.PageLayout}>
        <Content className={classes.PageLayout__content}>{children}</Content>
      </Layout>
    </Layout>
  )
}

export default AdminPageLayout
