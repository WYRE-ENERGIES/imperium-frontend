import { Tag, Select, Space, Input, Modal, Divider, Form } from 'antd'
import React, { useState } from 'react'
import {
  useGetAdminActiveAlertsQuery,
  useGetAdminActiveAlertsAnalyticsQuery,
  useGetAdminActiveAlertsStatisticsQuery,
  useGetAdminActiveAlertsTableQuery,
  useCreateAdminActiveAlertsMutation,
} from '../../../features/slices/activeAlerts/admin/adminActiveAlertSlice'
import { MdFilterList } from 'react-icons/md'
import {
  BsArrowsMove,
  BsArrowUp,
  BsBell,
  BsBellSlash,
  BsHouse,
  BsPlus,
  BsThreeDots,
} from 'react-icons/bs'
import Chart from 'react-apexcharts'
import AdminPageLayout from '../../../components/Layout/AdminPageLayout/AdminPageLayout'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import alertCreated from '../../../assets/widget-icons/greenGraph.svg'
import alertResolved from '../../../assets/widget-icons/yellowGraph.svg'
import classes from './ActiveAlert.module.scss'
import { SearchOutlined, CloudDownloadOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import ActiveAlertTable from '../../../components/ActiveAlert/Table/ActiveAlertTable'
import { useEffect } from 'react'

const dateTimeOption = {
  timeZone: 'Africa/Accra',
  hour12: true,
  hour: 'numeric',
  minute: 'numeric',
  seconds: 'numeric',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}
const ActiveAlertDetails = (data) => {
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

  return (
    <div>
      <div onClick={showModal}>
        <span className={classes.ActiveAlert__DetailView}>View</span>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        className={classes.ActiveAlert__ActiveAlertNotificationListModal}
        width={400}
        footer={null}
      >
        <div className={classes.ActiveAlert__ModalContent}>
          <div className={classes.ActiveAlert__ModalContentInit}>
            <div>
              {' '}
              <span>{data?.data?.shs_name[0]}</span>
              <span>{data?.data?.shs_name[1]}</span>
            </div>
          </div>
          <h1>{data?.data?.shs_name}</h1>
          <p>{'Ikogbafav@gmail.com'}</p>
          <div>
            <div className={classes.ActiveAlert__ActiveAlertModalFilterStatus}>
              <div>
                <Space
                  className={classes.ActiveAlert__ActiveAlertModalFilterInput}
                >
                  <div
                    className={
                      classes.ActiveAlert__ActiveAlertModalFormSelectPrefix
                    }
                  >
                    <BsHouse size={20} color="#5C9D48" />
                  </div>
                  <Select
                    className={classes.ActiveAlert__ActiveAlertModalFormSelect}
                    defaultValue={data?.data?.active_alert}
                    style={{
                      width: 150,
                      border: 'none',
                      color: 'white',
                    }}
                    dropdownStyle={{ background: 'white', width: '20px' }}
                    showArrow={true}
                  />
                </Space>
              </div>
              <div className={classes.ActiveAlert__ActiveAlertModalStatus}>
                <span>{data?.data?.status}</span>{' '}
                <span>
                  <MdFilterList size={20} color="#5C9D48" />
                </span>
              </div>
            </div>

            <div className={classes.ActiveAlert__ActiveAlertModalShsInfo}>
              <span>{data?.data?.active_alert}</span>
              <span>
                {new Date(data?.data?.time).toLocaleTimeString(
                  'en-US',
                  dateTimeOption,
                )}
              </span>
              <span>{data?.data?.status}</span>
            </div>
          </div>
          <div className={classes.ActiveAlert__ModalClose}>
            <button onClick={handleOk}>Close</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

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
          {new Date(data).toLocaleTimeString('en-US', dateTimeOption)}
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
      render: (text, record) => <ActiveAlertDetails data={record} />,
    },
  ]

  const [activeAlertsData, setActiveAlertData] = useState([])
  const [activeAlertsDataAnalytics, setActiveAlertDataAnalytics] = useState([])
  const [activeAlertsDataStatistics, setActiveAlertDataStatistics] = useState()
  const [errMs, setErrMsg] = useState('')
  const [activeAlertsDataTable, setActiveAlertDataTable] = useState([])
  const [pageNum, setPageNum] = useState(3)
  const [searchactiveAlerts, setSearchactiveAlerts] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data: activeAlerts, isLoading: isLoadingactiveAlerts } =
    useGetAdminActiveAlertsQuery({
      page: pageNum,
      search: searchactiveAlerts,
    })
  const {
    data: activeAlertsAnalytics,
    isLoading: isLoadingactiveAlertsAnalytics,
  } = useGetAdminActiveAlertsAnalyticsQuery()

  const {
    data: activeAlertsStatistics,
    isLoading: isLoadingactiveAlertsStatistics,
  } = useGetAdminActiveAlertsStatisticsQuery()
  const { data: activeAlertsTable, isLoading: isLoadingactiveAlertsTable } =
    useGetAdminActiveAlertsTableQuery()
  const [createAdminActiveAlerts, { isLoading: isLoadingactiveAlertsCreate }] =
    useCreateAdminActiveAlertsMutation()

  useEffect(() => {
    setActiveAlertData(activeAlerts)
    setActiveAlertDataAnalytics(activeAlertsAnalytics)
    setActiveAlertDataTable(activeAlertsTable)
    setActiveAlertDataStatistics(activeAlertsStatistics)
  }, [
    activeAlerts,
    activeAlertsAnalytics,
    activeAlertsStatistics,
    activeAlertsTable,
  ])

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

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
      <p style={{ fontWeight: '500', fontSize: '18px' }}>Active Alerts Table</p>
      <div className={classes.ActiveAlert__ActiveAlertTableHeaderFilter}>
        <div>
          <Input
            placeholder="Search"
            size="large"
            prefix={prefix}
            className={classes.ActiveAlert__SearchAndFilter}
          />
        </div>
        <div className={classes.ActiveAlert__ActiveAlertTableFilter}>
          <Space className={classes.ActiveAlert__ActiveAlertTableFilterInput}>
            <div className={classes.ActiveAlert__ActiveAlertTablePrefixFilter}>
              <MdFilterList size={20} />
              <p>Sort by</p>
            </div>
            <Select
              className={classes.ActiveAlert__ActiveAlertStatsFormSelect}
              defaultValue="Months"
              style={{
                width: 100,
                border: 'none',
                color: 'white',
              }}
              options={[
                {
                  value: 'Months',
                  label: 'Months',
                  style: {
                    color: '#497A38',
                  },
                },
                {
                  value: ' Weeks',
                  label: ' Weeks',
                  style: {
                    color: '#497A38',
                  },
                },
                {
                  value: 'Days',
                  label: 'Days',
                  style: {
                    color: '#497A38',
                  },
                },
              ]}
              dropdownStyle={{ background: 'white' }}
              showArrow={false}
            />
          </Space>
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

  return (
    <AdminPageLayout>
      <section className={classes.ActiveAlert}>
        <section>
          <PageBreadcrumb title={'Active Alert'} items={['Active Alert']} />
        </section>

        <section className={classes.ActiveAlert__WidgetSection}>
          <div className={classes.ActiveAlert__WidgetLeftContent}>
            <div className={classes.ActiveAlert__WidgetIcon}>
              <BsBell color={'#497A38'} size={15} />
            </div>
            <div className={classes.ActiveAlert__WidgetText}>
              <p>Active alerts created</p>
              <h1 className={classes.ActiveAlert__WidgetValue}>
                {activeAlertsDataAnalytics?.active_alerts_created}
              </h1>
            </div>
            <div className={classes.ActiveAlert__WidgetGraphOne}>
              <img src={alertCreated} alt="" srcSet="" />
            </div>
          </div>
          <div className={classes.ActiveAlert__WidgetRightContent}>
            <div className={classes.ActiveAlert__WidgetRight}>
              <div className={classes.ActiveAlert__WidgetIcon}>
                <BsBellSlash color={'#497A38'} size={15} />
              </div>
              <div className={classes.ActiveAlert__WidgetText}>
                <p>Total number of resolved alert</p>
                <div className={classes.ActiveAlert__WidgetVal}>
                  <h1 className={classes.ActiveAlert__WidgetValue}>
                    {activeAlertsDataAnalytics?.total_unresolved_alerts}
                  </h1>
                  <div className={classes.ActiveAlert__WidgetGraphTwo}>
                    <img src={alertResolved} alt="" srcSet="" />
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.ActiveAlert__WidgetCenter}>
              <div className={classes.ActiveAlert__WidgetIcon}>
                <BsArrowsMove color={'#497A38'} size={15} />
              </div>
              <div className={classes.ActiveAlert__WidgetText}>
                <p>Device location alert</p>
                <h1 className={classes.ActiveAlert__WidgetValue}>
                  {activeAlertsDataAnalytics?.device_location_alerts}
                </h1>
              </div>
              <div className={classes.ActiveAlert__WidgetExtra}>
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
            </div>
          </div>
        </section>
        <section className={classes.ActiveAlert__ActiveAlertSection}>
          <div className={classes.ActiveAlert__ActiveAlertNotification}>
            <div className={classes.ActiveAlert__ActiveAlertNotificationHeader}>
              <div>
                <h1>Active Alerts</h1>
              </div>
              <div>
                <button
                  onClick={showModal}
                  className={
                    classes.ActiveAlert__ActiveAlertNotificationHeaderBtn
                  }
                >
                  {' '}
                  <span>
                    <BsPlus size={30} />
                  </span>
                  <span>Add Alert</span>
                </button>
                <Modal
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  className={
                    classes.ActiveAlert__ActiveAlertNotificationListModal
                  }
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
                          className={
                            classes.ActiveAlert__ActiveAlertAddAlertHeader
                          }
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
              </div>
            </div>
            handleStatisticChange
            <div className={classes.ActiveAlert__ActiveAlertNotificationList}>
              {activeAlertsData
                ? activeAlertsData.slice(0, 3).map((alert, key) => (
                    <div key={key}>
                      <span>
                        <BsThreeDots />
                      </span>
                      <div>
                        <p>{alert?.title}</p>
                        <p>{alert?.event_description} </p>
                      </div>
                    </div>
                  ))
                : 'No active alerts'}
            </div>
            <div
              className={classes.ActiveAlert__ActiveAlertNotificationViewBtn}
            >
              <Link to={'/admin/active-alerts/created-alerts'}>
                View Created Alert
              </Link>
            </div>
          </div>
          <div className={classes.ActiveAlert__ActiveAlertStats}>
            <div className={classes.ActiveAlert__ActiveAlertStatsHeader}>
              <div>
                <h1>Active Alert Statistic</h1>
                <p>Updated 1min ago</p>
              </div>
              <div className={classes.ActiveAlert__ActiveAlertStatsFilter}>
                <Space
                  className={classes.ActiveAlert__ActiveAlertStatsFilterInput}
                >
                  <div
                    className={
                      classes.ActiveAlert__ActiveAlertStatsFormSelectPrefix
                    }
                  >
                    <MdFilterList size={20} />
                  </div>
                  <Select
                    className={classes.ActiveAlert__ActiveAlertStatsFormSelect}
                    defaultValue="Last 12 Months"
                    style={{
                      width: 150,
                      border: 'none',
                      color: 'white',
                    }}
                    options={[
                      {
                        value: 'Last 12 Months',
                        label: 'Last 12 Months',
                        style: {
                          color: '#497A38',
                        },
                      },
                      {
                        value: 'Last 13 Months',
                        label: 'Last 13 Months',
                        style: {
                          color: '#497A38',
                        },
                      },
                      {
                        value: 'Last 14 Months',
                        label: 'Last 14 Months',
                        style: {
                          color: '#497A38',
                        },
                      },
                      {
                        value: 'Last 15 Months',
                        label: 'Last 15 Months',
                        style: {
                          color: '#497A38',
                        },
                      },
                    ]}
                    dropdownStyle={{ background: 'white' }}
                    showArrow={false}
                  />
                </Space>
              </div>
            </div>
            <div className={classes.ActiveAlert__ActiveAlertStatsGraph}>
              <Chart
                series={[
                  {
                    name: 'Unresolved alert',
                    data: [
                      activeAlertsStatistics?.['1'].unresolved,
                      activeAlertsStatistics?.['2'].unresolved,
                      activeAlertsStatistics?.['3'].unresolved,
                      activeAlertsStatistics?.['4'].unresolved,
                      activeAlertsStatistics?.['5'].unresolved,
                      activeAlertsStatistics?.['6'].unresolved,
                      activeAlertsStatistics?.['7'].unresolved,
                      activeAlertsStatistics?.['8'].unresolved,
                      activeAlertsStatistics?.['9'].unresolved,
                      activeAlertsStatistics?.['10'].unresolved,
                      activeAlertsStatistics?.['11'].unresolved,
                      activeAlertsStatistics?.['12'].unresolved,
                    ],
                  },
                  {
                    name: 'Resolved alert',
                    data: [
                      activeAlertsStatistics?.['1'].resolved,
                      activeAlertsStatistics?.['2'].resolved,
                      activeAlertsStatistics?.['3'].resolved,
                      activeAlertsStatistics?.['4'].resolved,
                      activeAlertsStatistics?.['5'].resolved,
                      activeAlertsStatistics?.['6'].resolved,
                      activeAlertsStatistics?.['7'].resolved,
                      activeAlertsStatistics?.['8'].resolved,
                      activeAlertsStatistics?.['9'].resolved,
                      activeAlertsStatistics?.['10'].resolved,
                      activeAlertsStatistics?.['11'].resolved,
                      activeAlertsStatistics?.['12'].resolved,
                    ],
                  },
                ]}
                options={{
                  chart: {
                    type: 'bar',
                    height: 8,
                    stacked: true,
                    fontFamily: 'baloo 2',
                    toolbar: {
                      show: false,
                    },
                  },
                  yaxis: {
                    show: true,
                    showAlways: true,
                  },
                  dataLabels: {
                    enabled: false,
                  },
                  grid: {
                    show: true,
                    padding: {
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                    },
                    position: 'back',
                    xaxis: {
                      lines: {
                        show: false,
                      },
                    },
                    yaxis: {
                      lines: {
                        show: false,
                      },
                    },
                  },
                  xaxis: {
                    show: true,
                    categories: [
                      'Jan',
                      'feb',
                      'March',
                      'Apr',
                      'May',
                      'Jun',
                      'Jul',
                      'Aug',
                      'Sep',
                      'Oct',
                      'Nov',
                      'Dec',
                    ],
                  },

                  legend: {
                    position: 'bottom',
                    offsetY: 0,
                    markers: {
                      radius: 10,
                      width: 8,
                      height: 8,
                    },
                  },
                  plotOptions: {
                    bar: {
                      borderRadius: 3,
                      borderRadiusApplication: 'around',
                      columnWidth: 10,
                      dataLabels: {
                        hideOverflowingLabels: false,
                      },
                    },
                  },
                  colors: ['#F04438', '#C4C4C4'],
                }}
                type="bar"
                height="350px"
                width="100%"
              />
            </div>
          </div>
        </section>
        <section className={classes.ActiveAlert__ActiveAlertTable}>
          <ActiveAlertTable
            title={ativeAlertTableTitle}
            columns={columns}
            dataSource={activeAlertsDataTable}
            setPageNum={setPageNum}
          />
        </section>
      </section>
    </AdminPageLayout>
  )
}

export default ActiveAlert
