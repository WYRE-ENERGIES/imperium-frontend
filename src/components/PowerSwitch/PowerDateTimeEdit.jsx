import React from 'react'
import classes from './PowerSwitch.module.scss'
import { Divider } from 'antd'
const PowerDateTimeEdit = ({
  scheduledTime,
  setIsModalOpen,
  setScheduledTime,
}) => {
  return (
    <div>
      <p
        style={{
          width: '280px',
          textAlign: 'center',
          paddingTop: '10px',
          color: '#606062',
          fontSize: '15px',
        }}
      >
        Would you like to edit the scheduled time created for{' '}
        <strong>{scheduledTime}</strong>{' '}
      </p>
      <Divider />
      <div className={classes.PowerSwitch__EditShutDown}>
        <button
          onClick={() => setIsModalOpen(false)}
          style={{
            width: '134px',
            height: '40px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #C4C4C4',
            boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
            borderRadius: ' 8px',
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => setScheduledTime('')}
          style={{
            width: '134px',
            height: '40px',
            backgroundColor: '#385E2B',
            border: '1px solid #C4C4C4',
            boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
            borderRadius: ' 8px',
            color: 'white',
          }}
        >
          Edit
        </button>
      </div>
    </div>
  )
}

export default PowerDateTimeEdit
