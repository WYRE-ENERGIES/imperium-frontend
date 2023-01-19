import { Space, Table, Tag, Tooltip } from 'antd'

import { BsDot } from 'react-icons/bs'
import { FaRegQuestionCircle } from 'react-icons/fa'
import React from 'react'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: '5%',
    render: (text) => `#${text}`,
  },
  {
    title: 'Subject',
    dataIndex: 'subject',
    key: 'subject',
  },
  {
    title: 'Priority',
    key: 'priority',
    dataIndex: 'priority',
    width: '10%',
    render: (text) => {
      return (
        <Tag
          color="error"
          key={text}
          style={{
            backgroundColor: 'white',
            border: '1px solid red',
            borderRadius: '10px',
          }}
        >
          {text}
        </Tag>
      )
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
        Status{' '}
        <Tooltip title="SHS status">
          <FaRegQuestionCircle style={{ marginLeft: 5, color: '#999999' }} />
        </Tooltip>
      </span>
    ),
    key: 'status',
    dataIndex: 'status',
    width: '10%',
    render: (text) => {
      const color = getColor(text)
      return (
        <Tag
          color={color}
          key={text}
          style={{
            borderRadius: '10px',
            paddingLeft: 0,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: 'fit-content',
          }}
        >
          <BsDot size={20} />
          {text}
        </Tag>
      )
    },
  },
  {
    title: '',
    key: 'action',
    width: '10%',
    render: (_) => (
      <Space size="middle">
        <a>Delete</a>
        <a>Edit</a>
      </Space>
    ),
  },
]

const getColor = (name) => {
  let color = ''

  switch (name) {
    case 'Urgent':
      color = 'error'
      break
    case 'Pending':
      color = 'warning'
      break
    case 'Completed':
      color = 'success'
      break
    default:
      color = 'error'
      break
  }

  return color
}

const data = [
  {
    id: 1,
    subject: 'Missing SHS',
    priority: 'Urgent',
    status: 'Pending',
  },
  {
    id: 2,
    subject: 'Failing SHS',
    priority: 'Urgent',
    status: 'Completed',
  },
]

const TicketTable = () => {
  return <Table style={{ width: '100%' }} columns={columns} dataSource={data} />
}

export default TicketTable
