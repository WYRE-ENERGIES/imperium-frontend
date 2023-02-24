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

import { LoadingOutlined } from '@ant-design/icons'
import { ReactComponent as TicketIcon } from '../../../../assets/ticket-icon.svg'
import classes from './TicketForm.module.scss'
import { supportStatusEnums } from '../../../../utils/enums'
import { useResolveTicketMutation } from '../../../../features/support/supportSlice'

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

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
)

const ModalForm = ({ toggleModal, ticketData, isAdmin }) => {
  const [isResolved, setIsResolved] = useState(ticketData.status)

  const [resolveTicket, { isLoading, isSuccess }] = useResolveTicketMutation()

  const [form] = Form.useForm()
  const onFinish = (values) => {
    resolveTicket({
      ticket_id: ticketData.id,
      resolve: isResolved === supportStatusEnums.RESOLVED,
    })
  }

  useEffect(() => {
    form.resetFields()

    if (!isLoading && isSuccess) {
      toast.success(
        `Ticket ${
          isResolved === supportStatusEnums.RESOLVED ? 'Resolved' : 'Unresolved'
        }  `,
        {
          hideProgressBar: true,
          autoClose: 3000,
          theme: 'colored',
        },
      )
      toggleModal()
    }
  }, [ticketData, isLoading, isSuccess])

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
              style={{
                backgroundColor:
                  isResolved !== supportStatusEnums.PENDING ? '#385E2B' : '',
              }}
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
          {isLoading ? (
            <Spin
              indicator={antIcon}
              style={{
                color: isResolved === ticketData.status ? '#385E2B' : '#fff',
              }}
            />
          ) : (
            'Submit'
          )}
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
