import { Input, Modal, Divider, Form } from 'antd'
import React, { useState } from 'react'
import {
  useGetAdminActiveAlertsQuery,
  useCreateAdminActiveAlertsMutation,
} from '../../../features/slices/activeAlerts/admin/adminActiveAlertSlice'
import { BsPlus, BsBell } from 'react-icons/bs'
import AdminPageLayout from '../../../components/Layout/AdminPageLayout/AdminPageLayout'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import classes from './ActiveAlert.module.scss'
import { SearchOutlined, CloudDownloadOutlined } from '@ant-design/icons'
import DataTable from '../../../components/Table/DataTable'
import { useEffect } from 'react'
import Loading from '../../../components/Loading/Loading'

const CreatedAlerts = () => {
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

  const [pageNum, setPageNum] = useState(1)
  const [table, setTable] = useState(null)
  const [errMsg, setErrMsg] = useState('')
  const [searchactiveAlerts, setSearchactiveAlerts] = useState('')
  const { data: dataTable, isLoading: isLoadingactiveAlertsTable } =
    useGetAdminActiveAlertsQuery({
      page: pageNum,
      search: searchactiveAlerts,
    })
  const [createAdminActiveAlerts, { isLoading: isLoadingactiveAlertsCreate }] =
    useCreateAdminActiveAlertsMutation()
  const onSearchChange = (e) => {
    console.log(e.target.value)
    setSearchactiveAlerts(e.target.value)
  }
  const handleCreateAlert = async (values) => {
    try {
      await createAdminActiveAlerts(values)
      setIsModalOpen(false)
    } catch (err) {
      if (err.status === 401) {
        setErrMsg(err?.data?.detail)
      } else if (err.status === 400) {
        setErrMsg(err?.data?.message)
      } else if (err.status === 500) {
        setErrMsg('Cannot connect to server.')
      } else {
        setErrMsg('Check your internet connection')
      }
    }
  }

  useEffect(() => {
    setTable(dataTable)
  }, [dataTable])
  const columns = [
    {
      key: 'title',
      title: 'Active Alerts',
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

  const ActiveAlertTableTitle = () => (
    <div className={classes.ActiveAlert__ActiveAlertTableHeader}>
      <p style={{ fontWeight: '500', fontSize: '18px' }}>Created Alert</p>
      <div className={classes.ActiveAlert__ActiveAlertTableHeaderFilter}>
        <div>
          <Input
            placeholder="Search"
            size="large"
            prefix={prefix}
            onChange={onSearchChange}
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
              items={['Active Alert/ Created Alerts']}
            />
          </div>
          <section
            className={classes.ActiveAlert__ActiveAlertNotificationHeader}
          >
            <button
              onClick={showModal}
              className={classes.ActiveAlert__ActiveAlertNotificationHeaderBtn}
            >
              {' '}
              <BsPlus size={30} />
              <span>Add Alert</span>
            </button>
            <Modal
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              width={688}
              footer={null}
            >
              <div className={classes.ActiveAlert__ModalContent}>
                <div>
                  <div
                    className={
                      classes.ActiveAlert__ActiveAlertAddAlertHeaderSection
                    }
                  >
                    <div
                      className={classes.ActiveAlert__ActiveAlertAddAlertHeader}
                    >
                      <BsBell />
                    </div>
                    <div>
                      <p>Create Active Alert</p>
                    </div>
                  </div>
                  <Divider />

                  <div className={classes.ActiveAlert__ModalContentForm}>
                    <Form
                      name="basic"
                      labelCol={{
                        span: 7,
                      }}
                      initialValues={{
                        remember: false,
                      }}
                      onFinish={handleCreateAlert}
                      autoComplete="off"
                      layout="horizontal"
                      requiredMark="optional"
                      labelAlign="left"
                    >
                      <Form.Item
                        label="Title"
                        name="title"
                        required
                        rules={[
                          {
                            required: true,
                            message: 'This field is required.',
                          },
                        ]}
                      >
                        <Input
                          className={classes.ActiveAlert__AddAlertInput}
                          style={{ marginBottom: '-5px' }}
                          placeholder="Enter active alert title "
                        />
                      </Form.Item>

                      <Form.Item
                        label="Event Description"
                        name="event_description"
                        required
                        rules={[
                          {
                            required: true,
                            message: 'This field is required.',
                          },
                        ]}
                      >
                        <Input.TextArea
                          className={classes.ActiveAlert__AddAlertInput}
                          style={{ marginTop: '-1px' }}
                          placeholder="Write instruction to help resolve alert."
                          rows={5}
                        />
                      </Form.Item>
                      <Form.Item>
                        <div className={classes.ActiveAlert__AddAlertBtn}>
                          <button onClick={handleOk}>Cancel</button>
                          <button type="submit">
                            {' '}
                            {isLoadingactiveAlertsCreate
                              ? 'Loading...'
                              : 'Submit'}
                          </button>
                        </div>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
              </div>
            </Modal>
          </section>
        </section>
        <section>
          {' '}
          <section className={classes.ActiveAlert__ActiveAlertCreateTable}>
            {table ? (
              <DataTable
                title={ActiveAlertTableTitle}
                columns={columns}
                dataSource={table}
                setPageNum={setPageNum}
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
