import { Button, Form, Input, Modal, Select, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import {
  useGetUsersRolesQuery,
  useInviteUserMutation,
} from '../../../../features/slices/usersSlice'

import { ReactComponent as TicketIcon } from '../../../../assets/user-icon.svg'
import classes from './NewUserForm.module.scss'

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
  const { data } = useGetUsersRolesQuery()
  const [inviteUser, { isLoading, isSuccess }] = useInviteUserMutation()

  const [form] = Form.useForm()
  const onFinish = (values) => {
    inviteUser(values)
  }

  const handleRoleChange = (role) => {
    setRoleDescription((prev) => {
      return role === 'admin'
        ? "Admin can view all the statistics as well as shutdown SHS's if needed"
        : role === 'client_viewer'
        ? "Viewer have access to all statistics but can't shut down the SHS systems if necessary."
        : ''
    })
  }

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.success('User Added', {
        hideProgressBar: true,
        autoClose: 3000,
        theme: 'colored',
      })
      toggleModal()
    }
  }, [isLoading, isSuccess, toggleModal])

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
          },
        ]}
        style={{ marginBottom: '8px' }}
      >
        <Select
          className={classes.NewUserForm__select}
          placeholder="Select Role"
          onChange={handleRoleChange}
          allowClear
        >
          {data?.map((role, index) => (
            <Option key={`${role.name}-${index}`} value={role.name}>
              {role.name}
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
        <Button className={classes.NewUserForm__submitBtn} htmlType="submit">
          Proceed
        </Button>
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
