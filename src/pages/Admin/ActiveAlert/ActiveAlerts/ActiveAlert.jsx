import React, { useState } from 'react'

import { useGetAdminActiveAlertsTableQuery } from '../../../../features/slices/activeAlerts/admin/adminActiveAlertSlice'

import classes from './ActiverAlerts.module.scss'
import DataTable from '../../../../components/Table/DataTable'
import { useEffect } from 'react'
import { dateTimeConverter } from '../../../../utils/helpers'
import Loading from '../../../../components/Loading/Loading'
import AdminPageLayout from '../../../../components/Layout/AdminPageLayout/AdminPageLayout'
import PageBreadcrumb from '../../../../components/PageBreadcrumb/PageBreadcrumb'
import ActiveAlertsWidgets from '../ActiveAlertsWidgets/ActiveAlertsWidgets'
import ActiveAlertsNotification from '../ActiveAlertsNotification/ActiveAlertsNotification'
import ActiveAlertsCharts from '../ActiveAlertsChart/ActiveAlertsCharts'
import ActiveAlertShsDetails from '../ActiveAlertShsDetails/ActiveAlertShsDetails'

const ActiveAlert = () => {
  const columns = [
    {
      key: 'active_alert',
      title: 'Active Alerts',
      dataIndex: 'active_alert',
      render: (data) => (
        <span
          style={{
            color: 'black',
          }}
        >
          {data}
        </span>
      ),
    },
    {
      key: 'shs_name',
      title: 'Solar House System(SHS)',
      dataIndex: 'shs_name',
      render: (data) => (
        <span
          style={{
            color: 'black',
          }}
        >
          {data}
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
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      render: (data) => (
        <span
          style={{
            color: data === 'RESOLVED' ? '#5C9D48' : '#B42318',
          }}
        >
          {data}
        </span>
      ),
    },
    {
      key: '5',
      title: <span style={{ color: '#f0f7ed' }}>i</span>,
      dataIndex: ['shs_name', 'active_alert'],
      render: (text, record) => <ActiveAlertShsDetails data={record} />,
    },
  ]

  const [table, setTable] = useState([])
  const [pageNum, setPageNum] = useState(1)
  const [alertStatus, setAlertStatus] = useState('')

  const [searchActiveAlertsTable, setSearchActiveAlertsTable] = useState('')

  const {
    data: dataTable,
    isLoading: isLoadingTable,
    isFetching: isFetchingTable,
  } = useGetAdminActiveAlertsTableQuery({
    page: pageNum,
    search: searchActiveAlertsTable,
    status: alertStatus,
  })

  useEffect(() => {
    setTable(dataTable)
  }, [dataTable])

  return (
    <AdminPageLayout>
      <section className={classes.ActiveAlert}>
        <section>
          <PageBreadcrumb title={'Active Alert'} items={['Active Alert']} />
        </section>

        <ActiveAlertsWidgets />

        <section className={classes.ActiveAlert__ActiveAlertSection}>
          <ActiveAlertsNotification />
          <ActiveAlertsCharts />
        </section>
        <section className={classes.ActiveAlert__ActiveAlertTable}>
          {isLoadingTable ? (
            <Loading data={'table...'} />
          ) : (
            <DataTable
              title={'Active Alerts Table'}
              columns={columns}
              dataSource={table}
              searchTable={setSearchActiveAlertsTable}
              sortTable={setAlertStatus}
              setPageNum={setPageNum}
              isLoading={isFetchingTable}
              url={'imperium-admin/active-alert/table/export'}
              tableName={'active_alerts_table'}
            />
          )}
        </section>
      </section>
    </AdminPageLayout>
  )
}

export default ActiveAlert
