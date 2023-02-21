import { TbActivityHeartbeat, TbBoltOff } from 'react-icons/tb'

import AdminEnergyAnalytic from '../../../../components/Widget/AdminEnergyAnalytic/AdminEnergyAnalytic'
import AdminPageLayout from '../../../../components/Layout/AdminPageLayout/AdminPageLayout'
import { BsDot } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import PageBreadcrumb from '../../../../components/PageBreadcrumb/PageBreadcrumb'
import React from 'react'
import TableWithFilter from '../../../../components/SHSTableWithFilter/SHSTableWithFilter'
import { Tag } from 'antd'
import WidgetFilter from '../../../../components/WidgetFilter/WidgetFilter'
import classes from '../Customers.module.scss'
import { data } from '../../../../components/SHSTable/tableData'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Energy Consumed',
    key: 'energyConsumed',
    dataIndex: 'energyConsumed',
    render: (value) => value.toLocaleString(),
  },
  {
    title: 'Energy Generated',
    key: 'energyGenerated',
    dataIndex: 'energyGenerated',
    render: (value) => value.toLocaleString(),
  },
  {
    title: 'Location',
    key: 'location',
    dataIndex: 'location',
    render: (value) => {
      return (
        <div className={classes.Customers__Location}>
          <h3>{value.area}</h3>
          <h4>{value.street}</h4>
        </div>
      )
    },
  },
  {
    title: 'Battery',
    key: 'battery',
    dataIndex: 'battery',
    render: (value) => {
      let color
      if (value < 30) {
        color = '#F04438'
      } else if (value > 30 && value < 70) {
        color = '#F4A118'
      } else {
        color = '#027A48'
      }

      return <span style={{ color }}>{value}%</span>
    },
  },
  {
    title: (
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        Status
      </span>
    ),
    key: 'status',
    dataIndex: 'status',
    sorter: (a, b) => a.status - b.status,
    render: (value) => {
      const color = value ? '#027A48' : '#606062'
      return (
        <Tag
          color={value ? 'success' : '#E6E6E6'}
          key={value}
          style={{
            borderRadius: '10px',
            paddingLeft: 0,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: 'fit-content',
            color: color,
          }}
        >
          <BsDot size={20} />
          {value ? 'On' : 'Off'}
        </Tag>
      )
    },
  },
  {
    title: '',
    key: 'action',
    render: (_, record) => (
      <Link
        style={{
          color: '#385E2B',
          fontWeight: 600,
          fontSize: '14px',
          lineHeight: '20px',
        }}
        to="#"
      >
        View
      </Link>
    ),
  },
]

const Customer = () => {
  const widgets = [
    {
      id: 1,
      icon: TbBoltOff,
      title: 'Total Energy Consumped',
      duration: 'For the last 12 months',
      value: '1124.89',
      valueCurrency: 'kWh',
      graphColor: '#65AA4F',
    },
    {
      id: 2,
      icon: TbActivityHeartbeat,
      title: 'Total Energy Generated',
      duration: 'For the last 12 months',
      value: '654.14',
      valueCurrency: 'kWh',
      graphColor: '#C9E00C',
    },
    {
      id: 3,
      icon: TbActivityHeartbeat,
      title: 'Total Capacity',
      duration: 'For the last 12 months',
      value: '5480 kVA / 76.9 kW',
      graphColor: '#5714E4',
    },
  ].map((widget) => (
    <AdminEnergyAnalytic
      key={widget.id}
      Icon={widget.icon}
      duration={widget.duration}
      valueCurrency={widget.valueCurrency}
      title={widget.title}
      value={widget.value}
      graphColor={widget.graphColor}
    />
  ))

  return (
    <AdminPageLayout>
      <div className={classes.Customers}>
        <section className={classes.Customers__headerSection}>
          <PageBreadcrumb
            title="Olivia Matthew's SHS"
            items={['Customers', "Olivia Matthew's SHS"]}
          />
        </section>
        <section className={classes.Customers__filters}>
          <WidgetFilter />
        </section>
        <div className={classes.Customers__customerWidgets}>{widgets}</div>
        <div className={classes.Customers__shsTable}>
          <TableWithFilter
            columns={columns}
            data={data}
            tableTitle="SHS"
            filterOptions={[]}
            isAdmin={true}
          />
        </div>
      </div>
    </AdminPageLayout>
  )
}

export default Customer
