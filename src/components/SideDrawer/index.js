import { Divider, Menu } from 'antd'
import React, { Suspense, useState } from 'react'

import { CloseOutlined } from '@ant-design/icons'
import Footer from '../SideBar/Footer/Footer'
import SwitchAccount from '../SwitchAccount/SwitchAccount'
import classes from './SideDrawer.module.scss'
import { getUserFullName } from '../../utils/helpers'
import styles from '../SideBar/Sidebar.module.scss'

const SideDrawer = ({
  isAdmin,
  show,
  toggle,
  menuItems,
  bottomItems,
  auth,
}) => {
  const [showSwitchAccount, setShowSwitchAccount] = useState(false)

  const toggleActivateShsModal = () => {
    setShowSwitchAccount(!showSwitchAccount)
  }

  return (
    <div
      className={`${classes.SideDrawer} ${isAdmin && classes.AdminSideDrawer} ${
        show ? classes.SideDrawerOpen : classes.SideDrawerClose
      }`}
    >
      <div className={classes.SideDrawer__closeIcon}>
        <CloseOutlined onClick={toggle} />
      </div>
      <Menu
        className={styles.SidebarMenu}
        theme="light"
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{
          flex: 1,
          marginTop: '24px',
          backgroundColor: isAdmin ? '#294620' : '',
          color: isAdmin ? '#fff' : '',
        }}
        items={menuItems}
      />
      <div>
        <Menu
          className={styles.SidebarMenu}
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={bottomItems}
          style={{
            backgroundColor: isAdmin ? '#294620' : '',
            color: isAdmin ? '#fff' : '',
          }}
        />
        <Divider />

        <Footer
          userName={getUserFullName()}
          toggleActivateShsModal={toggleActivateShsModal}
          isAdmin={isAdmin}
        />
      </div>

      <Suspense fallback={<h4>Loading...</h4>}>
        {showSwitchAccount ? (
          <SwitchAccount
            isOpen={showSwitchAccount}
            toggleModal={toggleActivateShsModal}
          />
        ) : null}
      </Suspense>
    </div>
  )
}

export default SideDrawer
