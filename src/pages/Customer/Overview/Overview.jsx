import InstructionModal from './InstructionModal/InstructionModal'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import PageLayout from '../../../components/Layout/PageLayout'
import React from 'react'
import classes from './Overview.module.scss'
import { theme } from 'antd'

const Overview = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <PageLayout>
      <div style={{ backgroundColor: colorBgContainer }}>Overview Page</div>
      <InstructionModal />
    </PageLayout>
  )
}

export default Overview
