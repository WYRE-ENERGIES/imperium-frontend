import {
  BarChartOutlined,
  SettingOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { BsBattery, BsBell, BsSunset } from 'react-icons/bs'

import { FiUsers } from 'react-icons/fi'
import { HiOutlineSupport } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import React from 'react'
import styles from './Sidebar.module.scss'

export const userMenuItems = [
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
    title: 'Battery Analytic',
    linkTo: '/battery-analytic',
  },
  {
    icon: BsBell,
    title: 'Active Alerts',
    linkTo: '/active-alerts',
  },
  {
    icon: FiUsers,
    title: 'Users',
    linkTo: '/users',
  },
].map((item) => ({
  key: `${item.linkTo}`,
  icon: React.createElement(item.icon),
  className: styles.SidebarMenuItem,
  label: <Link to={item.linkTo}>{item.title}</Link>,
}))

export const adminMenuItems = [
  // { icon: BarChartOutlined, title: 'Overview', linkTo: '/admin/overview' },
  {
    icon: ThunderboltOutlined,
    title: 'Energy Analytic',
    linkTo: '/admin/energy-analytic',
  },
  {
    icon: BsSunset,
    title: 'Panel Analytic',
    linkTo: '/admin/panel-analytic',
  },
  {
    icon: BsBattery,
    title: 'Battery Analytic',
    linkTo: '/admin/battery-analytic',
  },
  // {
  //   icon: BsBell,
  //   title: 'Active Alerts',
  //   linkTo: '/admin/active-alerts',
  // },
  { icon: UserOutlined, title: 'Customers', linkTo: '/admin/customers' },
  {
    icon: FiUsers,
    title: 'Users',
    linkTo: '/admin/users',
  },
].map((item) => ({
  key: `${item.linkTo}`,
  icon: React.createElement(item.icon),
  className: styles.SidebarMenuItem,
  label: <Link to={item.linkTo}>{item.title}</Link>,
}))

export const userBottomItems = [
  { icon: HiOutlineSupport, title: 'Support', linkTo: '/support' },
  { icon: SettingOutlined, title: 'My Account', linkTo: '/account/details' },
].map((item) => ({
  key: `${item.linkTo}`,
  icon: React.createElement(item.icon),
  label: <Link to={item.linkTo}>{item.title}</Link>,
}))

export const adminBottomItems = [
  { icon: HiOutlineSupport, title: 'Support', linkTo: '/admin/support' },
  // {
  //   icon: SettingOutlined,
  //   title: 'My Account',
  //   linkTo: '/admin/account/details',
  // },
].map((item) => ({
  key: `${item.linkTo}`,
  icon: React.createElement(item.icon),
  label: <Link to={item.linkTo}>{item.title}</Link>,
}))
