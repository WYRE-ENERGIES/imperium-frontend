import {
  batteryTableData,
  batteryWidgetsData,
  generalFilterOptions,
} from '../../../utils/data'

import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import PageLayout from '../../../components/Layout/PageLayout'
import React from 'react'
import ShsCapacityDropdown from '../../../components/ShsCapacityDropdown/ShsCapacityDropdown'
import TableWithFilter from '../../../components/SHSTableWithFilter/SHSTableWithFilter'
import { Tag } from 'antd'
import Widget from '../../../components/Widget/Widget/Widget'
import WidgetFilter from '../../../components/WidgetFilter/WidgetFilter'
import classes from './Battery.module.scss'

const columns = [
  {
    title: 'Monthly',
    dataIndex: 'name',
    key: 'name',
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
    title: 'Charging Source',
    key: 'chargingSource',
    dataIndex: 'chargingSource',
    render: (value) => value.toLocaleString(),
  },
]

const Battery = () => {
  const widgets = batteryWidgetsData.map((widget) => (
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
    <PageLayout>
      <div style={{ backgroundColor: '#FCFCFD' }} className={classes.Battery}>
        <section className={classes.Battery__headerSection}>
          <PageBreadcrumb title="Battery" items={['Battery']} />
          <ShsCapacityDropdown />
        </section>
        <section className={classes.Battery__filters}>
          <WidgetFilter />
        </section>
        <div className={classes.Battery__widgets}>{widgets}</div>
        <div className={classes.Battery__shsTable}>
          <TableWithFilter
            columns={columns}
            data={batteryTableData}
            tableTitle="Battery Table"
            tagValue="kWh"
            filterOptions={generalFilterOptions}
          />
        </div>
      </div>
    </PageLayout>
  )
}

export default Battery
