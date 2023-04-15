import React, { useState, useEffect } from 'react'
import { useAdminShsPowerScheduleMutation } from '../../features/slices/shs/admin/adminShsSlice'
import { Modal, notification } from 'antd'
import { useCustomerShsPowerScheduleMutation } from '../../features/slices/shs/customer/customerShsSlice'
import { getItemFromLocalStorage } from '../../utils/helpers'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'
import Error from '../ErrorMessage/Error'
import classes from './PowerSwitch.module.scss'
import cautionIcon from '../../../src/assets/widget-icons/caution.svg'
import scheduleIcon from '../../../src/assets/widget-icons/scheduleIcon.svg'

const PowerButton = ({
  action,
  color,
  device,
  time,
  user,
  shsPowerSchedule,
  setShsPowerSchedule,
}) => {
  const openNotification = (date, action) => {
    notification.success({
      message: 'Shs Power Schedule',
      description: `Scheduled for power ${action} at ${date}`,
    })
  }

  const client_id = getItemFromLocalStorage('current_client')
  const [powerBtnModalOpen, setPowerBtnModalOpen] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [selectedDate, setSelectedDate] = useState(false)
  const [deviceId, setDeviceId] = useState('')
  const [adminShsPowerSchedule, { isLoading: isLoadingAdminData }] =
    useAdminShsPowerScheduleMutation()
  const [customerShsPowerSchedule, { isLoading: isLoadingCustomerData }] =
    useCustomerShsPowerScheduleMutation()
  const showPowerModal = () => {
    setPowerBtnModalOpen(true)
  }

  const handlePowerOption = async (action) => {
    if (user === 'client') {
      try {
        await customerShsPowerSchedule({
          shsPowerSchedule,
          deviceId,
          client_id,
        }).unwrap()
        setPowerBtnModalOpen(false)
        openNotification(selectedDate, action)
      } catch (error) {
        setErrMsg(ErrorMessage(error))
      }
    } else {
      try {
        await adminShsPowerSchedule({ shsPowerSchedule, deviceId }).unwrap()
        setPowerBtnModalOpen(false)
        openNotification(selectedDate, action)
      } catch (error) {
        setErrMsg(ErrorMessage(error))
      }
    }
  }
  const handleCancel = () => {
    setPowerBtnModalOpen(false)
  }

  const actionColor = action === 'off' ? '#B42318' : '#027A48'
  const actionIcon = action === 'off' ? cautionIcon : scheduleIcon
  useEffect(() => {
    setDeviceId(device)
    setSelectedDate(time)
    setShsPowerSchedule({ ...shsPowerSchedule, schedule_type: action })
  }, [device, time])

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
            <span style={{ color: actionColor }}>power {action}</span> at {time}
          </p>
          <div className={classes.PowerSwitch__Confirm}>
            <button onClick={handleCancel}>Cancel</button>
            <button
              onClick={() => {
                handlePowerOption(action)
              }}
            >
              Proceed
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default PowerButton
