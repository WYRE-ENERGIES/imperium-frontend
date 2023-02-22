import { Input, Modal, Divider, Form } from 'antd'
import React, { useState } from 'react'
import { BsPlus, BsBell } from 'react-icons/bs'
import AdminPageLayout from '../../../components/Layout/AdminPageLayout/AdminPageLayout'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import classes from './ActiveAlert.module.scss'
import ActiveAlertTable from '../../../components/ActiveAlert/Table/ActiveAlertTable'
import { SearchOutlined, CloudDownloadOutlined } from '@ant-design/icons'
import activeAlertdata from '../../../components/ActiveAlert/Data/data'
const LocationAlerts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const onFinish = (values) => {
    console.log('Success:', values)
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const ClientData = (data) => {
    return (
      <section className={classes.ActiveAlert__ActiveAlertClient}>
        <div className={classes.ActiveAlert__ModalContentInit}>
          <div>
            {' '}
            <span>{data?.data.fname[0]}</span>
            <span>{data?.data.lname[0]}</span>
          </div>
        </div>
        <div>
          <p>{data?.data.username}</p>
          <span>{data?.data.email}</span>
        </div>
      </section>
    )
  }
  const columns = [
    {
      key: '1',
      title: 'Client',
      dataIndex: 'info',
      render: (data) => <ClientData data={data} />,
    },
    {
      key: '2',
      title: 'SHS',
      dataIndex: 'shs',
      render: (data) => (
        <span
          style={{
            color: 'black',
          }}
        >
          {data[0]?.name}
        </span>
      ),
    },
    {
      key: '3',
      title: 'Location Address',
      dataIndex: 'shs',
      render: (data) => (
        <span
          style={{
            color: 'black',
          }}
        >
          {data[0]?.location}
        </span>
      ),
    },
  ]

  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }

  const ativeAlertTableTitle = () => (
    <div className={classes.ActiveAlert__ActiveAlertTableHeader}>
      <p style={{ fontWeight: '500', fontSize: '18px' }}>Location Alert</p>
      <div className={classes.ActiveAlert__ActiveAlertTableHeaderFilter}>
        <div>
          <Input
            placeholder="Search"
            size="large"
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
  const prefix = (
    <SearchOutlined
      style={{
        fontSize: 16,
        color: '#808080',
      }}
    />
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
            <ActiveAlertTable
              title={ativeAlertTableTitle}
              columns={columns}
              dataSource={activeAlertdata}
            />
          </section>
        </section>
      </section>
    </AdminPageLayout>
  )
}

export default LocationAlerts
