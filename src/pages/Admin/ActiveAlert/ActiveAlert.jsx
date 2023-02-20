import { Tag, Select, Space, Table, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { MdFilterList } from 'react-icons/md'
import {
  BsArrowsMove,
  BsArrowUp,
  BsBell,
  BsBellSlash,
  BsEyeSlash,
  BsHouse,
  BsPlus,
  BsThreeDots,
} from 'react-icons/bs'
import Chart from 'react-apexcharts'
import FormButton from '../../../components/Auth/Forms/Widgets/FormButton'
import AdminPageLayout from '../../../components/Layout/AdminPageLayout/AdminPageLayout'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import alertCreated from '../../../assets/widget-icons/greenGraph.svg'
import alertResolved from '../../../assets/widget-icons/yellowGraph.svg'
import classes from './ActiveAlert.module.scss'
import { SearchOutlined, CloudDownloadOutlined } from '@ant-design/icons'

const ActiveAlert = () => {
  const activeAlertdata = [
    {
      key: '2',
      shs: [
        {
          id: '2',
          name: 'Quellax Mariot',
          header: 'Low panel voltage',
          text: 'Disconnect your solar panel from your PV system.',
          time: '11:58pm  2/01/2023',
          status: 'Unresolved',
          type: 'Active Alert',
        },
        {
          id: '10',
          name: 'Demi Wilkinson',
          header: 'Abnormal load',
          text: 'Reduce load on SHS ',
          time: '11:58pm  2/01/2023',
          status: 'Unresolved',
          type: 'Active Alert',
        },
      ],
      view: 'view',
      action: <BsThreeDots />,
      email: 'jayhard@gmail.com',
      username: 'James Harden',
      fname: 'James',
      lname: 'Harden',
    },
    {
      key: '1',
      shs: [
        {
          id: '4',
          name: 'Demi Wilkinson',
          header: 'Abnormal load',
          text: 'Reduce load on SHS ',
          time: '11:58pm  2/01/2023',
          status: 'Resolved',
          type: 'Active Alert',
        },
        {
          id: '19',
          name: 'Demi Wilkinson',
          header: 'Abnormal load',
          text: 'Reduce load on SHS ',
          time: '11:58pm  2/01/2023',
          status: 'Resolved',
          type: 'Active Alert',
        },
      ],
      view: 'view',
      action: <BsThreeDots />,
      email: 'Arokem@gmail.com',
      username: 'Arogbo Kemisola',
      fname: 'Arogbo',
      lname: 'Kemisola',
    },
  ]

  const columns = [
    {
      key: '1',
      title: 'Active Alerts',
      dataIndex: 'shs',
      render: (data) => (
        <span
          style={{
            color: 'black',
          }}
        >
          {data[0]?.header}
        </span>
      ),
    },
    {
      key: '2',
      title: 'Solar House System(SHS)',
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
      title: 'Time',
      dataIndex: 'shs',
      render: (data) => (
        <span
          style={{
            color: 'black',
          }}
        >
          {data[0]?.time}
        </span>
      ),
    },
    {
      key: '4',
      title: 'Status',
      dataIndex: 'shs',
      render: (data) => (
        <span
          style={{
            color: data[0]?.status === 'Resolved' ? '#5C9D48' : '#B42318',
          }}
        >
          {data[0]?.status}
        </span>
      ),
    },
    {
      key: '5',
      title: <span style={{ color: '#f0f7ed' }}>i</span>,
      dataIndex: 'view',
      render: (data) => (
        <span
          style={{
            color: '#385E2B',
          }}
        >
          View
        </span>
      ),
    },
  ]

  const [data, setActiveAlertData] = useState(activeAlertdata)

  const ActiveAlertCard = ({ activeAlertData }) => {
    console.log('activeAlertData ', activeAlertData.shs)
    const ShsOptions = [
      {
        value: 'hello',
        label: 'hello',
      },
    ]
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
        <span>{activeAlertData.action}</span>
        <div onClick={showModal}>
          <p>{activeAlertData?.shs[0]?.header}</p>
          <p>{activeAlertData?.shs[0]?.text} </p>
        </div>
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          className={classes.ActiveAlert__ActiveAlertNotificationListModal}
          width={400}
          footer={null}
        >
          <div className={classes.ActiveAlert__ModalContent}>
            <div className={classes.ActiveAlert__ModalContentInit}>
              <div>
                {' '}
                <span>{activeAlertData?.fname[0]}</span>
                <span>{activeAlertData?.lname[0]}</span>
              </div>
            </div>
            <h1>{activeAlertData?.username}</h1>
            <p>{activeAlertData?.email}</p>
            <div>
              <div
                className={classes.ActiveAlert__ActiveAlertModalFilterStatus}
              >
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
                      className={
                        classes.ActiveAlert__ActiveAlertModalFormSelect
                      }
                      defaultValue={ShsOptions[0].value}
                      style={{
                        width: 150,
                        border: 'none',
                        color: 'white',
                      }}
                      onChange={handleChange}
                      options={ShsOptions}
                      dropdownStyle={{ background: 'white' }}
                      showArrow={true}
                    />
                  </Space>
                </div>
                <div className={classes.ActiveAlert__ActiveAlertModalStatus}>
                  <span>Unresolved</span>{' '}
                  <span>
                    <MdFilterList size={20} color="#5C9D48" />
                  </span>
                </div>
              </div>

              <div className={classes.ActiveAlert__ActiveAlertModalShsInfo}>
                <span>Low panel voltage</span>
                <span>11:58pm, 2/01/2023</span>
                <span>Unresolved</span>
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
  const prefix = (
    <SearchOutlined
      style={{
        fontSize: 16,
        color: '#808080',
      }}
    />
  )
  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }
  const footer = () => {
    return (
      <div className={classes.ActiveAlert__Footer}>
        <div className={classes.ActiveAlert__NavBtn}>
          {' '}
          <FormButton type="button" action="Previous" />
          <FormButton type="button" action="Next" />
        </div>
        <div className={classes.ActiveAlert__Pagination}>Page 1 of 10</div>
      </div>
    )
  }

  const title = () => (
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
              onChange={handleChange}
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
              <h1 className={classes.ActiveAlert__WidgetValue}>5</h1>
            </div>
            <div className={classes.ActiveAlert__WidgetGraphOne}>
              <img src={alertCreated} alt="" srcSet="" />
            </div>
          </div>
          <div className={classes.ActiveAlert__WidgetRightContent}>
            <div className={classes.ActiveAlert__WidgetCenter}>
              <div className={classes.ActiveAlert__WidgetIcon}>
                <BsArrowsMove color={'#497A38'} size={15} />
              </div>
              <div className={classes.ActiveAlert__WidgetText}>
                <p>Device location alert</p>
                <h1 className={classes.ActiveAlert__WidgetValue}>18</h1>
              </div>
              <div className={classes.ActiveAlert__WidgetExtra}>
                <div>
                  <BsEyeSlash color={'#292D32'} size={15} />
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
            <div className={classes.ActiveAlert__WidgetRight}>
              <div className={classes.ActiveAlert__WidgetIcon}>
                <BsBellSlash color={'#497A38'} size={15} />
              </div>
              <div className={classes.ActiveAlert__WidgetText}>
                <p>Total number of resolved alert</p>
                <div className={classes.ActiveAlert__WidgetVal}>
                  <h1 className={classes.ActiveAlert__WidgetValue}>198</h1>
                  <div className={classes.ActiveAlert__WidgetGraphTwo}>
                    <img src={alertResolved} alt="" srcSet="" />
                  </div>
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
              </div>
            </div>
            <div className={classes.ActiveAlert__ActiveAlertNotificationList}>
              {data.slice(0, 3).map((data, key) => (
                <ActiveAlertCard
                  key={key}
                  id={data.key}
                  activeAlertData={data}
                />
              ))}
            </div>
            <div
              className={classes.ActiveAlert__ActiveAlertNotificationViewBtn}
            >
              <button>View Created Alert</button>
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
                    onChange={handleChange}
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
                    data: [44, 55, 41, 67, 22, 43],
                  },
                  {
                    name: 'Resolved alert',
                    data: [13, 23, 20, 8, 13, 27],
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
                    categories: ['Jan', 'March', 'May', 'Jul', 'Sep', 'Nov'],
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
          <Table
            title={title}
            columns={columns}
            dataSource={activeAlertdata}
            footer={footer}
            pagination={{
              position: ['none', 'none'],
            }}
          />
        </section>
      </section>
    </AdminPageLayout>
  )
}

export default ActiveAlert
