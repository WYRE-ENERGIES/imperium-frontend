import { React, useState } from 'react'
import { BiPowerOff } from 'react-icons/bi'

import classes from './PowerSwitch.module.scss'
import { Dropdown, Modal, Space, notification, DatePicker, Divider } from 'antd'
import cautionIcon from '../../../src/assets/widget-icons/caution.svg'
import scheduleIcon from '../../../src/assets/widget-icons/scheduleIcon.svg'
const openNotification = (startDate, endDate) => {
  notification.success({
    message: 'Schedule Shutdown',
    description: `Scheduled for shutdown at ${startDate} to ${endDate}`,

    onClick: () => {
      console.log('Notification Clicked!')
    },
  })
}
const PowerButton = ({ action, color }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const actionColor = action === 'Power Off' ? '#B42318' : '#027A48'
  const actionIcon = action === 'Power Off' ? cautionIcon : scheduleIcon

  return (
    <div>
      <button
        style={{ color: color }}
        className={classes.PowerSwitch__OnAndOff}
        onClick={showModal}
      >
        {action}
      </button>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className={classes.PowerSwitch__Modal}
        width={400}
        footer={null}
      >
        <div className={classes.PowerSwitch__ModalContent}>
          <img src={actionIcon} alt="" srcSet="" />
          <h1>{action}</h1>
          <p>
            If you proceed with this, the power supply in your house from
            Imperium Solar Housing System will{' '}
            <span style={{ color: actionColor }}>{action}</span>
          </p>
          <div className={classes.PowerSwitch__Confirm}>
            <button onClick={handleOk}>Cancel</button>
            <button onClick={handleOk}>Proceed</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

const PowerSwitch = () => {
  const { RangePicker } = DatePicker
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

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

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = (value) => {
    setIsModalOpen(false)
    openNotification(startDate, endDate)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onChange = (value, dateString) => {}
  const onClick = ({ key }) => {
    console.log('Power Button Onclick : ', key)
  }

  const onOk = (e) => {
    const startSchedule = e[0].$d.toLocaleTimeString('en-US', dateTimeOption)
    const endSchedule = e[1].$d.toLocaleTimeString('en-US', dateTimeOption)
    setStartDate(startSchedule)
    setEndDate(endSchedule)

    showModal()
    console.log('onOk testing: ', e[0])
  }

  const powerOptions = [
    {
      label: <PowerButton action="Power Off" color={'#B42318'} />,
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
      label: <PowerButton action="Power On" color={'#027A48'} />,
      key: '1',
    },
  ]

  const powerSchedule = [
    {
      label: startDate ? (
        <div>
          <p
            style={{
              width: '280px',
              textAlign: 'center',
              paddingTop: '10px',
              color: '#606062',
            }}
          >
            Would you like to edit the shutdown time created for{' '}
            <strong>{startDate}</strong>{' '}
          </p>
          <Divider />
          <div className={classes.PowerSwitch__EditShutDown}>
            <button
              onClick={handleOk}
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
              onClick={() => setStartDate('')}
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
          size={12}
          className={classes.PowerSwitch__datePicker}
        >
          <RangePicker
            showTime={{
              format: 'hh:mm',
              showNow: true,
            }}
            format="DD-MM-YYYY HH:mm"
            onChange={onChange}
            onOk={onOk}
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
            onClick,
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
            width: '357px',
            paddingRight: '50px',
          }}
        >
          <button>Schedule shutdown</button>
        </Dropdown>
        {endDate && (
          <Modal
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            className={classes.PowerSwitch__Modal}
            width={400}
            footer={null}
          >
            <div className={classes.PowerSwitch__ModalContent}>
              <img src={scheduleIcon} alt="" srcSet="" />
              <h1>Schedule Date</h1>

              <p>
                If you proceed with this, the power supply in your house from
                Imperium Solar Housing System will start up {startDate} and shut
                down {endDate}?{' '}
              </p>

              <div className={classes.PowerSwitch__Confirm}>
                <button onClick={handleOk}>Cancel</button>
                <button onClick={handleOk}>Proceed</button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  )
}

export default PowerSwitch
