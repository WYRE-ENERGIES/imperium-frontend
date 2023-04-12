import { Input, Modal, Divider, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { BsPlus, BsBell } from 'react-icons/bs'
import { useGetAdminActiveAlertsLocationQuery } from '../../../features/slices/activeAlerts/admin/adminActiveAlertSlice'
import AdminPageLayout from '../../../components/Layout/AdminPageLayout/AdminPageLayout'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import classes from './ActiveAlert.module.scss'
import DataTable from '../../../components/ActiveAlert/Table/DataTable'
import { SearchOutlined, CloudDownloadOutlined } from '@ant-design/icons'
const LocationAlerts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [locationData, setLocationData] = useState([])
  const [pageNum, setPageNum] = useState(1)
  const [search, setSearch] = useState('')
  const { data, isLoading } = useGetAdminActiveAlertsLocationQuery({
    page: pageNum,
    search: search,
  })

  const onSearchChange = (e) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    setLocationData(data)
  }, [data])
  const ClientData = ({ data }) => {
    return (
      <section className={classes.ActiveAlert__ActiveAlertClient}>
        <div className={classes.ActiveAlert__ModalContentInit}>
          <div>
            <span>{data?.client_name[0]}</span>
            <span>{data?.client_name[0]}</span>
          </div>
        </div>
        <div>
          <p>{data?.client_name}</p>
          <span>{data?.client_email}</span>
        </div>
      </section>
    )
  }
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
  const prefix = (
    <SearchOutlined
      style={{
        fontSize: 16,
        color: '#808080',
      }}
    />
  )
  const ativeAlertTableTitle = () => (
    <div className={classes.ActiveAlert__ActiveAlertTableHeader}>
      <p style={{ fontWeight: '500', fontSize: '18px' }}>Location Alert</p>
      <div className={classes.ActiveAlert__ActiveAlertTableHeaderFilter}>
        <div>
          <Input
            placeholder="Search"
            size="large"
            onChange={onSearchChange}
            prefix={prefix}
            className={classes.ActiveAlert__SearchAndFilter}
          />
        </div>

        <div className={classes.ActiveAlert__ActiveAlertTableFilterExport}>
          <button>
            {' '}
            <CloudDownloadOutlined />
            <span style={{ marginLeft: '2px', color: '#C4C4C4' }}>Export</span>
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <AdminPageLayout>
      <section>
        {' '}
        <section className={classes.ActiveAlert__CreateActiveAlerts}>
          <div>
            <PageBreadcrumb
              title={'Active Alert'}
              items={['Active Alert/ Location Alerts']}
            />
          </div>
        </section>
        <section>
          {' '}
          <section className={classes.ActiveAlert__ActiveAlertLocationTable}>
            <DataTable
              title={ativeAlertTableTitle}
              columns={columns}
              dataSource={locationData}
              setPageNum={setPageNum}
            />
          </section>
        </section>
      </section>
    </AdminPageLayout>
  )
}

export default LocationAlerts
