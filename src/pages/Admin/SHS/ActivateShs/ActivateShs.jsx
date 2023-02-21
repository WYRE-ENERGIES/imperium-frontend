import { Button, Form, Modal, Typography } from 'antd'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import { ReactComponent as DisableTicketIcon } from '../../../../assets/widget-icons/disable-caution-icon.svg'
import { ReactComponent as TicketIcon } from '../../../../assets/widget-icons/caution-icon.svg'
import classes from '../../Customers/SHSForm/SHSForm.module.scss'

const { Text, Title } = Typography

const ActivateContent = ({ user, toggleModal }) => {
  const title = user?.isActive ? 'Activate SHS' : 'Disabled SHS'
  const TIcon = user?.isActive ? TicketIcon : DisableTicketIcon

  return (
    <div>
      <div className={classes.SHSForm__header}>
        <TIcon style={{ marginBottom: '15px' }} />
        <Title
          level={5}
          className={classes.SHSForm__title}
          style={{ marginTop: 4 }}
        >
          {title}
        </Title>
        <Text type="secondary" className={classes.SHSForm__subTitle}>
          By disabling this SHS, you will stop collecting data from the SHS.
          Would you like to proceed?
        </Text>
      </div>
      <div className={classes.AddSHSForm__btn}>
        <Button
          className={classes.AddSHSForm__cancelBtn}
          type="default"
          onClick={toggleModal}
        >
          Cancel
        </Button>
        <Button className={classes.AddSHSForm__submitBtn} htmlType="submit">
          Proceed
        </Button>
      </div>
    </div>
  )
}

const ActivateShs = ({ user, isOpen, toggleModal }) => {
  return (
    <Modal
      centered
      open={isOpen}
      onOk={toggleModal}
      onCancel={toggleModal}
      width={400}
      footer={null}
    >
      <ActivateContent toggleModal={toggleModal} user={user} />
    </Modal>
  )
}

export default ActivateShs
