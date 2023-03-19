import { Layout, theme } from 'antd'
import React, { useState } from 'react'
import { adminBottomItems, adminMenuItems } from '../../SideBar/menuitems'

import BackDrop from '../BackDrop'
import Header from '../Header'
import SideDrawer from '../../SideDrawer'
import Sidebar from '../../SideBar/Sidebar'
import classes from '../PageLayout.module.scss'

const { Content } = Layout

const AdminPageLayout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false)
  const toggleSidebar = () => setShowSidebar(!showSidebar)

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
        <Header isAdmin={true} toggle={toggleSidebar} />
        <BackDrop show={showSidebar} />
        <SideDrawer
          show={showSidebar}
          toggle={toggleSidebar}
          isAdmin={true}
          menuItems={adminMenuItems}
          bottomItems={adminBottomItems}
        />
        <Content className={classes.PageLayout__content}>{children}</Content>
      </Layout>
    </Layout>
  )
}

export default AdminPageLayout
