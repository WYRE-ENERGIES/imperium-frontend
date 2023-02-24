import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Spin,
  Switch,
  Typography,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { requestStatusEnum, supportStatusEnums } from '../../../../utils/enums'
import { useDispatch, useSelector } from 'react-redux'

import { ReactComponent as TicketIcon } from '../../../../assets/ticket-icon.svg'
import classes from './TicketForm.module.scss'
import { resolveTicket } from '../../../../features/slices/supportSlice'

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

const ModalForm = ({ toggleModal, ticketData, isAdmin }) => {
  const [isResolved, setIsResolved] = useState(ticketData.status)

  const dispatch = useDispatch()
  let { status, message } = useSelector((state) => state.support)

  const [form] = Form.useForm()
  const onFinish = (values) => {
    dispatch(
      resolveTicket({
        ticket_id: ticketData.id,
        resolve: isResolved === supportStatusEnums.RESOLVED,
      }),
    )

    if (status === requestStatusEnum.SUCCESS) {
      toast.success('Ticket submitted', {
        hideProgressBar: true,
        autoClose: 3000,
        theme: 'colored',
      })
    }

    toggleModal()
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
      requiredMark="optional"
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
          disabled={isAdmin}
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
        <Select
          placeholder="Select Priority"
          onChange={() => {}}
          allowClear
          disabled={isAdmin}
        >
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
          disabled={isAdmin}
        />
      </Form.Item>
      {isAdmin && (
        <>
          <Divider />
          <div className={classes.TicketForm__switch}>
            <Switch
              style={{ backgroundColor: '#385E2B' }}
              onChange={(e) =>
                setIsResolved(
                  e ? supportStatusEnums.RESOLVED : supportStatusEnums.PENDING,
                )
              }
              defaultChecked={isResolved !== supportStatusEnums.PENDING}
            />
            Resolve ticket
          </div>
        </>
      )}
      <Divider />
      <div className={classes.TicketForm__btn}>
        <Button
          className={classes.TicketForm__cancelBtn}
          type="default"
          onClick={toggleModal}
        >
          Cancel
        </Button>
        <Button
          className={classes.TicketForm__submitBtn}
          htmlType="submit"
          disabled={isResolved === ticketData.status}
        >
          {status === requestStatusEnum.LOADING ? <Spin /> : 'Submit'}
        </Button>
      </div>
      <ToastContainer />
    </Form>
  )
}

const TicketForm = ({
  title,
  isOpen,
  toggleModal,
  ticketData,
  isAdmin = false,
}) => {
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
            {!isAdmin && (
              <Text type="secondary" className={classes.ModalForm__subTitle}>
                Submit a ticket for any issues you are experiencing
              </Text>
            )}
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
        isAdmin={isAdmin}
      />
    </Modal>
  )
}

export default TicketForm
