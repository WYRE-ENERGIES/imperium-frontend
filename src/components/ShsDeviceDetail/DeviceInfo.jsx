import { Divider } from 'antd'
import React from 'react'
import classes from './Shs.module.scss'

const DeviceInfo = ({ data }) => {
  return (
    <div className={classes.Shs__DeviceInfo}>
      <div>
        {' '}
        <h1>Device Details </h1>
      </div>
      <div>
        <div>
          <p>Device Name</p>

          <p>{data?.device_name}</p>
        </div>
        <Divider />
        <div>
          <p>Device address</p>
          <p>{data?.device_address} </p>
        </div>
        <Divider />
        <div>
          <p>G.P.S address</p>
          <p>{data?.gps_address}</p>
        </div>
        <Divider />
        <div className={classes.Shs__Gps}>
          <div>
            <p>Latitude</p>
            <p>{data?.latitude}</p>
          </div>
          <div>
            <p>Longitude</p>
            <p>{data?.longitude}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeviceInfo
