import { Button, Form, Input, Modal, Select, Typography } from 'antd'

import React from 'react'
import { ReactComponent as TicketIcon } from '../../../../assets/widget-icons/home-icon.svg'
import classes from './SHSForm.module.scss'

const { Text, Title } = Typography

const AddSHSForm = () => {}

const SHSForm = ({ isOpen, toggleModal }) => {
  return (
    <Modal
      title={
        <div className={classes.SHSForm__header}>
          <TicketIcon style={{ marginBottom: '15px' }} />
          <Title
            level={5}
            className={classes.SHSForm__title}
            style={{ marginTop: 4 }}
          >
            Add SHS
          </Title>
          <Text type="secondary" className={classes.SHSForm__subTitle}>
            Please enter email and customer unique equipment identifier to
            assign a SHS to a customer &trade;
          </Text>
        </div>
      }
      centered
      open={isOpen}
      onOk={toggleModal}
      onCancel={toggleModal}
      width={400}
      footer={null}
    >
      {/* <ModalForm title={title} toggleModal={toggleModal} /> */}
    </Modal>
  )
}

export default SHSForm
