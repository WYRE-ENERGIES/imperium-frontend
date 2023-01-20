import { Button, Divider, Form, Input, Modal, Select, Typography } from 'antd'
import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import { ReactComponent as TicketIcon } from '../../../../assets/ticket-icon.svg'
import classes from './TicketForm.module.scss'

const { Option } = Select
const { TextArea } = Input
const { Text, Title } = Typography

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}

const ModalForm = ({ toggleModal, ticketData }) => {
  const [form] = Form.useForm()
  const onFinish = (values) => {
    toast.success('Ticket submitted', {
      hideProgressBar: true,
      autoClose: 3000,
      theme: 'colored',
    })
  }

  useEffect(() => form.resetFields(), [ticketData])

  return (
    <Form
      {...layout}
      name="support"
      className={classes.TicketForm}
      form={form}
      onFinish={onFinish}
      initialValues={ticketData}
    >
      <Divider />
      <Form.Item
        name="subject"
        label="Subject"
        labelAlign="left"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input
          placeholder="Enter Subject"
          className={classes.TicketForm__input}
        />
      </Form.Item>
      <Form.Item
        name="priority"
        label="Priority"
        labelAlign="left"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="Select Priority" onChange={() => {}} allowClear>
          <Option value="Normal">Normal</Option>
          <Option value="Urgent">Urgent</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        labelAlign="left"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <TextArea
          rows={4}
          placeholder="Enter a description..."
          className={classes.TicketForm__input}
        />
      </Form.Item>
      <Divider />
      <div className={classes.TicketForm__btn}>
        <Button
          className={classes.TicketForm__cancelBtn}
          type="default"
          onClick={toggleModal}
        >
          Cancel
        </Button>
        <Button className={classes.TicketForm__submitBtn} htmlType="submit">
          Submit
        </Button>
      </div>
      <ToastContainer />
    </Form>
  )
}

const TicketForm = ({ title, isOpen, toggleModal, ticketData }) => {
  return (
    <Modal
      title={
        <div className={classes.ModalForm__header}>
          <div>
            <TicketIcon style={{ marginRight: '16px' }} />
          </div>
          <div>
            <Title
              level={5}
              className={classes.ModalForm__title}
              style={{ marginTop: 4 }}
            >
              {title}
            </Title>
            <Text type="secondary" className={classes.ModalForm__subTitle}>
              Submit a ticket for any issues you are experiencing
            </Text>
          </div>
        </div>
      }
      centered
      open={isOpen}
      onOk={toggleModal}
      onCancel={toggleModal}
      width={688}
      footer={null}
    >
      <ModalForm
        title={title}
        toggleModal={toggleModal}
        ticketData={ticketData}
      />
    </Modal>
  )
}

export default TicketForm
