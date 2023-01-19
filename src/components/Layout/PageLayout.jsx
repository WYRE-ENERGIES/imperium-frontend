import { Layout, theme } from 'antd'

import React from 'react'
import Sidebar from '../SideBar/Sidebar'

const { Content } = Layout

const PageLayout = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout hasSider>
      <Sidebar bgColor={colorBgContainer} />
      <Layout
        className="site-layout"
        style={{
          marginLeft: 280,
          backgroundColor: '#FCFCFD',
        }}
      >
        <Content
          style={{
            margin: '24px 16px',
            overflow: 'initial',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default PageLayout
