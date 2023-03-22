import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import PageLayout from '../../../components/Layout/PageLayout'
import React, { useState } from 'react'
import ShsCapacityDropdown from '../../../components/ShsCapacityDropdown/ShsCapacityDropdown'

import alertIcon from '../../../../src/assets/widget-icons/alertIcon.svg'
import classes from './ActiveAlerts.module.scss'
import { useGetCustomerActiveAlertsQuery } from '../../../features/slices/activeAlerts/customer/customerActiveAlertSlice'
import { getItemFromLocalStorage } from '../../../utils/helpers'
import { useListClientShsDevicesQuery } from '../../../features/slices/allShsSlice'
import { useEffect } from 'react'
import ActiveAlertTable from '../../../components/ActiveAlert/Table/ActiveAlertTable'
import Loading from '../../../components/Loading/Loading'

const ActiveAlerts = () => {
  const title = () => (
    <p style={{ fontWeight: '500', fontSize: '18px' }}>Active Alerts Table</p>
  )
  const clientId = getItemFromLocalStorage('current_client')
  const [activeAlertsTable, setActiveAlertsTable] = useState(1)
  const [shsDevices, setShsDevices] = useState(1)
  const [page, setPage] = useState(1)

  const { data: shsDevicesData, isLoading: shsDevicesIsLoading } =
    useListClientShsDevicesQuery({
      client_id: clientId,
    })
  const { data: activeAlerts, isLoading: activeAlertsIsLoading } =
    useGetCustomerActiveAlertsQuery({
      client_id: clientId,
      page: page,
      device_id: 1,
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
      dataIndex: 'activeAlert',
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
      title: 'Time',
      dataIndex: 'time',
    },
    {
      title: 'Event Description',
      dataIndex: 'eventDescription',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => {
        const color = status === 'Resolved' ? '#5C9D48' : '#D92D20'
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
          <ShsCapacityDropdown />
        </section>
        <section className={classes.ActiveAlerts__Banner}>
          {activeAlerts ? (
            <div>
              {' '}
              <div className={classes.ActiveAlerts__Status}>
                <div>
                  <h1>
                    You have <span>2</span> recent alerts
                  </h1>
                </div>
                <div>
                  <div className={classes.ActiveAlerts__Dot}></div>
                  <p>Today</p>
                </div>
              </div>
              <div>
                <div className={classes.ActiveAlerts__Description}>
                  <div className={classes.ActiveAlerts__Error}>
                    <p>
                      <strong>Abnormal load </strong> Check that the load does
                      not exceed requirement
                    </p>
                    <span>12:37pm</span>
                  </div>
                  <div className={classes.ActiveAlerts__Success}>
                    <p>
                      <strong>Low battery volage </strong> Check that the load
                      does not exceed requirement
                    </p>
                    <span>12:37pm</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Loading data={'most recent alerts...'} />
          )}
        </section>
        <section className={classes.ActiveAlerts__Table}>
          {activeAlertsTable ? (
            <ActiveAlertTable
              title={title}
              columns={columns}
              dataSource={activeAlertsTable}
              pagination={{
                position: ['none', 'none'],
              }}
            />
          ) : (
            <Loading data={'active alerts table...'} />
          )}
        </section>
      </section>
    </PageLayout>
  )
}

export default ActiveAlerts
