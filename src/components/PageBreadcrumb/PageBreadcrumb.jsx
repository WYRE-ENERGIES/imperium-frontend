import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import React from 'react'
import { RiHome6Line } from 'react-icons/ri'
import classes from './PageBreadcrumb.module.scss'

const PageBreadcrumb = ({ title, items }) => {
  const breadcrumbItems = items?.map((item, index) => (
    <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
  ))

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
        {breadcrumbItems}
      </Breadcrumb>
    </div>
  )
}

export default PageBreadcrumb
