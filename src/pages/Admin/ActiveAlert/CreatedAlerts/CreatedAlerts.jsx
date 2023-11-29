import React, { useState } from 'react'
import {
  useGetAdminActiveAlertsQuery,
  useCreateAdminActiveAlertsMutation,
} from '../../../../features/slices/activeAlerts/admin/adminActiveAlertSlice'
import AdminPageLayout from '../../../../components/Layout/AdminPageLayout/AdminPageLayout'
import PageBreadcrumb from '../../../../components/PageBreadcrumb/PageBreadcrumb'
import classes from './CreatedAlerts.module.scss'
import DataTable from '../../../../components/Table/DataTable'
import { useEffect } from 'react'
import Loading from '../../../../components/Loading/Loading'
import ActiveAlertsCreateAlertButton from '../ActiveAlertsCreateAlertButton/ActiveAlertsCreateAlertButton'

const CreatedAlerts = () => {
  const [pageNum, setPageNum] = useState(1)
  const [table, setTable] = useState(null)
  const [errMsg, setErrMsg] = useState('')
  const [searchactiveAlerts, setSearchactiveAlerts] = useState('')
  const {
    data: dataTable,
    isLoading: isLoadingactiveAlertsTable,
    isFetching,
  } = useGetAdminActiveAlertsQuery({
    page: pageNum,
    search: searchactiveAlerts,
  })
  const [createAdminActiveAlerts, { isLoading: isLoadingactiveAlertsCreate }] =
    useCreateAdminActiveAlertsMutation()
  const onSearchChange = (e) => {
    console.log(e.target.value)
    setSearchactiveAlerts(e.target.value)
  }

  useEffect(() => {
    setTable(dataTable)
  }, [dataTable])
  const columns = [
    {
      key: 'title',
      title: 'Alerts Title',
      dataIndex: 'title',
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
      key: 'event_description',
      title: 'Event Description',
      dataIndex: 'event_description',
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
  ]

  return (
    <AdminPageLayout>
      <section className={classes.CreatedAlerts}>
        {' '}
        <section className={classes.CreatedAlerts__CreateActiveAlerts}>
          <div>
            <PageBreadcrumb
              title={'Active Alert'}
              items={['Active Alert/ Created Alerts']}
            />
          </div>
          <div className={classes.CreatedAlerts__CreateActiveAlertsButton}>
            {' '}
            <ActiveAlertsCreateAlertButton />
          </div>
        </section>
        <section>
          {' '}
          <section className={classes.CreatedAlerts__ActiveAlertCreateTable}>
            {table ? (
              <DataTable
                title={'Created Alerts'}
                columns={columns}
                dataSource={table}
                searchTable={setSearchactiveAlerts}
                setPageNum={setPageNum}
                isLoading={isFetching}
                url={'imperium-admin/active-alert/export'}
              />
            ) : (
              <Loading data={'Table'} />
            )}
          </section>
        </section>
      </section>
    </AdminPageLayout>
  )
}

export default CreatedAlerts
