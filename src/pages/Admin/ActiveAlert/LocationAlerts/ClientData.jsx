import React from 'react'
import classes from './LocationAlerts.module.scss'
const ClientData = ({ data }) => {
  return (
    <section className={classes.ClientData}>
      <div className={classes.ClientData__ActiveAlertClient}>
        <div className={classes.ClientData__ModalContentInit}>
          <div>
            <span>{data?.client_name[0]}</span>
            <span>{data?.client_name[0]}</span>
          </div>
        </div>
        <div>
          <p>{data?.client_name}</p>
          <span>{data?.client_email}</span>
        </div>
      </div>
    </section>
  )
}

export default ClientData
