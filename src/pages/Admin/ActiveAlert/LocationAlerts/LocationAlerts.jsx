import React, { useEffect, useState } from 'react'
import { useGetAdminActiveAlertsLocationQuery } from '../../../../features/slices/activeAlerts/admin/adminActiveAlertSlice'
import AdminPageLayout from '../../../../components/Layout/AdminPageLayout/AdminPageLayout'
import PageBreadcrumb from '../../../../components/PageBreadcrumb/PageBreadcrumb'
import classes from './LocationAlerts.module.scss'
import DataTable from '../../../../components/Table/DataTable'
import ClientData from './ClientData'
const LocationAlerts = () => {
  const [locationData, setLocationData] = useState([])
  const [pageNum, setPageNum] = useState(1)
  const [search, setSearch] = useState('')
  const { data, isLoading, isFetching } = useGetAdminActiveAlertsLocationQuery({
    page: pageNum,
    search: search,
  })

  useEffect(() => {
    setLocationData(data)
  }, [data])

  const columns = [
    {
      key: 'id',
      title: 'Client',
      dataIndex: ['id', 'client_name'],
      render: (data, record) => <ClientData data={record} />,
    },
    {
      key: 'device_name',
      title: 'SHS',
      dataIndex: 'device_name',
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
      key: 'address',
      title: 'Location Address',
      dataIndex: 'address',
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
      <section className={classes.Location}>
        {' '}
        <section>
          <div>
            <PageBreadcrumb
              title={'Active Alert'}
              items={['Active Alert/ Location Alerts']}
            />
          </div>
        </section>
        <section>
          {' '}
          <section className={classes.Location__ActiveAlertLocationTable}>
            <DataTable
              title={'Location Alerts'}
              columns={columns}
              dataSource={data}
              searchTable={setSearch}
              setPageNum={setPageNum}
              isLoading={isFetching}
              url={'imperium-admin/active-alert/location/export/'}
            />
          </section>
        </section>
      </section>
    </AdminPageLayout>
  )
}

export default LocationAlerts
