import {
  BarChartOutlined,
  SettingOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import { BsBattery, BsSunset } from 'react-icons/bs'
import { Divider, Layout, Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'

import Footer from './Footer/Footer'
import { HiOutlineSupport } from 'react-icons/hi'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import React from 'react'
import styles from './Sidebar.module.scss'

const { Sider } = Layout

const items = [
  { icon: BarChartOutlined, title: 'Overview', linkTo: '/overview' },
  {
    icon: ThunderboltOutlined,
    title: 'Energy Analytic',
    linkTo: '/energy-analytic',
  },
  {
    icon: BsSunset,
    title: 'Panel Analytic',
    linkTo: '/panel-analytic',
  },
  {
    icon: BsBattery,
    title: 'Battery',
    linkTo: '/battery',
  },
].map((item) => ({
  key: `${item.linkTo}`,
  icon: React.createElement(item.icon),
  className: styles.SidebarMenuItem,
  label: <Link to={item.linkTo}>{item.title}</Link>,
}))

const bottomItems = [
  { icon: HiOutlineSupport, title: 'Support', linkTo: '/support' },
  { icon: SettingOutlined, title: 'My Account', linkTo: '#' },
].map((item) => ({
  key: `${item.linkTo}`,
  icon: React.createElement(item.icon),
  label: <Link to={item.linkTo}>{item.title}</Link>,
}))

const Sidebar = ({ bgColor }) => {
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
      }}
      width="280px"
    >
      <div
        style={{
          height: 'inherit',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Logo style={{ marginLeft: '4px' }} />
        <Menu
          className={styles.SidebarMenu}
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          style={{ flex: 1, marginTop: '24px' }}
          items={items}
        />
        <div>
          <Menu
            className={styles.SidebarMenu}
            theme="light"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={bottomItems}
          />
          <Divider />
          <Footer userName="Emeka Isokun" />
        </div>
      </div>
    </Sider>
  )
}

export default Sidebar
