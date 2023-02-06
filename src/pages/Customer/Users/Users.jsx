import { Button, Table, Tag } from 'antd'

import { FiTrash2 } from 'react-icons/fi'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import PageLayout from '../../../components/Layout/PageLayout'
import { PlusOutlined } from '@ant-design/icons'
import React from 'react'
import ReactAvatar from 'react-avatar'
import classes from './Users.module.scss'
import { userData } from '../../../utils/userData'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (_, record) => (
      <div className={classes.Users__nameDiv}>
        <ReactAvatar
          size={30}
          round={true}
          name={record.name}
          fgColor="#385E2B"
          color="#F0F7ED"
        />
        <div className={classes.Users__names}>
          {record.status && <h3>{record.name}</h3>}
          <h4>{record.email}</h4>
        </div>
      </div>
    ),
  },
  {
    title: 'Role',
    key: 'role',
    dataIndex: 'role',
  },

  {
    title: 'Date Added',
    key: 'dateAdded',
    dataIndex: 'dateAdded',
  },
  {
    title: 'Last Active',
    key: 'lastActive',
    dataIndex: 'lastActive',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    render: (value) => {
      const color = value ? '#027A48' : '#B54708'
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
          {value ? 'Active' : 'Pending'}
        </Tag>
      )
    },
  },
  {
    title: '',
    key: 'action',
    width: '10%',
    render: (_, record) => (
      <FiTrash2
        style={{ cursor: 'pointer' }}
        onClick={() => console.log(record.id)}
      />
    ),
  },
]

const Users = () => {
  return (
    <PageLayout>
      <div className={classes.Users}>
        <section className={classes.Users__headerSection}>
          <PageBreadcrumb title="User" />
          <Button
            className={classes.Users__button}
            onClick={() => {
              //   setTicketData({})
              //   toggleModal()
            }}
          >
            <PlusOutlined /> Add User
          </Button>
        </section>
        <Table
          style={{ width: '100%', overflow: 'scroll' }}
          columns={columns}
          dataSource={userData}
          className={classes.Users__table}
        />
      </div>
    </PageLayout>
  )
}

export default Users
