import { Button, Form, Input, Modal, Select, Typography } from 'antd'
import React, { Suspense, lazy, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import { ReactComponent as TicketIcon } from '../../../../assets/user-icon.svg'
import classes from './NewUserForm.module.scss'
import { getItemFromLocalStorage } from '../../../../utils/helpers'
import { useInviteUserMutation } from '../../../../features/slices/users/customer/usersSlice'

const ButtonLoader = lazy(() =>
  import('../../../../components/ButtonLoader/ButtonLoader'),
)

const { Option } = Select
const { Text, Title } = Typography

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}

const ModalForm = ({ toggleModal }) => {
  const [roleDescription, setRoleDescription] = useState('')

  const [inviteUser, { isLoading, isSuccess, isError, error }] =
    useInviteUserMutation()

  const [form] = Form.useForm()
  const onFinish = ({ invitee_email, role }) => {
    const currentClient = getItemFromLocalStorage('current_client')
    inviteUser({
      invitee_email,
      role,
      client: currentClient,
      redirect_url: `${window.location.origin}/accept-user`,
    })
  }

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.success('Invite sent', {
        hideProgressBar: true,
        autoClose: 3000,
        theme: 'colored',
      })
      toggleModal()
    }
  }, [isLoading, isSuccess, toggleModal])

  useEffect(() => {
    if (!isLoading && isError) {
      const { data } = error
      toast.error(data.detail || 'An error occurred', {
        hideProgressBar: true,
        autoClose: 3000,
        theme: 'colored',
      })
    }
  }, [isLoading, isError, error])

  return (
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
        name="invitee_email"
        label="Email"
        rules={[
          {
            required: true,
            type: 'email',
            message: 'Email is required',
          },
        ]}
      >
        <Input
          placeholder="Enter users email"
          className={classes.NewUserForm__input}
        />
      </Form.Item>
      <Form.Item
        name="role"
        label="Role"
        rules={[
          {
            required: true,
            message: 'Role is required',
          },
        ]}
        style={{ marginBottom: '8px' }}
      >
        <Select
          className={classes.NewUserForm__select}
          placeholder="Select Role"
          allowClear
        >
          {['viewer']?.map((role, index) => (
            <Option key={`${role}-${index}`} value={role}>
              {role}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Text
        style={{
          color: '#606062',
          fontSize: '12px',
          marginTop: '0',
          fontWeight: 400,
          lineHeight: '20px',
        }}
      >
        {roleDescription}
      </Text>

      <div className={classes.NewUserForm__btn}>
        <Button
          className={classes.NewUserForm__cancelBtn}
          type="default"
          onClick={toggleModal}
        >
          Cancel
        </Button>
        <Suspense>
          <Button className={classes.NewUserForm__submitBtn} htmlType="submit">
            {isLoading ? <ButtonLoader color="#fff" /> : 'Proceed'}
          </Button>
        </Suspense>
      </div>
      <ToastContainer />
    </Form>
  )
}

const NewUserForm = ({ title, isOpen, toggleModal }) => {
  return (
    <Modal
      title={
        <div className={classes.ModalForm__header}>
          <TicketIcon style={{ marginBottom: '15px' }} />
          <Title
            level={5}
            className={classes.ModalForm__title}
            style={{ marginTop: 4 }}
          >
            {title}
          </Title>
          <Text type="secondary" className={classes.ModalForm__subTitle}>
            Invite user to collaborate on this project.
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
      <ModalForm title={title} toggleModal={toggleModal} />
    </Modal>
  )
}

export default NewUserForm
