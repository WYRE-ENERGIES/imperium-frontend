import { React, useEffect, useRef, useState } from 'react'
import { BiPowerOff } from 'react-icons/bi'

import classes from './PowerSwitch.module.scss'
import { Dropdown, Modal, Space, notification, DatePicker, Divider } from 'antd'
import cautionIcon from '../../../src/assets/widget-icons/caution.svg'
import scheduleIcon from '../../../src/assets/widget-icons/scheduleIcon.svg'
import {
  useGetShsDetailsQuery,
  useShsPowerScheduleMutation,
} from '../../features/slices/shs/admin/adminShsSlice'
import { useCustomerShsPowerScheduleMutation } from '../../features/slices/shs/customer/customerShsSlice'
import { dateTimeConverter, getItemFromLocalStorage } from '../../utils/helpers'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'
import Error from '../ErrorMessage/Error'

const openNotification = (text, date, action) => {
  notification.success({
    message: 'Shs Power Schedule',
    description: `${text} ${action} at ${date}`,
  })
}

const date = new Date()
const dateTimeOption = {
  timeZone: 'Africa/Accra',
  hour12: true,
  hour: 'numeric',
  minute: 'numeric',
  seconds: 'numeric',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

const ShsPowerSchedule = {}
const PowerButton = ({ action, color, device, time, user }) => {
  const client_id = getItemFromLocalStorage('current_client')
  const [powerBtnModalOpen, setPowerBtnModalOpen] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [selectedDate, setSelectedDate] = useState(false)
  const [deviceId, setDeviceId] = useState('')
  const [shsPowerSchedule, { data: powerScheduleRes, isLoading }] =
    useShsPowerScheduleMutation()
  const [
    customerShsPowerSchedule,
    { data: customerpowerScheduleRes, isLoading: isLoadingCustomerData },
  ] = useCustomerShsPowerScheduleMutation()
  const showPowerModal = () => {
    setPowerBtnModalOpen(true)
  }
  const handlePowerOption = async (action) => {
    ShsPowerSchedule.schedule_type = action
    ShsPowerSchedule.reason = 'Testing shs power'

    if (user === 'client') {
      try {
        await customerShsPowerSchedule({
          ShsPowerSchedule,
          deviceId,
          client_id,
        }).unwrap()
        setPowerBtnModalOpen(false)
        openNotification('Scheduled for power', selectedDate, action)
      } catch (error) {
        setErrMsg(ErrorMessage(error))
      }
    } else {
      try {
        await shsPowerSchedule({ ShsPowerSchedule, deviceId }).unwrap()
        setPowerBtnModalOpen(false)
        openNotification('Scheduled for power', selectedDate, action)
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
          <h1>Power {action}</h1>
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

const PowerSwitch = ({ device_id, user }) => {
  ShsPowerSchedule.deviceId = device_id
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [scheduleTime, setScheduleTime] = useState('')
  const { data, isLoading } = useGetShsDetailsQuery({ deviceId: device_id })

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handlePowerSchedule = (value) => {
    setIsModalOpen(false)
  }
  const handlePowerCancelEdit = () => {
    setIsModalOpen(false)
  }

  const handleScheduleTime = (e) => {
    const date = new Date(e?.$d)
    setScheduleTime(dateTimeConverter(e?.$d))
    ShsPowerSchedule.scheduled_time = date.toISOString()
    ShsPowerSchedule.time = e?.$d.toLocaleTimeString('en-US', dateTimeOption)
    showModal()
  }
  useEffect(() => {
    if (data) {
      setScheduleTime(dateTimeConverter(data?.scheduled))
    }
  }, [data])

  const powerOptions = [
    {
      label: (
        <PowerButton
          action="off"
          color={'#B42318'}
          device={device_id}
          time={scheduleTime || null}
        />
      ),
      key: '0',
    },
    {
      label: (
        <p
          style={{
            textAlign: 'center',
            fontSize: '18px',
            marginBottom: '-7px',
          }}
        >
          Or
        </p>
      ),
      key: '2',
      disabled: true,
    },

    {
      label: (
        <PowerButton
          action="on"
          color={'#027A48'}
          user={user}
          device={device_id}
          time={scheduleTime || null}
        />
      ),
      key: '1',
    },
  ]

  const powerSchedule = [
    {
      label: scheduleTime ? (
        <div>
          <p
            style={{
              width: '280px',
              textAlign: 'center',
              paddingTop: '10px',
              color: '#606062',
            }}
          >
            Would you like to edit the scheduled time created for{' '}
            <strong>{scheduleTime}</strong>{' '}
          </p>
          <Divider />
          <div className={classes.PowerSwitch__EditShutDown}>
            <button
              onClick={handlePowerCancelEdit}
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
              onClick={() => setScheduleTime('')}
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
      ) : (
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
      ),
    },
  ]

  return (
    <div className={classes.PowerSwitch}>
      <div className={classes.PowerSwitch__PowerBtn}>
        <Dropdown
          className={classes.PowerSwitch__PowerBtnDropDown}
          menu={{
            items: powerOptions,
          }}
          trigger={['click']}
          placement="bottom"
          overlayStyle={{ paddingTop: '10px' }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <BiPowerOff size={25} />
          </a>
        </Dropdown>
      </div>
      <div className={classes.PowerSwitch__ShutDownBtn}>
        <Dropdown
          className={classes.PowerSwitch__PowerBtnDropDown}
          menu={{
            items: powerSchedule,
            onClick: (e) => e.preventDefault(),
          }}
          trigger={['click']}
          placement="bottom"
          overlayStyle={{
            paddingTop: '10px',
            width: 'auto',
            paddingRight: '50px',
          }}
        >
          <button>Power Schedule </button>
        </Dropdown>
        {scheduleTime && (
          <Modal
            open={isModalOpen}
            onOk={handlePowerSchedule}
            onCancel={handlePowerCancelEdit}
            className={classes.PowerSwitch__Modal}
            width={400}
            footer={null}
          >
            <div className={classes.PowerSwitch__ModalContent}>
              <img src={scheduleIcon} alt="" srcSet="" />
              <h1>Schedule Date</h1>

              <p>
                If you proceed with this, the power supply in your house from
                Imperium Solar Housing System will be scheduled to power on or
                power off at {scheduleTime}?{' '}
              </p>

              <div className={classes.PowerSwitch__Confirm}>
                <button onClick={handlePowerSchedule}>Cancel</button>
                <button onClick={handlePowerSchedule}>Proceed</button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  )
}

export default PowerSwitch
