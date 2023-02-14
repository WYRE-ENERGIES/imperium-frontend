import { React, useState } from 'react'
import { BiPowerOff } from 'react-icons/bi'

import classes from './PowerSwitch.module.scss'
import { Dropdown, Modal, Space, DatePicker } from 'antd'
import cautionIcon from '../../../src/assets/widget-icons/caution.svg'
import scheduleIcon from '../../../src/assets/widget-icons/scheduleIcon.svg'

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
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onChange = (value, dateString) => {
    setStartDate(dateString[0])
    setEndDate(dateString[1])
    console.log('Selected Time: ', value)
    console.log('Formatted Selected Time: ', dateString[1])
  }
  const onClick = ({ key }) => {
    console.log('key: ', key)
  }

  const onOk = ({ $d }) => {
    showModal()

    console.log('onOk: ', $d)
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
      label: (
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
            // separator={<p>hello</p>}
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
          overlayStyle={{ paddingTop: '10px' }}
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
                <button>Proceed</button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  )
}

export default PowerSwitch
