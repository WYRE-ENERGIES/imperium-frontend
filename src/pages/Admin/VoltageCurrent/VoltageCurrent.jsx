import React, { useState } from 'react'
import {
  adminBatteryTableData,
  generalFilterOptions,
} from '../../../utils/data'

import AdminPageLayout from '../../../components/Layout/AdminPageLayout/AdminPageLayout'
import { BsDot } from 'react-icons/bs'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import { RiBattery2ChargeLine } from 'react-icons/ri'
import StackedBarChart from '../../../components/Charts/StackedBarChart/StackedBarChart'
import TableWithFilter from '../../../components/SHSTableWithFilter/SHSTableWithFilter'
import { Tag } from 'antd'
import Widget from '../../../components/Widget/Widget/Widget'
import WidgetFilter from '../../../components/WidgetFilter/WidgetFilter'
import classes from '../../Customer/Battery/Battery.module.scss'

const adminVolatgeCurrentWidgetsData = [
  {
    id: 1,
    icon: EnergyWidgetIcon,
    title: 'Voltage',
    range: 'For the year',
    value: 6834,
  },
  {
    id: 2,
    icon: GoodBatteryWidgetIcon,
    title: 'Good SHS Battery',
    range: 'For the year',
    value: 6619,
  },
  {
    id: 3,
    icon: BadBatteryWidgetIcon,
    title: 'Bad SHS Battery',
    range: 'For the year',
    value: 215,
  },
]
const columns = [
  {
    title: 'Monthly',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Battery Voltage',
    key: 'batteryVoltage',
    dataIndex: 'batteryVoltage',
    render: (value) => `${value.toLocaleString()} V`,
  },

  {
    title: 'Battery Current',
    key: 'batteryCurrent',
    dataIndex: 'batteryCurrent',
    render: (value) => `${value.toLocaleString()} A`,
  },
  {
    title: 'Battery Health',
    key: 'batteryHealth',
    dataIndex: 'batteryHealth',
    render: (value) => {
      const color = value ? '#027A48' : '#B42318'
      return (
        <Tag
          color={value ? 'success' : 'error'}
          key={value}
          style={{
            borderRadius: '10px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 'fit-content',
            color: color,
          }}
        >
          {value ? 'Good' : 'Bad'}
        </Tag>
      )
    },
  },
  {
    title: 'Charging Source',
    key: 'chargingSource',
    dataIndex: 'chargingSource',
    render: (value) => value.toLocaleString(),
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    width: '12%',
    render: (value) => {
      return (
        <div className={classes.Battery__status}>
          <RiBattery2ChargeLine
            color={value.isCharging ? '#84BB72' : '#B42318'}
            size={20}
          />
          <section className={classes.Battery__statusSection}>
            <h3 className={classes.Battery__statusText}>Charging Status</h3>
            <div className={classes.Battery__statusResultSection}>
              <h4 style={{ color: value.isCharging ? '#84BB72' : '#B42318' }}>
                <BsDot
                  color={value.isCharging ? '#84BB72' : '#B42318'}
                  size={20}
                  style={{ marginLeft: 0 }}
                />
                {value.percentage}%
              </h4>
              <h5 className={classes.Battery__statusResult}>
                {value.isCharging ? 'Charging' : 'Not Charging'}
              </h5>
            </div>
          </section>
        </div>
      )
    },
  },
]

const VoltageCurrent = () => {
  const [chartData, setChartData] = useState([
    {
      name: 'Current',
      data: [400, 500, 350, 420, 320, 500, 410, 430, 410, 500, 570, 400],
    },
    {
      name: 'Voltage',
      data: [400, 500, 230, 430, 260, 430, 390, 380, 390, 330, 430, 310],
    },
  ])

  const widgets = adminVolatgeCurrentWidgetsData.map((widget) => (
    <Widget
      key={widget.id}
      Icon={widget.icon}
      range={widget.range}
      title={widget.title}
      value={widget.value}
      valueCurrency={widget.valueCurrency}
      valuePercentage={widget.valuePercentage}
    />
  ))

  return (
    <AdminPageLayout>
      <div style={{ backgroundColor: '#FCFCFD' }} className={classes.Battery}>
        <section className={classes.Battery__headerSection}>
          <PageBreadcrumb title="Battery" items={['Battery']} />
        </section>
        <section className={classes.Battery__filters}>
          <WidgetFilter />
        </section>
        <div className={classes.Battery__widgets}>{widgets}</div>
        <div className={classes.Battery__chart}>
          <StackedBarChart
            title="Battery Statistical Representation"
            chartData={chartData}
            colors={['#C9E00C', '#65AA4F']}
            borderRadius={2}
            columnWidth={15}
            legendPosition="bottom"
            legendHorizontalAlign="center"
          />
        </div>
        <div className={classes.Battery__shsTable}>
          <TableWithFilter
            columns={columns}
            data={adminBatteryTableData}
            tableTitle="Battery Table"
            tagValue="kWh"
            filterOptions={generalFilterOptions}
            isAdmin={true}
          />
        </div>
      </div>
    </AdminPageLayout>
  )
}

export default VoltageCurrent
