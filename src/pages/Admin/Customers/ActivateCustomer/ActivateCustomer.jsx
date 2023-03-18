import { Button, Form, Input, Modal, Select, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import {
  useActivateCustomerMutation,
  useDeactivateCustomerMutation,
  useDeactivateReasonsQuery,
} from '../../../../features/slices/customersSlice'

import ButtonLoader from '../../../../components/ButtonLoader/ButtonLoader'
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
  const title = !user.status ? 'Activate Client' : 'Disabled Client'
  const TIcon = !user.status ? TicketIcon : DisableTicketIcon

  const [activateCustomer, { isLoading, isSuccess }] =
    useActivateCustomerMutation()

  const onSubmit = () => {
    if (user.status) {
      toggleForm()
      return
    }

    const data = {
      enable: true,
    }

    activateCustomer({ data, clientId: user.id })
  }

  useEffect(() => {
    if (!isSuccess) return

    toast.success('activated', {
      hideProgressBar: true,
      autoClose: 3000,
      theme: 'colored',
    })

    const timeoutId = setTimeout(() => {
      toggleModal()
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [isSuccess])

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
            user.status ? 'not' : ''
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
          onClick={onSubmit}
          htmlType="button"
        >
          {isLoading ? <ButtonLoader color="#fff" /> : 'Proceed'}
        </Button>
      </div>
      <ToastContainer />
    </div>
  )
}

const DisableClientForm = ({ user, toggleModal }) => {
  const [deactivateCustomer, { isLoading, isSuccess }] =
    useDeactivateCustomerMutation()

  useEffect(() => {
    if (!isSuccess) return

    toast.success('deactivated', {
      hideProgressBar: true,
      autoClose: 3000,
      theme: 'colored',
    })

    const timeoutId = setTimeout(() => {
      toggleModal()
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [isSuccess])

  const [form] = Form.useForm()
  const onFinish = (values) => {
    const data = {
      reason_id: values.reason,
      disable: true,
      accounts: [
        [
          {
            email: user.customer_email,
          },
        ],
      ],
    }

    deactivateCustomer(data)
  }

  const {
    isError,
    error: tableError,
    data,
    isFetching,
  } = useDeactivateReasonsQuery({})

  let reasons = []
  if (!isFetching) {
    reasons = data.map(({ id, reason }) => (
      <Option key={id} value={id}>
        {reason}
      </Option>
    ))
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
        <Text className={classes.SHSForm__subTitle}>
          {user.customer_fullname}
        </Text>
        <Text type="secondary" className={classes.SHSForm__subTitle}>
          {user.customer_email}
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
            {reasons}
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
            {isLoading ? <ButtonLoader color="#fff" /> : 'Proceed'}
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
