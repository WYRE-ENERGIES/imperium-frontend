import { BsBattery } from 'react-icons/bs'
import React from 'react'
import { Tag } from 'antd'
import classes from './Widget.module.scss'

const Widget = ({
  Icon,
  title,
  range,
  value,
  valueCurrency,
  valuePercentage,
  style,
}) => {
  return (
    <div className={classes.Widget} style={style}>
      <Icon />
      <div className={classes.Widget__data}>
        <h1 className={classes.Widget__title}>{title}</h1>
        <h4 type="secondary" className={classes.Widget__subtitle}>
          {range}
        </h4>
        <div className={classes.Widget__valueSection}>
          <h1 className={classes.Widget__value}>
            {value} <span>{valueCurrency}</span>
          </h1>
          {valuePercentage ? (
            <Tag
              key={value}
              style={{
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 'fit-content',
                color: '#027A48',
                backgroundColor: '#ECFDF3',
                height: '22px',
                marginTop: '10px',
              }}
            >
              <BsBattery style={{ marginRight: '5px' }} />{' '}
              {`${valuePercentage}%`}
            </Tag>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}

export default Widget
