import React, { useState } from 'react'
import classes from './ActiveAlertsNotification.module.scss'
import {
  useCreateAdminActiveAlertsMutation,
  useGetAdminActiveAlertsQuery,
  useUpdateAdminActiveAlertsMutation,
} from '../../../../features/slices/activeAlerts/admin/adminActiveAlertSlice'
import { Button, Divider, Form, Input, Modal, notification } from 'antd'
import { ErrorMessage } from '../../../../components/ErrorMessage/ErrorMessage'
import Error from '../../../../components/ErrorMessage/Error'
import { BsBell, BsPlus, BsThreeDots } from 'react-icons/bs'
import Loading from '../../../../components/Loading/Loading'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import ActiveAlertsCreateAlertButton from '../ActiveAlertsCreateAlertButton/ActiveAlertsCreateAlertButton'
import ActiveAlertsEditAlertButton from '../ActiveAlertsEditAlert/ActiveAlertsEditAlertButton'
const ActiveAlertsNotifcation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [activeAlertsData, setActiveAlertData] = useState(1)
  const { data: activeAlerts, isLoading: isLoadingactiveAlerts } =
    useGetAdminActiveAlertsQuery({
      page: 1,
    })

  const [createAdminActiveAlerts, { isLoading: isLoadingactiveAlertsCreate }] =
    useCreateAdminActiveAlertsMutation()
  const openNotification = (description) => {
    notification.success({
      message: 'Alert created',
      description: `${description}`,
    })
  }
  const alertId = activeAlerts?.results[0].id
  const [updateAdminActiveAlerts, { isLoading: isLoadingactiveAlertsUpdate }] =
    useUpdateAdminActiveAlertsMutation()
  const openUpdateNotification = (description) => {
    notification.success({
      message: 'Alert updated',
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
  const handleCreateAlert = async (values) => {
    try {
      await createAdminActiveAlerts(values)
      setIsModalOpen(false)
      openNotification(values.event_description)
    } catch (err) {
      setErrMsg(ErrorMessage(err))
    }
  }

  useEffect(() => {
    setActiveAlertData(activeAlerts)
  }, [activeAlerts])

  return (
    <section className={classes.Notifcation}>
      {' '}
      <div className={classes.Notifcation__ActiveAlertNotification}>
        <div className={classes.Notifcation__ActiveAlertNotificationHeader}>
          <div>
            <h1>Active Alerts</h1>
          </div>

          <ActiveAlertsCreateAlertButton />
        </div>

        <div className={classes.Notifcation__ActiveAlertNotificationList}>
          {isLoadingactiveAlerts ? (
            <Loading data={'active alerts...'} />
          ) : activeAlertsData ? (
            activeAlerts?.results.slice(0, 3).map((alert, key) => (
              <div key={key}>
                <span>
                  {/* <BsThreeDots /> */}
                  <ActiveAlertsEditAlertButton alertId={alertId} />
                </span>
                <div>
                  <p>{alert?.title}</p>
                  <p>{alert?.event_description} </p>
                </div>
              </div>
            ))
          ) : (
            'No active alerts'
          )}
        </div>
        <div className={classes.Notifcation__ActiveAlertNotificationViewBtn}>
          <Link to={'/admin/active-alerts/created-alerts'}>
            View Created Alert
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ActiveAlertsNotifcation
