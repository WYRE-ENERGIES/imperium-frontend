import React, { useState } from 'react'
import { useCreateAdminActiveAlertsMutation } from '../../../../features/slices/activeAlerts/admin/adminActiveAlertSlice'
import { ErrorMessage } from '../../../../components/ErrorMessage/ErrorMessage'
import { Divider, Form, Input, Modal, notification } from 'antd'

import { BsBell, BsPlus } from 'react-icons/bs'
import classes from './ActiveAlertsCreateAlertButton.module.scss'
import Error from '../../../../components/ErrorMessage/Error'

const ActiveAlertsCreateAlertButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [createAdminActiveAlerts, { isLoading: isLoadingactiveAlertsCreate }] =
    useCreateAdminActiveAlertsMutation()

  const handleCreateAlert = async (values) => {
    try {
      await createAdminActiveAlerts(values)
      setIsModalOpen(false)
      openNotification(values.event_description)
    } catch (err) {
      setErrMsg(ErrorMessage(err))
    }
  }
  const openNotification = (description) => {
    notification.success({
      message: 'Alert created',
      description: `${description}`,
    })
  }

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <section className={classes.CreatedAlertModal}>
      <button
        onClick={showModal}
        className={classes.CreatedAlertModal__ActiveAlertNotificationHeaderBtn}
      >
        {' '}
        <BsPlus size={30} />
        <span>Add Alert</span>
      </button>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={688}
        footer={null}
      >
        <div className={classes.CreatedAlertModal__ModalContent}>
          <div>
            <div
              className={
                classes.CreatedAlertModal__ActiveAlertAddAlertHeaderSection
              }
            >
              <div
                className={classes.CreatedAlertModal__ActiveAlertAddAlertHeader}
              >
                <BsBell />
              </div>
              <div>
                <p>Create Active Alert</p>
              </div>
            </div>
            <Divider />
            {errMsg && <Error Errormsg={errMsg} />}
            <div className={classes.CreatedAlertModal__ModalContentForm}>
              <Form
                name="basic"
                labelCol={{
                  span: 7,
                }}
                initialValues={{
                  remember: false,
                }}
                onFinish={handleCreateAlert}
                autoComplete="off"
                layout="horizontal"
                requiredMark="optional"
                labelAlign="left"
              >
                <Form.Item
                  label="Title"
                  name="title"
                  required
                  rules={[
                    {
                      required: true,
                      message: 'This field is required.',
                    },
                  ]}
                >
                  <Input
                    className={classes.CreatedAlertModal__AddAlertInput}
                    style={{ marginBottom: '-5px' }}
                    placeholder="Enter active alert title "
                  />
                </Form.Item>

                <Form.Item
                  label="Event Description"
                  name="event_description"
                  required
                  rules={[
                    {
                      required: true,
                      message: 'This field is required.',
                    },
                  ]}
                >
                  <Input.TextArea
                    className={classes.CreatedAlertModal__AddAlertInput}
                    style={{ marginTop: '-1px' }}
                    placeholder="Write instruction to help resolve alert."
                    rows={5}
                  />
                </Form.Item>
                <Form.Item>
                  <div className={classes.CreatedAlertModal__AddAlertBtn}>
                    <button onClick={handleOk}>Cancel</button>
                    <button type="submit">
                      {' '}
                      {isLoadingactiveAlertsCreate ? 'Loading...' : 'Submit'}
                    </button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  )
}

export default ActiveAlertsCreateAlertButton
