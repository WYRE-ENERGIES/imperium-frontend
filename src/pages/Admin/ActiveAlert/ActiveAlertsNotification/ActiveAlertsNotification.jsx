import React, { useState } from 'react'
import classes from './ActiveAlertsNotification.module.scss'
import { useGetAdminActiveAlertsQuery } from '../../../../features/slices/activeAlerts/admin/adminActiveAlertSlice'
import { Dropdown, Space } from 'antd'

import { BsThreeDots } from 'react-icons/bs'
import Loading from '../../../../components/Loading/Loading'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import ActiveAlertsCreateAlertButton from '../ActiveAlertsCreateAlertButton/ActiveAlertsCreateAlertButton'
import ActiveAlertsEditAlertButton from '../ActiveAlertsEditAlert/ActiveAlertsEditAlertButton'

const ActiveAlertsNotifcation = () => {
  const [activeAlertsData, setActiveAlertData] = useState(1)
  const [displayShowModal, setDisplayShowModal] = useState(false)
  const [currentActiveAlert, setCurrentActiveAlert] = useState(false)

  const { data: activeAlerts, isLoading: isLoadingactiveAlerts } =
    useGetAdminActiveAlertsQuery({
      page: 1,
    })

  const items = [
    {
      key: '1',
      label: (
        <div
          onClick={() => {
            setDisplayShowModal(true)
          }}
        >
          Edit Active Alert
        </div>
      ),
    },
  ]
  const menuProps = {
    items,
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
                  <Space wrap>
                    <Dropdown
                      menu={menuProps}
                      onOpenChange={() => setCurrentActiveAlert(alert)}
                    >
                      <BsThreeDots />
                    </Dropdown>
                  </Space>
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
          <ActiveAlertsEditAlertButton
            alertId={currentActiveAlert.id}
            activeAlerts={activeAlerts}
            setDisplayShowModal={setDisplayShowModal}
            displayShowModal={displayShowModal}
            title={currentActiveAlert?.title}
            description={currentActiveAlert?.event_description}
          />
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
