import { Button, Form, Input, Modal, Select, Typography } from 'antd'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import { ReactComponent as DisableTicketIcon } from '../../../../assets/widget-icons/disable-caution-icon.svg'
import { ReactComponent as TicketIcon } from '../../../../assets/widget-icons/caution-icon.svg'
import classes from '../SHSForm/SHSForm.module.scss'

const { Text, Title } = Typography
const { Option } = Select

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}

const ActivateContent = ({ user, toggleModal, toggleForm }) => {
  const title = user?.isActive ? 'Activate Client' : 'Disabled Client'
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
          {`If you proceed with this ensure the client and their users can ${
            !user.isActive ? 'not' : ''
          } have
          access the platform, the power supply from all the Imperium Solar
          Housing System will be shut down`}
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
        <Button
          className={classes.AddSHSForm__submitBtn}
          onClick={toggleForm}
          htmlType="submit"
        >
          Proceed
        </Button>
      </div>
    </div>
  )
}

const DisableClientForm = ({ user, toggleModal }) => {
  const [form] = Form.useForm()
  const onFinish = (values) => {
    toast.success('User Added', {
      hideProgressBar: true,
      autoClose: 3000,
      theme: 'colored',
    })
  }

  return (
    <div>
      <div className={classes.SHSForm__header}>
        <DisableTicketIcon style={{ marginBottom: '15px' }} />
        <Title
          level={5}
          className={classes.SHSForm__title}
          style={{ marginTop: 4 }}
        >
          Disabled Client
        </Title>
        <Text className={classes.SHSForm__subTitle}>{user.name}</Text>
        <Text type="secondary" className={classes.SHSForm__subTitle}>
          {user.email}
        </Text>
      </div>
      <Form
        {...layout}
        name="newUser"
        className={classes.NewUserForm}
        form={form}
        onFinish={onFinish}
        requiredMark="optional"
        layout="vertical"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 32,
        }}
      >
        <Form.Item
          name="reason"
          label="Select Reason"
          rules={[
            {
              required: true,
            },
          ]}
          style={{ marginBottom: '8px' }}
        >
          <Select
            className={classes.NewUserForm__select}
            placeholder="Select Reason"
            onChange={() => {}}
            allowClear
          >
            <Option value="Payment">Payment</Option>
            <Option value="Location">Location</Option>
            <Option value="Suspicious activity">Suspicious activity</Option>
            <Option value="Device malfunction">Device malfunction</Option>
            <Option value="Inconsistent data post">
              Inconsistent data post
            </Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="account"
          label="Add more account"
          rules={[
            {
              required: true,
            },
          ]}
          style={{ marginBottom: '8px' }}
        >
          <Select
            className={classes.NewUserForm__select}
            placeholder="Select Account"
            onChange={() => {}}
            allowClear
          >
            <Option value="Admin">Admin</Option>
            <Option value="Viewer">Viewer</Option>
          </Select>
        </Form.Item>
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
        <ToastContainer />
      </Form>
    </div>
  )
}

const ActivateCustomer = ({ user, isOpen, toggleModal }) => {
  const [showForm, setShowForm] = useState(false)
  const toggleForm = () => setShowForm(!showForm)

  return (
    <Modal
      centered
      open={isOpen}
      onOk={toggleModal}
      onCancel={toggleModal}
      width={400}
      footer={null}
    >
      {showForm ? (
        <DisableClientForm toggleModal={toggleModal} user={user} />
      ) : (
        <ActivateContent
          toggleModal={toggleModal}
          user={user}
          toggleForm={toggleForm}
        />
      )}
    </Modal>
  )
}

export default ActivateCustomer
