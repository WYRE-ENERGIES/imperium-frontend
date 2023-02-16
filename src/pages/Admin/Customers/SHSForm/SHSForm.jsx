import { Button, Form, Input, Modal, Typography } from 'antd'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import { PlusOutlined } from '@ant-design/icons'
import { ReactComponent as TicketIcon } from '../../../../assets/widget-icons/home-icon.svg'
import classes from './SHSForm.module.scss'

const { Text, Title } = Typography

const AddSHSForm = ({ toggleModal }) => {
  const [form] = Form.useForm()
  const [inputs, setInputs] = useState(['uid1'])

  const onFinish = (values) => {
    toast.success('SHS Added', {
      hideProgressBar: true,
      autoClose: 3000,
      theme: 'colored',
    })
  }

  const addNewInput = () => {
    const nextField = `ueid ${inputs.length + 1}`
    setInputs((prev) => [...prev, nextField])
  }

  return (
    <Form
      name="newUser"
      className={classes.AddSHSForm}
      form={form}
      onFinish={onFinish}
      requiredMark={false}
      layout="vertical"
      labelCol={{
        span: 32,
      }}
      wrapperCol={{
        span: 32,
      }}
    >
      <Form.Item
        name="email"
        label="Customer Email"
        style={{ marginBottom: '12px' }}
        rules={[
          {
            required: true,
            type: 'email',
          },
        ]}
      >
        <Input
          placeholder="Enter users email"
          className={classes.AddSHSForm__input}
        />
      </Form.Item>
      <Form.Item
        label="Unique Equipment Identifier"
        style={{ marginBottom: 0 }}
        rules={[
          {
            required: true,
          },
        ]}
      >
        {inputs.map((input, index) => (
          <Form.Item
            name={input}
            rules={[
              {
                required: true,
                message: `Unique Equipment Identifier is required ${index + 1}`,
              },
            ]}
            key={input}
          >
            <Input
              placeholder={`Enter your unique identifier ${index + 1}`}
              className={classes.AddSHSForm__input}
            />
          </Form.Item>
        ))}
      </Form.Item>

      <Text
        style={{
          fontSize: '12px',
          margin: '0',
          fontWeight: 600,
          lineHeight: '20px',
          color: '#294620',
          cursor: 'pointer',
        }}
        onClick={addNewInput}
      >
        <PlusOutlined /> Add
      </Text>

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
  )
}

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
      <AddSHSForm toggleModal={toggleModal} />
    </Modal>
  )
}

export default SHSForm
