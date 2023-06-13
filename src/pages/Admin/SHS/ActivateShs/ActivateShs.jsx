import { Button, Form, Modal, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
// import { notification } from 'antd'

import ButtonLoader from '../../../../components/ButtonLoader/ButtonLoader'
import { ReactComponent as DisableTicketIcon } from '../../../../assets/widget-icons/disable-caution-icon.svg'
import { ReactComponent as TicketIcon } from '../../../../assets/widget-icons/caution-icon.svg'
import classes from '../../Customers/SHSForm/SHSForm.module.scss'
import { useDeactivateDeviceMutation } from '../../../../features/slices/allShsSlice'

const { Text, Title } = Typography

const ActivateContent = ({ shs, toggleModal }) => {
  const [errorMsg, setErrorMsg] = useState()
  const { id: shsId, status } = shs
  const title = status === 'OFF' ? 'Activate SHS' : 'Disabled SHS'
  const TIcon = status === 'OFF' ? TicketIcon : DisableTicketIcon

  // const openNotification = () => {
  //   notification.open({
  //     message: 'Notification Title',
  //     description:
  //       'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
  //   })
  // }

  const [deactivateDevice, { isLoading, isSuccess, data, isError }] =
    useDeactivateDeviceMutation()
  const handleDeactivateDevice = async () => {
    try {
      await deactivateDevice({
        shsId,
        data: { deactivate: status !== 'OFF' },
      }).unwrap()
      toast.success(
        `Device ${data.device_switch_state === 'ON' ? 'Enabled' : 'Disabled'}`,
        {
          hideProgressBar: true,
          autoClose: 3000,
          theme: 'colored',
        },
      )
      toggleModal()
    } catch (error) {
      setErrorMsg(error?.data?.message)
    }
  }
  // useEffect(() => {
  //   if (!isLoading && isSuccess) {
  //     toast.success(
  //       `Device ${data.device_switch_state === 'ON' ? 'Enabled' : 'Disabled'}`,
  //       {
  //         hideProgressBar: true,
  //         autoClose: 3000,
  //         theme: 'colored',
  //       },
  //     )
  //     toggleModal()
  //   }
  // }, [isLoading, isSuccess, data])

  return (
    <div>
      <div className={classes.SHSForm__header}>
        <TIcon style={{ marginBottom: '15px' }} />
        <Title
          level={5}
          className={classes.SHSForm__title}
          style={{ marginTop: 4 }}
        >
          {title}
        </Title>
        {isError ? (
          errorMsg
        ) : (
          <Text type="secondary" className={classes.SHSForm__subTitle}>
            {status === 'OFF'
              ? 'Enable this SHS'
              : 'By disabling this SHS, you will stop collecting data from the SHS.Would you like to proceed?'}
          </Text>
        )}
      </div>
      <div className={classes.AddSHSForm__btn}>
        <Button
          className={classes.AddSHSForm__cancelBtn}
          type="default"
          onClick={toggleModal}
        >
          Cancel
        </Button>
        <Button
          className={classes.AddSHSForm__submitBtn}
          onClick={handleDeactivateDevice}
          htmlType="button"
        >
          {isLoading ? <ButtonLoader color="#fff" /> : 'Proceed'}
        </Button>
      </div>
      <ToastContainer />
    </div>
  )
}

const ActivateShs = ({ shs, isOpen, toggleModal }) => {
  return (
    <Modal
      centered
      open={isOpen}
      onOk={toggleModal}
      onCancel={toggleModal}
      width={400}
      footer={null}
    >
      <ActivateContent toggleModal={toggleModal} shs={shs} />
    </Modal>
  )
}

export default ActivateShs
