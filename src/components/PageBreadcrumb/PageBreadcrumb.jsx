import { Breadcrumb } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import React from 'react'
import { RiHome6Line } from 'react-icons/ri'
import classes from './PageBreadcrumb.module.scss'

const PageBreadcrumb = ({ title, items }) => {
  const location = useLocation()

  const path = location.pathname.split('/')
  const redirectTo = path.includes('admin') ? '/admin/overview' : '/overview'

  const breadcrumbItems = items?.map((item, index) => (
    <Breadcrumb.Item key={`${item}-${index}`}>{item}</Breadcrumb.Item>
  ))

  return (
    <div className={classes.PageBreadcrumb}>
      <h1 className={classes.PageBreadcrumb__title}>{title}</h1>
      <Breadcrumb className={classes.PageBreadcrumb__breadcrumb}>
        <Breadcrumb.Item>
          <Link to={redirectTo}>
            <RiHome6Line style={{ marginTop: 3 }} />
          </Link>
        </Breadcrumb.Item>
        {breadcrumbItems}
      </Breadcrumb>
    </div>
  )
}

export default PageBreadcrumb
