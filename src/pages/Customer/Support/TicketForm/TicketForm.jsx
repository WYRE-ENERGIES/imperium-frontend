import { Button, Divider, Form, Input, Modal, Select, Typography } from 'antd'
import React, { Suspense, lazy, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import {
  useCreateSupportTicketMutation,
  useUpdateSupportTicketMutation,
} from '../../../../features/slices/supportSlice'

import { ReactComponent as TicketIcon } from '../../../../assets/ticket-icon.svg'
import classes from './TicketForm.module.scss'
import { getItemFromLocalStorage } from '../../../../utils/helpers'
import { useListClientShsDevicesQuery } from '../../../../features/slices/allShsSlice'

const ButtonLoader = lazy(() =>
  import('../../../../components/ButtonLoader/ButtonLoader'),
)
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
  const [shsDevices, setShsDevices] = useState([])
  const [currentClient, setCurrentClient] = useState()

  const { isFetching: shsLoading, data: shsData } =
    useListClientShsDevicesQuery()

  const [createSupportTicket, { isLoading, isSuccess, isError }] =
    useCreateSupportTicketMutation()

  const [
    updateSupportTicket,
    {
      isLoading: isUpdating,
      isSuccess: isUpdateSuccess,
      isError: isisUpdateError,
    },
  ] = useUpdateSupportTicketMutation()

  const [form] = Form.useForm()
  const onFinish = (values) => {
    if (ticketData.id) {
      updateSupportTicket({
        data: { ...values, client: currentClient },
        id: ticketData.id,
      })
    } else {
      createSupportTicket({ ...values, client: currentClient })
    }
  }

  useEffect(() => {
    if (isLoading || isUpdating) return

    if (isSuccess || isUpdateSuccess) {
      toast.success(ticketData.id ? 'Ticket Updated' : 'Ticket created', {
        hideProgressBar: true,
        autoClose: 3000,
        theme: 'colored',
      })

      toggleModal()
    }
    form.resetFields()
  }, [isLoading, isSuccess, isUpdating, isUpdateSuccess])

  useEffect(() => {
    if (shsLoading) return

    if (shsData?.length) {
      setShsDevices(
        shsData.map(({ id, name }) => (
          <Option key={id} value={id}>
            {name}
          </Option>
        )),
      )
    }
  }, [shsLoading])

  useEffect(() => {
    const currentClient = getItemFromLocalStorage('current_client')
    setCurrentClient(currentClient)
  }, [])

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
          className={classes.TicketForm__select}
          allowClear
        >
          <Option value="Normal">Normal</Option>
          <Option value="Urgent">Urgent</Option>
        </Select>
      </Form.Item>
      <Form.Item name="shs" label="SHS" labelAlign="left">
        <Select
          placeholder="Select SHS"
          className={classes.TicketForm__select}
          allowClear
        >
          {shsDevices}
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
        <Suspense>
          <Button className={classes.TicketForm__submitBtn} htmlType="submit">
            {isLoading ? <ButtonLoader color="#fff" /> : 'Submit'}
          </Button>
        </Suspense>
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
