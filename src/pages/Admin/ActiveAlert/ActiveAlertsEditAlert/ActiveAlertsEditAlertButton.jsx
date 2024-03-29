import React, { useEffect, useState } from 'react'
import { useUpdateAdminActiveAlertsMutation } from '../../../../features/slices/activeAlerts/admin/adminActiveAlertSlice'
import { ErrorMessage } from '../../../../components/ErrorMessage/ErrorMessage'
import { Divider, Form, Input, Modal, notification } from 'antd'

import { BsBell } from 'react-icons/bs'
// import classes from './ActiveAlertsCreateAlertButton.module.scss'
import classes from './ActiveAlertsEditAlertButton.module.scss'
import Error from '../../../../components/ErrorMessage/Error'

const ActiveAlertsEditAlertButton = ({
  alertId,
  setDisplayShowModal,
  displayShowModal,
  title,
  description,
}) => {
  const [form] = Form.useForm()
  const [errMsg, setErrMsg] = useState('')
  const [updateAdminActiveAlerts, { isLoading: isLoadingactiveAlertsUpdate }] =
    useUpdateAdminActiveAlertsMutation()

  const handleUpdateAlert = async (values) => {
    try {
      await updateAdminActiveAlerts({ alertId, values })
      setDisplayShowModal(false)
      openNotification(values.title)
    } catch (err) {
      setErrMsg(ErrorMessage(err))
    }
  }
  const openNotification = (description) => {
    notification.success({
      message: 'Alert updated',
      description: `${description}`,
    })
  }

  useEffect(() => {
    form.setFieldsValue({
      title: title,
      event_description: description,
    })
  }, [alertId])

  const handleOk = () => {
    setDisplayShowModal(false)
  }
  const handleCancel = () => {
    setDisplayShowModal(false)
  }
  return (
    <section className={classes.CreatedAlertModal}>
      <Modal
        open={displayShowModal}
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
                <p>Update Active Alert</p>
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
                onFinish={handleUpdateAlert}
                autoComplete="off"
                layout="horizontal"
                requiredMark="optional"
                labelAlign="left"
                form={form}
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
                    placeholder="Edit alert title "
                    disabled={isLoadingactiveAlertsUpdate}
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
                    placeholder="Make your changes to help resolve alert."
                    rows={5}
                    disabled={isLoadingactiveAlertsUpdate}
                  />
                </Form.Item>
                <Form.Item>
                  <div className={classes.CreatedAlertModal__AddAlertBtn}>
                    <button onClick={handleOk}>Cancel</button>
                    <button type="submit">
                      {' '}
                      {isLoadingactiveAlertsUpdate ? 'Loading...' : 'Update'}
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

export default ActiveAlertsEditAlertButton
