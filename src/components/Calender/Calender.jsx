import { DatePicker, Space } from 'antd'
import React from 'react'
import classes from './Calender.module.scss'
const date = new Date()
const dateTimeOption = {
  timeZone: 'Africa/Accra',
  hour12: true,
  hour: 'numeric',
  minute: 'numeric',
  seconds: 'numeric',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}
const Calender = (action) => {
  return (
    <Space
      direction="vertical"
      size={5}
      className={classes.Calender__datePicker}
    >
      <DatePicker
        showTime={{
          format: 'hh:mm',
          showNow: true,
        }}
        format="DD-MM-YYYY HH:mm"
        onOk={action}
        disabledDate={(current) => {
          return current.isBefore(date)
        }}
        dateRender={(current) => {
          const style = {
            height: '100%',
            width: '100%',
            padding: '5px',
          }
          if (current.isSame(date, 'day')) {
            style.color = 'white'
            style.background = '#385E2B'
            style.border = '1px solid #385E2B'
            style.borderRadius = '50%'
          }
          return (
            <div className={classes.Calender__Date} style={style}>
              <span>{current.date()}</span>
            </div>
          )
        }}
      />
    </Space>
  )
}

export default Calender
