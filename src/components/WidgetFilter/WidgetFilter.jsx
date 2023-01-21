import { DatePicker, Radio } from 'antd'
import React, { useState } from 'react'

import classes from './WidgetFilter.module.scss'

const WidgetFilter = () => {
  const [filterBy, SetFilterBy] = useState('')

  const filterByChange = (e) => {
    SetFilterBy(e.target.value)
  }
  return (
    <div className={classes.WidgetFilter}>
      <Radio.Group
        value={filterBy}
        onChange={filterByChange}
        className={classes.WidgetFilter__btn}
      >
        <Radio.Button value="12">12 months</Radio.Button>
        <Radio.Button value="30">30 days</Radio.Button>
        <Radio.Button value="7">7 days</Radio.Button>
        <Radio.Button value="24">24 hours</Radio.Button>
      </Radio.Group>

      <DatePicker />
    </div>
  )
}

export default WidgetFilter
