import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import { Breadcrumb } from 'antd'
import React from 'react'
import { RiHome6Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'

import classes from './PageBreadcrumb.module.scss'

const PageBreadcrumb = ({ title }) => {
  return (
    <div className={classes.PageBreadcrumb}>
      <h1 className={classes.PageBreadcrumb__title}>{title}</h1>
      <Breadcrumb className={classes.PageBreadcrumb__breadcrumb}>
        <Breadcrumb.Item>
          <Link to="/">
            <RiHome6Line style={{ marginTop: 3 }} />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{title}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  )
}

export default PageBreadcrumb
