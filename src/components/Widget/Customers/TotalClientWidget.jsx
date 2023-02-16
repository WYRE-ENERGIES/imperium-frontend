import { BsDot } from 'react-icons/bs'
import { Button } from 'antd'
import React from 'react'
import classes from './CustomersWidget.module.scss'

const TotalClientWidget = ({ title, count, duration, Icon }) => {
  return (
    <div
      className={`${classes.CustomersWidget} ${
        Icon ? classes.AddedUserWidget : classes.TotalClientWidget
      }`}
    >
      <h3 className={classes.CustomersWidget__title}>{title}</h3>
      <h1 className={classes.CustomersWidget__count}>
        {Icon && <Icon />}
        {count}
      </h1>
      <h3 className={classes.CustomersWidget__duration}>{duration}</h3>
      <Button className={classes.CustomersWidget__btn}>
        <BsDot size={20} /> {Icon ? 'Add User' : 'Add Client'}
      </Button>
    </div>
  )
}

export default TotalClientWidget
