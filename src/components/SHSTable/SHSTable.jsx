import { Table, Tag } from 'antd'

import { BsDot } from 'react-icons/bs'
import { EyeOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import React from 'react'
import TableFooter from '../TableFooter/TableFooter'
import classes from './SHSTable.module.scss'

const columns = [
  {
    title: 'Name',
    dataIndex: 'client_name',
    key: 'client_name',
  },
  {
    title: 'Energy Consumed',
    key: 'energy_consumed',
    dataIndex: 'energy_consumed',
    render: (value) => parseFloat(value.toLocaleString()).toFixed(1),
  },
  {
    title: 'Energy Generated',
    key: 'energy_generated',
    dataIndex: 'energy_generated',
    render: (value) => parseFloat(value.toLocaleString()).toFixed(1),
  },
  {
    title: 'Location',
    key: 'location',
    dataIndex: 'location',
    render: (value) => {
      return (
        <div className={classes.SHSTable__Location}>
          <h3>{value}</h3>
          {/* <h4>{value.street}</h4> */}
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
      const color = value.toLowerCase() === 'on' ? '#027A48' : '#606062'
      return (
        <Tag
          color={value.toLowerCase() === 'on' ? 'success' : '#E6E6E6'}
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
          {value}
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

const SHSTable = ({ data, isLoading = false, setPage }) => {
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
            SHS
          </Tag>
        </h1>
      </section>
      <div style={{ width: '100%', overflow: 'scroll' }}>
        <Table
          style={{ width: '100%', overflow: 'scroll' }}
          columns={columns}
          dataSource={data?.results}
          className={classes.SHSTable__table}
          loading={isLoading}
          pagination={{
            hideOnSinglePage: true,
          }}
          footer={() => (
            <TableFooter
              pageNo={data?.page}
              totalPages={data?.total_pages}
              handleClick={setPage}
              hasNext={data?.page === data?.total_pages}
              hasPrev={!data?.total_pages || data?.page === 1}
            />
          )}
        />
      </div>
    </div>
  )
}

export default SHSTable
