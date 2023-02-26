import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import classes from './Widget.module.scss'

const FormButton = ({ action, isLoading }) => {
  const loadingIcon = (
    <LoadingOutlined
      style={{ fontSize: 24, marginRight: 10, color: 'white' }}
    />
  )
  return (
    <div className={classes.Button}>
      <button type="submit" disabled={isLoading}>
        <span>
          {isLoading && <Spin indicator={loadingIcon} />}
          <small>{action}</small>
        </span>
      </button>
    </div>
  )
}

export default FormButton
