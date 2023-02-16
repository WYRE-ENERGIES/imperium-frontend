import { Divider, Layout, Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'

import Footer from './Footer/Footer'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import React from 'react'
import styles from './Sidebar.module.scss'

const { Sider } = Layout

const Sidebar = ({ bgColor, color, menuItems, bottomItems }) => {
  const location = useLocation()

  return (
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        background: bgColor,
        borderRight: '1px solid #C4C4C4',
        padding: '32px 16px',
        color: color,
      }}
      width="280px"
      className={styles.Sidebar}
    >
      <div
        style={{
          height: 'inherit',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Link to="/">
          <Logo style={{ marginLeft: '4px' }} />
        </Link>
        <Menu
          className={styles.SidebarMenu}
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          style={{
            flex: 1,
            marginTop: '24px',
            backgroundColor: bgColor,
            color: color,
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
            style={{ backgroundColor: bgColor, color: color }}
          />
          <Divider />
          <Footer userName="Emeka Isokun" />
        </div>
      </div>
    </Sider>
  )
}

export default Sidebar
