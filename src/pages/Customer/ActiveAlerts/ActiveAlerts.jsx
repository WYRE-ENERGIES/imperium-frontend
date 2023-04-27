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
import DataTable from '../../../components/Table/DataTable'
import Loading from '../../../components/Loading/Loading'

const ActiveAlerts = () => {
  const title = () => {
    return (
      <p style={{ fontWeight: '500', fontSize: '18px' }}>Active Alerts Table</p>
    )
  }
  const today = new Date()
  const clientId = getItemFromLocalStorage('current_client')
  const [activeAlertsTable, setActiveAlertsTable] = useState(1)
  const [page, setPage] = useState(1)
  const [shsId, setShsId] = useState()

  const {
    data: activeAlerts,
    isLoading: IsLoading,
    isFetching: isFetching,
  } = useGetCustomerActiveAlertsQuery(
    {
      client_id: clientId,
      shs_id: shsId,
      page: page,
    },
    { skip: !shsId },
  )

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
  }, [activeAlerts])

  return (
    <PageLayout>
      <section className={classes.ActiveAlerts}>
        <section className={classes.ActiveAlerts__headerSection}>
          <PageBreadcrumb title="Active Alert" items={['Active Alert']} />
          <ShsCapacityDropdown setDeviceId={setShsId} />
        </section>
        <section className={classes.ActiveAlerts__Banner}>
          {IsLoading ? (
            <Loading data={'active alerts'} />
          ) : activeAlerts ? (
            <div>
              {' '}
              <div className={classes.ActiveAlerts__Status}>
                <div>
                  <h1>You have {activeAlerts?.results.length} recent alerts</h1>
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
          {IsLoading ? (
            <Loading data={'active alerts'} />
          ) : (
            <DataTable
              title={'Active Alerts Table'}
              columns={columns}
              dataSource={activeAlertsTable}
              setPageNum={setPage}
              isLoading={isFetching}
            />
          )}
        </section>
      </section>
    </PageLayout>
  )
}

export default ActiveAlerts
