import { React, useState } from 'react'
import { BiPowerOff } from 'react-icons/bi'
import FormButton from '../Auth/Forms/Widgets/FormButton'
import classes from './PowerSwitch.module.scss'
import { Dropdown, Modal, Button } from 'antd'
import cautionIcon from '../../../src/assets/widget-icons/caution.svg'

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
        // title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className={classes.PowerSwitch__Modal}
        width={400}
        footer={null}
      >
        <div className={classes.PowerSwitch__ModalContent}>
          <img src={cautionIcon} alt="" srcSet="" />
          <h1>Shutdown</h1>
          <p>
            If you proceed with this, the power supply in your house from
            Imperium Solar Housing System will be shut down
          </p>
          <div className={classes.PowerSwitch__Confirm}>
            <button onClick={handleOk}>Cancel</button>
            <FormButton type={'submit'} action={'Proceed'} />
          </div>
        </div>
      </Modal>
    </div>
  )
}

const PowerSwitch = () => {
  const items = [
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
  const onClick = ({ key }) => {
    console.log('Working', key)
  }
  return (
    <div className={classes.PowerSwitch}>
      <div className={classes.PowerSwitch__PowerBtn}>
        <Dropdown
          className={classes.PowerSwitch__PowerBtnDropDown}
          menu={{
            items,
            onClick,
          }}
          trigger={['click']}
          placement="bottom"
          overlayStyle={{ paddingTop: '10px' }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <BiPowerOff size={30} />
          </a>
        </Dropdown>
      </div>
      <div className={classes.PowerSwitch__ShutDownBtn}>
        <FormButton type={'submit'} action={'Schedule shutdown'} />
      </div>
    </div>
  )
}

export default PowerSwitch
