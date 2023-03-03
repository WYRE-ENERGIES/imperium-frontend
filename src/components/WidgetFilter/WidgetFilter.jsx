import { DatePicker, Radio, Select } from 'antd'
import React, { useState } from 'react'

import { CloudDownloadOutlined } from '@ant-design/icons'
import DropDownFilter from '../DropDownFilter/DropDownFilter'
import classes from './WidgetFilter.module.scss'

const { Option } = Select
const { Group, Button } = Radio

const optionData = [
  { name: '12 months', value: 'yearly' },
  { name: '30 days', value: 'monthly' },
  { name: '7 days', value: 'weekly' },
  { name: '24 hours', value: 'daily' },
]

const options = optionData.map((option, index) => (
  <Option key={index} value={option.value}>
    {option.name}
  </Option>
))

const radioButtonOptions = optionData.map((option, index) => (
  <Button key={index} value={option.value}>
    {option.name}
  </Button>
))

const WidgetFilter = ({
  hasExportButton = false,
  selectFilterBy,
  filterBy,
}) => {
  return (
    <div className={classes.WidgetFilter}>
      <div className={classes.WidgetFilter__btnSection}>
        <Group
          value={filterBy}
          onChange={(e) => selectFilterBy(e.target.value)}
          className={classes.WidgetFilter__btn}
        >
          {radioButtonOptions}
        </Group>
      </div>

      <div className={classes.WidgetFilter__btnSectionMobile}>
        <DropDownFilter
          options={options}
          onFilterChanged={selectFilterBy}
          value={filterBy}
        />
      </div>

      <DatePicker />
    </div>
  )
}

export default WidgetFilter
