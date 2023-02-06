import { DatePicker, Radio, Select } from 'antd'
import React, { useState } from 'react'

import DropDownFilter from '../DropDownFilter/DropDownFilter'
import classes from './WidgetFilter.module.scss'

const { Option } = Select
const { Group, Button } = Radio

const optionData = [
  { name: '12 months', value: '12' },
  { name: '30 days', value: '30' },
  { name: '7 days', value: '7' },
  { name: '24 days', value: '24' },
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

const WidgetFilter = () => {
  const [filterBy, SetFilterBy] = useState('')

  const filterByChange = (e) => {
    SetFilterBy(e.target.value)
  }
  return (
    <div className={classes.WidgetFilter}>
      <div className={classes.WidgetFilter__btnSection}>
        <Group
          value={filterBy}
          onChange={filterByChange}
          className={classes.WidgetFilter__btn}
        >
          {radioButtonOptions}
        </Group>
      </div>

      <div className={classes.WidgetFilter__btnSectionMobile}>
        <DropDownFilter options={options} />
      </div>

      <DatePicker />
    </div>
  )
}

export default WidgetFilter
