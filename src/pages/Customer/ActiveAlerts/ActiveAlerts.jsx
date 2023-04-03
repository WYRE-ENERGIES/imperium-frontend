import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import PageLayout from '../../../components/Layout/PageLayout'
import React, { useState } from 'react'
import ShsCapacityDropdown from '../../../components/ShsCapacityDropdown/ShsCapacityDropdown'

import alertIcon from '../../../../src/assets/widget-icons/alertIcon.svg'
import classes from './ActiveAlerts.module.scss'
import { useGetCustomerActiveAlertsQuery } from '../../../features/slices/activeAlerts/customer/customerActiveAlertSlice'
import {
  dateTimeConverter,
  getItemFromLocalStorage,
  RecentAlerts,
} from '../../../utils/helpers'
import { useListClientShsDevicesQuery } from '../../../features/slices/allShsSlice'
import { useEffect } from 'react'
import ActiveAlertTable from '../../../components/ActiveAlert/Table/ActiveAlertTable'
import Loading from '../../../components/Loading/Loading'

const ActiveAlerts = () => {
  const title = () => (
    <p style={{ fontWeight: '500', fontSize: '18px' }}>Active Alerts Table</p>
  )
  const today = new Date()
  const clientId = getItemFromLocalStorage('current_client')
  const [activeAlertsTable, setActiveAlertsTable] = useState(1)
  const [shsDevices, setShsDevices] = useState(1)
  const [deviceId, setDeviceId] = useState(1)
  const [page, setPage] = useState(1)

  const { data: shsDevicesData, isLoading: shsDevicesIsLoading } =
    useListClientShsDevicesQuery({
      client_id: clientId,
    })
  const { data: activeAlerts, isLoading: activeAlertsIsLoading } =
    useGetCustomerActiveAlertsQuery({
      client_id: clientId,
      page: page,
      device_id: 20,
    })
  const columns = [
    {
      title: ' ',
      dataIndex: 'icon',
      render: (text) => (
        <span>
          <img
            src={alertIcon}
            alt=""
            srcSet=""
            style={{ marginRight: '5px' }}
          />
        </span>
      ),
    },
    {
      title: 'Active Alert',
      dataIndex: 'active_alert',
      render: (text) => (
        <span
          style={{
            color: 'black',
          }}
        >
          {text}
        </span>
      ),
    },
    {
      key: 'time',
      title: 'Time',
      dataIndex: 'time',
      render: (data) => (
        <span
          style={{
            color: 'black',
          }}
        >
          {dateTimeConverter(data)}
        </span>
      ),
    },
    {
      title: 'Event Description',
      dataIndex: 'event_description',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => {
        const color = status === 'RESOLVED' ? '#5C9D48' : '#D92D20'
        return (
          <span
            style={{
              color: color,
            }}
          >
            {status}
          </span>
        )
      },
    },
  ]

  useEffect(() => {
    setActiveAlertsTable(activeAlerts)
    setShsDevices(shsDevicesData)
  }, [shsDevicesData, activeAlerts])

  return (
    <PageLayout>
      <section className={classes.ActiveAlerts}>
        <section className={classes.ActiveAlerts__headerSection}>
          <PageBreadcrumb title="Active Alert" items={['Active Alert']} />
          <ShsCapacityDropdown setDeviceId={setDeviceId} />
        </section>
        <section className={classes.ActiveAlerts__Banner}>
          {activeAlertsIsLoading ? (
            <Loading data={'active alerts'} />
          ) : activeAlerts ? (
            <div>
              {' '}
              <div className={classes.ActiveAlerts__Status}>
                <div>
                  <h1>You have recent alerts</h1>
                </div>
                <div>
                  <div className={classes.ActiveAlerts__Dot}></div>
                  <p>Today</p>
                </div>
              </div>
              <div>
                <div className={classes.ActiveAlerts__Description}>
                  {activeAlerts?.results.slice(0, 2).map((data, key) => (
                    <div
                      className={
                        data?.status === 'RESOLVED'
                          ? classes.ActiveAlerts__Success
                          : classes.ActiveAlerts__Error
                      }
                      key={key}
                    >
                      <p>
                        <strong>{data?.active_alert} </strong>
                        {data?.event_description}
                      </p>
                      <span>{dateTimeConverter(data?.time)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            'No active alerts'
          )}
        </section>
        <section className={classes.ActiveAlerts__Table}>
          {activeAlertsIsLoading ? (
            <Loading data={'active alerts'} />
          ) : (
            <ActiveAlertTable
              title={title}
              columns={columns}
              dataSource={activeAlertsTable}
              pagination={{
                position: ['none', 'none'],
              }}
            />
          )}
        </section>
      </section>
    </PageLayout>
  )
}

export default ActiveAlerts
