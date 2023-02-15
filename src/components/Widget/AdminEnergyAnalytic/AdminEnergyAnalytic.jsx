import React from 'react'
import { RxBarChart } from 'react-icons/rx'
import classes from './AdminEnergyAnalytic.module.scss'

const AdminEnergyAnalytic = ({
  Icon,
  title,
  value,
  valueCurrency,
  duration,
  graphColor,
}) => {
  return (
    <div className={classes.AdminEnergyAnalytic}>
      <h1 className={classes.AdminEnergyAnalytic__title}>{title}</h1>
      <div className={classes.AdminEnergyAnalytic__wrapper}>
        <div className={classes.AdminEnergyAnalytic__innerWrapper}>
          <h1 className={classes.AdminEnergyAnalytic__h1}>
            {value}
            {valueCurrency && <span>{valueCurrency}</span>}
          </h1>
          <h4 className={classes.AdminEnergyAnalytic__duration}>
            <Icon style={{ color: '#497A38', marginRight: '8px' }} size={20} />
            {duration}
          </h4>
        </div>
        {graphColor && <RxBarChart size={50} style={{ color: graphColor }} />}
      </div>
    </div>
  )
}

export default AdminEnergyAnalytic
