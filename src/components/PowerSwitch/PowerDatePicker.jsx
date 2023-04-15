import { DatePicker, Space } from 'antd'
import React from 'react'
import classes from './PowerSwitch.module.scss'
const PowerDatePicker = ({ handleScheduleTime }) => {
  const date = new Date()

  return (
    <Space
      direction="vertical"
      size={5}
      className={classes.PowerSwitch__datePicker}
    >
      <DatePicker
        showTime={{
          format: 'hh:mm',
          showNow: true,
        }}
        format="DD-MM-YYYY HH:mm"
        onOk={handleScheduleTime}
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
            <div className={classes.PowerSwitch__Date} style={style}>
              <span>{current.date()}</span>
            </div>
          )
        }}
      />
    </Space>
  )
}

export default PowerDatePicker
