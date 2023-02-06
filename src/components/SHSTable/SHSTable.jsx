import { Space, Table, Tag } from 'antd'

import { BsDot } from 'react-icons/bs'
import { EyeOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import React from 'react'
import classes from './SHSTable.module.scss'
import { data } from './tableData'

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
        <div className={classes.SHSTable__Location}>
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
      <Link style={{ color: '#737373' }} to={`shs/${record.id}`}>
        <EyeOutlined />
      </Link>
    ),
  },
]

const SHSTable = () => {
  return (
    <div className={classes.SHSTable}>
      <section className={classes.SHSTable__shsTableTitle}>
        <h1>
          Solar House System
          <Tag
            style={{
              backgroundColor: '#f0f7ed',
              borderRadius: '16px',
              color: '#497A38',
              height: '24px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '12px',
              lineHeight: '20px',
            }}
          >
            {11} SHS
          </Tag>
        </h1>
      </section>
      <div style={{ width: '100%', overflow: 'scroll' }}>
        <Table
          style={{ width: '100%' }}
          columns={columns}
          dataSource={data}
          className={classes.SHSTable__table}
        />
      </div>
    </div>
  )
}

export default SHSTable
