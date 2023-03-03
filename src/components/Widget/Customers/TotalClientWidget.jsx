import { BsDot } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import React from 'react'
import { Spin } from 'antd'
import classes from './CustomersWidget.module.scss'

const TotalClientWidget = ({
  title,
  count,
  duration,
  Icon,
  linkTo = '#',
  loading,
}) => {
  return (
    <div
      className={`${classes.CustomersWidget} ${
        Icon ? classes.AddedUserWidget : classes.TotalClientWidget
      }`}
    >
      <h3 className={classes.CustomersWidget__title}>{title}</h3>
      <h3 className={classes.CustomersWidget__duration}>{duration}</h3>
      <div className={classes.CustomersWidget__bottom}>
        <h1 className={classes.CustomersWidget__count}>
          {Icon && <Icon />}
          {loading ? <Spin /> : count}
        </h1>
        {Icon ? (
          <Link to={linkTo} className={classes.CustomersWidget__btn}>
            <BsDot size={20} /> {Icon ? 'Add User' : 'Add Client'}
          </Link>
        ) : null}
      </div>
    </div>
  )
}

export default TotalClientWidget
