import { theme } from 'antd'
import React from 'react'

import PageLayout from '../../../components/Layout/PageLayout'
import InstructionModal from './InstructionModal/InstructionModal'

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
