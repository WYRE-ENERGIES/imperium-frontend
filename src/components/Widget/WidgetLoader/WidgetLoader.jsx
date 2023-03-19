import React from 'react'
import { Spin } from 'antd'

const WidgetLoader = () => {
  return (
    <div
      style={{
        width: 'inherit',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Spin />
    </div>
  )
}

export default WidgetLoader
