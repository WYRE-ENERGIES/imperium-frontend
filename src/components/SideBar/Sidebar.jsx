import { BarChartOutlined, SettingOutlined } from '@ant-design/icons'
import { Divider, Layout, Menu } from 'antd'
import React from 'react'
import { HiOutlineSupport } from 'react-icons/hi'
import { Link } from 'react-router-dom'

import { ReactComponent as Logo } from '../../assets/logo.svg'
import Footer from './Footer/Footer'
import styles from './Sidebar.module.scss'

const { Sider } = Layout
const { Item } = Menu

const items = [{ icon: BarChartOutlined, title: 'Overview', linkTo: '/' }].map(
  (item, index) => (
    <Item
      key={String(index + 1)}
      icon={React.createElement(item.icon)}
      className={styles.SidebarMenuItem}
      style={{ paddingLeft: '12px' }}
    >
      <Link to={item.linkTo}>{item.title}</Link>
    </Item>
  ),
)

const bottomItems = [
  { icon: HiOutlineSupport, title: 'Support', linkTo: '#' },
  { icon: SettingOutlined, title: 'My Account', linkTo: '#' },
].map((item, index) => (
  <Item
    key={String(index + 1)}
    icon={React.createElement(item.icon)}
    className={styles.SidebarMenuItem}
    style={{ paddingLeft: '12px' }}
  >
    <Link to={item.linkTo}>{item.title}</Link>
  </Item>
))

const Sidebar = ({ bgColor }) => {
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
          defaultSelectedKeys={['1']}
          style={{ flex: 1, marginTop: '24px' }}
        >
          {items}
        </Menu>
        <div>
          <Menu theme="light" mode="inline" className={styles.SidebarMenu}>
            {bottomItems}
          </Menu>
          <Divider />
          <Footer userName="Emeka Isokun" />
        </div>
      </div>
    </Sider>
  )
}

export default Sidebar
