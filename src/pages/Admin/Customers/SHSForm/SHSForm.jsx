import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Typography,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import { PlusOutlined } from '@ant-design/icons'
import { ReactComponent as TicketIcon } from '../../../../assets/widget-icons/home-icon.svg'
import classes from './SHSForm.module.scss'
import { useAssignShsMutation } from '../../../../features/slices/customersSlice'

const { Text, Title } = Typography
const { Option } = Select

const AddSHSForm = ({ toggleModal }) => {
  const [form] = Form.useForm()
  const [inputs, setInputs] = useState(['uid-1'])

  const [assignShs, { isLoading, isSuccess }] = useAssignShsMutation()

  const onFinish = (values) => {
    // assignShs(values)
  }

  useEffect(() => {
    if (!isLoading && isSuccess) {
      toast.success('SHS Added', {
        hideProgressBar: true,
        autoClose: 3000,
        theme: 'colored',
      })
      toggleModal()
    }
  }, [isLoading, isSuccess])

  const addNewInput = () => {
    setInputs((prev) => [...prev, `uid-${inputs.length + 1}`])
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
      <div className="inputGroupField">
        <Form.Item
          name="email"
          label="Customer Email"
          style={{ marginBottom: '12px', flex: 1 }}
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
          name="sector"
          label="Select Sector"
          rules={[
            {
              required: true,
            },
          ]}
          style={{ marginBottom: '8px', flex: 1 }}
        >
          <Select
            className={classes.AddSHSForm__select}
            placeholder="Select Sector"
            onChange={() => {}}
            allowClear
          >
            <Option value="Payment">Payment</Option>
          </Select>
        </Form.Item>
      </div>

      <div className="inputGroupField">
        <Form.Item
          name="region"
          label="Select Region"
          rules={[
            {
              required: true,
            },
          ]}
          style={{ marginBottom: '8px', flex: 1 }}
        >
          <Select
            className={classes.AddSHSForm__select}
            placeholder="Select Region"
            onChange={() => {}}
            allowClear
          >
            <Option value="Payment">Payment</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="state"
          label="Select State"
          rules={[
            {
              required: true,
            },
          ]}
          style={{ marginBottom: '8px', flex: 1 }}
        >
          <Select
            className={classes.AddSHSForm__select}
            placeholder="Select State"
            onChange={() => {}}
            allowClear
          >
            <Option value="Payment">Payment</Option>
          </Select>
        </Form.Item>
      </div>

      <Form.Item
        name="vendor"
        label="Select Vendor"
        rules={[
          {
            required: true,
          },
        ]}
        style={{ marginBottom: '8px' }}
      >
        <Select
          className={classes.AddSHSForm__select}
          placeholder="Select Vendor"
          onChange={() => {}}
          allowClear
        >
          <Option value="Payment">Payment</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Unique Equipment Identifier"
        style={{ marginBottom: 0 }}
        wrapperCol={{
          span: 10,
        }}
        labelCol={{
          span: 10,
        }}
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
                message: `Unique Equipment Identifier is required`,
              },
            ]}
            key={input}
          >
            <Input
              placeholder={`Enter your unique identifier`}
              className={classes.AddSHSForm__input}
            />
          </Form.Item>
        ))}
      </Form.Item>

      {/* <Text
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
      </Text> */}

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
      width={705}
      footer={null}
    >
      <AddSHSForm toggleModal={toggleModal} />
    </Modal>
  )
}

export default SHSForm
