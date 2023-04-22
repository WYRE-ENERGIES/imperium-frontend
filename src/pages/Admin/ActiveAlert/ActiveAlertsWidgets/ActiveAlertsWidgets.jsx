import React, { useState, useEffect } from 'react'
import classes from './ActiveAlertsWidgets.module.scss'
import {
  BsArrowUp,
  BsArrowsMove,
  BsBell,
  BsBellSlash,
  BsThreeDots,
} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { Skeleton, Tag } from 'antd'
import alertCreated from '../../../../assets/widget-icons/greenGraph.svg'
import alertResolved from '../../../../assets/widget-icons/yellowGraph.svg'
import { useGetAdminActiveAlertsAnalyticsQuery } from '../../../../features/slices/activeAlerts/admin/adminActiveAlertSlice'

const ActiveAlertsWidgets = () => {
  const [activeAlertsDataAnalytics, setActiveAlertDataAnalytics] = useState([])
  const {
    data: activeAlertsAnalytics,
    isLoading: isLoadingactiveAlertsAnalytics,
  } = useGetAdminActiveAlertsAnalyticsQuery()

  useEffect(() => {
    setActiveAlertDataAnalytics(activeAlertsAnalytics)
  }, [activeAlertsAnalytics])

  return (
    <section className={classes.ActiveAlertWidgets}>
      <div className={classes.ActiveAlertWidgets__WidgetSection}>
        <div className={classes.ActiveAlertWidgets__WidgetLeftContent}>
          <Skeleton loading={isLoadingactiveAlertsAnalytics}>
            <div className={classes.ActiveAlertWidgets__WidgetIcon}>
              <BsBell color={'#497A38'} size={15} />
            </div>
            <div className={classes.ActiveAlertWidgets__WidgetText}>
              <p>Active alerts created</p>
              <h1 className={classes.ActiveAlertWidgets__WidgetValue}>
                {activeAlertsDataAnalytics?.active_alerts_created}
              </h1>
            </div>
            <div className={classes.ActiveAlertWidgets__WidgetGraphOne}>
              <img src={alertCreated} alt="alert created" />
            </div>
          </Skeleton>
        </div>

        <div className={classes.ActiveAlertWidgets__WidgetRightContent}>
          <div className={classes.ActiveAlertWidgets__WidgetRight}>
            <Skeleton loading={isLoadingactiveAlertsAnalytics}>
              <div className={classes.ActiveAlertWidgets__WidgetIcon}>
                <BsBellSlash color={'#497A38'} size={15} />
              </div>
              <div className={classes.ActiveAlertWidgets__WidgetText}>
                <p>Total number of resolved alert</p>
                <div className={classes.ActiveAlertWidgets__WidgetVal}>
                  <h1 className={classes.ActiveAlertWidgets__WidgetValue}>
                    {activeAlertsDataAnalytics?.total_unresolved_alerts}
                  </h1>
                  <div className={classes.ActiveAlertWidgets__WidgetGraphTwo}>
                    <img src={alertResolved} alt="" srcSet="" />
                  </div>
                </div>
              </div>
            </Skeleton>
          </div>
          <div className={classes.ActiveAlertWidgets__WidgetCenter}>
            <Skeleton loading={isLoadingactiveAlertsAnalytics}>
              <div className={classes.ActiveAlertWidgets__WidgetIcon}>
                <BsArrowsMove color={'#497A38'} size={15} />
              </div>
              <div className={classes.ActiveAlertWidgets__WidgetText}>
                <p>Device location alert</p>
                <h1 className={classes.ActiveAlertWidgets__WidgetValue}>
                  {activeAlertsDataAnalytics?.device_location_alerts}
                </h1>
              </div>
              <div className={classes.ActiveAlertWidgets__WidgetExtra}>
                <div>
                  <Link to={'/admin/active-alerts/location-alerts'}>
                    {' '}
                    <BsThreeDots color={'#292D32'} size={15} />
                  </Link>
                </div>
                <div>
                  <Tag
                    key={'1'}
                    style={{
                      borderRadius: '16px',
                      color: '#039855',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: 500,
                      lineHeight: '20px',
                      background: ' #ECFDF3',
                    }}
                  >
                    <BsArrowUp color={'#039855'} size={15} /> 19%
                  </Tag>
                </div>
              </div>
            </Skeleton>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ActiveAlertsWidgets
