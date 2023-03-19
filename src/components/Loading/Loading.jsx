import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import classes from './Loading.module.scss'
const Loading = ({ data }) => {
  const loadingIcon = (
    <LoadingOutlined
      style={{ fontSize: 24, marginRight: 10, color: '#66ab4f' }}
    />
  )
  return (
    <section className={classes.Loading}>
      <div>
        <Spin indicator={loadingIcon} /> <span>Loading {data}</span>
      </div>
    </section>
  )
}

export default Loading
