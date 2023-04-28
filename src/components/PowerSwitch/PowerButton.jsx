import React, { useState, useEffect } from 'react'
import { useAdminShsPowerScheduleMutation } from '../../features/slices/shs/admin/adminShsSlice'
import { Modal, notification } from 'antd'
import { useCustomerShsPowerScheduleMutation } from '../../features/slices/shs/customer/customerShsSlice'
import { dateTimeConverter, getItemFromLocalStorage } from '../../utils/helpers'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'
import Error from '../ErrorMessage/Error'
import classes from './PowerSwitch.module.scss'
import cautionIcon from '../../../src/assets/widget-icons/caution.svg'
import scheduleIcon from '../../../src/assets/widget-icons/scheduleIcon.svg'

const PowerButton = ({
  action,
  color,
  device_id,
  scheduledTime,
  user,
  shsData,
  directPowerOption,
}) => {
  const actionColor = action === 'off' ? '#B42318' : '#027A48'
  const actionIcon = action === 'off' ? cautionIcon : scheduleIcon

  const dateTimeNow = new Date()
  const scheduleShsPowerToNow = dateTimeNow.toISOString()

  const client_id = getItemFromLocalStorage('current_client')
  const [powerBtnModalOpen, setPowerBtnModalOpen] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [deviceId, setDeviceId] = useState('')
  const [powerOption, setPowerOption] = useState(null)

  const [adminShsPowerSchedule, { data, isLoading: isLoadingAdminData }] =
    useAdminShsPowerScheduleMutation()
  const [customerShsPowerSchedule, { isLoading: isLoadingCustomerData }] =
    useCustomerShsPowerScheduleMutation()
  const showPowerModal = () => {
    setPowerBtnModalOpen(true)
  }
  const openNotification = (date, action) => {
    notification.success({
      message: 'Shs Power Schedule',
      description: `Scheduled for power ${action} at ${date}`,
    })
  }

  const handlePowerOption = async (action) => {
    const data = powerOption
      ? {
          ...shsData,
          schedule_type: action,
          scheduled_time: scheduleShsPowerToNow,
        }
      : { ...shsData, schedule_type: action }

    if (user === 'client') {
      try {
        await customerShsPowerSchedule({
          data,
          deviceId,
          client_id,
        }).unwrap()
        setPowerBtnModalOpen(false)
        openNotification(dateTimeConverter(data?.scheduled_time), action)
      } catch (error) {
        setErrMsg(ErrorMessage(error))
      }
    } else if (user === 'admin') {
      console.log(data)
      try {
        await adminShsPowerSchedule({ data, deviceId }).unwrap()
        setPowerBtnModalOpen(false)
        openNotification(dateTimeConverter(data?.scheduled_time), action)
      } catch (error) {
        setErrMsg(ErrorMessage(error))
      }
    }
  }
  const handleCancel = () => {
    setPowerBtnModalOpen(false)
  }

  useEffect(() => {
    setDeviceId(device_id)
    setPowerOption(directPowerOption)
  }, [directPowerOption])

  return (
    <div>
      <button
        style={{ color: color }}
        className={classes.PowerSwitch__OnAndOff}
        onClick={showPowerModal}
      >
        Power {action}
      </button>
      <Modal
        open={powerBtnModalOpen}
        onOk={() => {
          handlePowerOption('cancel')
        }}
        onCancel={handleCancel}
        className={classes.PowerSwitch__Modal}
        width={400}
        footer={null}
      >
        <div className={classes.PowerSwitch__ModalContent}>
          <img src={actionIcon} alt="" srcSet="" />
          <h1 style={{ color: actionColor }}>Power {action}</h1>
          <div style={{ textAlign: 'center' }}>
            {errMsg && <Error Errormsg={errMsg} />}
          </div>
          <p>
            If you proceed with this, the power supply in your house from
            Imperium Solar Housing System will{' '}
            <span style={{ color: actionColor }}>power {action}</span> at{' '}
            {directPowerOption ? dateTimeConverter(dateTimeNow) : scheduledTime}
          </p>
          <div className={classes.PowerSwitch__Confirm}>
            <button onClick={handleCancel}>Cancel</button>
            <button
              onClick={() => {
                handlePowerOption(action)
              }}
            >
              {isLoadingAdminData
                ? 'Loading...'
                : isLoadingCustomerData
                ? 'Loading...'
                : 'Proceed'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default PowerButton
