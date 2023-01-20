import { Space, Table, Tag, Tooltip } from 'antd'

import { BsDot } from 'react-icons/bs'
import { FaRegQuestionCircle } from 'react-icons/fa'
import React from 'react'
import Swal from 'sweetalert2'

const getColor = (name) => {
  let color = ''

  switch (name) {
    case 'Pending':
      color = 'warning'
      break
    case 'Resolved':
      color = 'success'
      break
    default:
      color = 'error'
      break
  }

  return color
}

const getPriorityColor = (name) => {
  let color = ''

  switch (name) {
    case 'Urgent':
      color = '#B42318'
      break
    case 'Normal':
      color = '#363F72'
      break
  }

  return color
}

const handleDelete = (id) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire('Deleted!', 'ticket has been deleted.', 'success')
    }
  })
}

const data = [
  {
    id: 1,
    subject: 'Missing SHS',
    description: 'Missing SHS description',
    priority: 'Urgent',
    status: 'Pending',
    key: 1,
  },
  {
    id: 2,
    subject: 'TDS is missing',
    description: 'TDS is missing description',
    priority: 'Urgent',
    status: 'Pending',
    key: 2,
  },
  {
    id: 3,
    subject: 'Tags • Applications & Uses is missing',
    description: 'Tags • Applications & Uses is missing description',
    priority: 'Normal',
    status: 'Resolved',
    key: 3,
  },
  {
    id: 4,
    subject: 'Image is missing',
    description: 'Image is missing description',
    priority: 'Urgent',
    status: 'Resolved',
    key: 4,
  },
  {
    id: 5,
    subject: 'Failing SHS',
    description: 'Failing SHS description',
    priority: 'Normal',
    status: 'Resolved',
    key: 5,
  },
]

const TicketTable = ({ onEditTicket }) => {
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
        const color = getPriorityColor(text)
        return (
          <Tag
            key={text}
            style={{
              backgroundColor: 'white',
              border: `1px solid ${color}`,
              borderRadius: '10px',
              color: color,
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
      render: (_, record) => (
        <Space size="middle">
          <a
            style={{ color: '#737373' }}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </a>
          <a style={{ color: '#737373' }} onClick={() => onEditTicket(record)}>
            Edit
          </a>
        </Space>
      ),
    },
  ]

  return <Table style={{ width: '100%' }} columns={columns} dataSource={data} />
}

export default TicketTable
