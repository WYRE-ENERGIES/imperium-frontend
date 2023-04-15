import { React, useEffect, useState } from 'react'
import { BiPowerOff } from 'react-icons/bi'

import { Dropdown, Modal } from 'antd'
import scheduleIcon from '../../../src/assets/widget-icons/scheduleIcon.svg'
import { useGetShsDetailsQuery } from '../../features/slices/shs/admin/adminShsSlice'
import { dateTimeConverter } from '../../utils/helpers'

import PowerButton from './PowerButton'
import classes from './PowerSwitch.module.scss'
import PowerDatePicker from './PowerDatePicker'
import PowerDateTimeEdit from './PowerDateTimeEdit'

const PowerSwitch = ({ device_id, user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [shsPowerSchedule, setShsPowerSchedule] = useState({
    scheduled_time: '',
    schedule_type: '',
    reason: '',
  })
  const [scheduleTime, setScheduleTime] = useState('')
  const { data, isLoading } = useGetShsDetailsQuery({ deviceId: device_id })

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handlePowerSchedule = () => {
    setIsModalOpen(false)
  }

  const handleScheduleTime = (e) => {
    const date = new Date(e?.$d)
    setScheduleTime(dateTimeConverter(e?.$d))
    setShsPowerSchedule({
      ...shsPowerSchedule,
      scheduled_time: date.toISOString(),
    })

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
          user={user}
          time={scheduleTime || null}
          shsPowerSchedule={shsPowerSchedule}
          setShsPowerSchedule={setShsPowerSchedule}
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
          shsPowerSchedule={shsPowerSchedule}
          setShsPowerSchedule={setShsPowerSchedule}
        />
      ),
      key: '1',
    },
  ]

  const powerSchedule = [
    {
      label: scheduleTime ? (
        <PowerDateTimeEdit
          scheduleTime={scheduleTime}
          setIsModalOpen={setIsModalOpen}
          setScheduleTime={setScheduleTime}
        />
      ) : (
        <PowerDatePicker handleScheduleTime={handleScheduleTime} />
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
            onCancel={() => setIsModalOpen(false)}
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
