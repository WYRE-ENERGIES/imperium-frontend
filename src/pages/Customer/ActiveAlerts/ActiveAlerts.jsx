import React from 'react'
import PageLayout from '../../../components/Layout/PageLayout'
import { Table } from 'antd'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import ShsCapacityDropdown from '../../../components/ShsCapacityDropdown/ShsCapacityDropdown'
import classes from './ActiveAlerts.module.scss'
import FormButton from '../../../components/Auth/Forms/Widgets/FormButton'
import alertIcon from '../../../../src/assets/widget-icons/alertIcon.svg'
const ActiveAlerts = () => {
  const title = () => (
    <p style={{ fontWeight: '500', fontSize: '18px' }}>Active Alerts Table</p>
  )

  const footer = () => {
    return (
      <div className={classes.ActiveAlerts__Footer}>
        <div className={classes.ActiveAlerts__NavBtn}>
          {' '}
          <FormButton type="button" action="Previous" />
          <FormButton type="button" action="Next" />
        </div>
        <div className={classes.ActiveAlerts__Pagination}>Page 1 of 10</div>
      </div>
    )
  }

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

  const activeAlertdata = [
    {
      key: '1',
      activeAlert: 'Low panel voltage',
      time: '11:58pm  2/01/2023',
      eventDescription:
        'Disconnect your solar panel from your PV system and Make sure your solar panel is getting sufficient light.',
      status: 'Unresolved',
    },
    {
      key: '2',
      activeAlert: 'Maintenance overdue',
      time: '11:58pm  2/01/2023',
      eventDescription: 'Contact support',
      status: 'Unresolved',
    },
    {
      key: '3',
      activeAlert: 'Low panel voltage',
      time: '11:58pm  2/01/2023',
      eventDescription:
        'Check for corroded/loose connections, if none found contact support.',
      status: 'Resolved',
    },
    {
      key: '4',
      activeAlert: 'Low panel voltage',
      time: '11:58pm  2/01/2023',
      eventDescription:
        'Check for corroded/loose connections, if none found contact support.',
      status: 'Unresolved',
    },
    {
      key: '5',
      activeAlert: 'Low panel voltage',
      time: '11:58pm  2/01/2023',
      eventDescription:
        'Check for corroded/loose connections, if none found contact support.',
      status: 'Unresolved',
    },
    {
      key: '6',
      activeAlert: 'Low panel voltage',
      time: '11:58pm  2/01/2023',
      eventDescription:
        'Check for corroded/loose connections, if none found contact support.',
      status: 'Unresolved',
    },
  ]

  return (
    <PageLayout>
      <section className={classes.ActiveAlerts}>
        <section className={classes.ActiveAlerts__headerSection}>
          <PageBreadcrumb title="Active Alert" />
          <ShsCapacityDropdown />
        </section>
        <section className={classes.ActiveAlerts__Banner}>
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
                  <strong>Abnormal load </strong> Check that the load does not
                  exceed requirement
                </p>
                <span>12:37pm</span>
              </div>
              <div className={classes.ActiveAlerts__Success}>
                <p>
                  <strong>Low battery volage </strong> Check that the load does
                  not exceed requirement
                </p>
                <span>12:37pm</span>
              </div>
            </div>
          </div>
        </section>
        <section className={classes.ActiveAlerts__Table}>
          <Table
            title={title}
            footer={footer}
            columns={columns}
            dataSource={activeAlertdata}
          />
        </section>
      </section>
    </PageLayout>
  )
}

export default ActiveAlerts
