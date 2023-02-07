import { Button, Tag } from 'antd'
import React, { Suspense, lazy, useState, useTransition } from 'react'

import { FiTrash2 } from 'react-icons/fi'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import PageLayout from '../../../components/Layout/PageLayout'
import { PlusOutlined } from '@ant-design/icons'
import ReactAvatar from 'react-avatar'
import Swal from 'sweetalert2'
import TableWithFilter from '../../../components/SHSTableWithFilter/SHSTableWithFilter'
import classes from './Users.module.scss'
import { userData } from '../../../utils/userData'

const NewUserForm = lazy(() => import('./NewUserForm/NewUserForm'))

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
      Swal.fire('Deleted!', 'user has been deleted.', 'success')
    }
  })
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
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
    sorter: (a, b) => a.role.localeCompare(b.role),
  },

  {
    title: 'Date Added',
    key: 'dateAdded',
    dataIndex: 'dateAdded',
    sorter: (a, b) => a.dateAdded.localeCompare(b.dateAdded),
  },
  {
    title: 'Last Active',
    key: 'lastActive',
    dataIndex: 'lastActive',
    sorter: (a, b) => a.lastActive.localeCompare(b.lastActive),
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    sorter: (a, b) => a.status - b.status,
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
    align: 'center',
    render: (_, record) => (
      <FiTrash2
        style={{ cursor: 'pointer' }}
        onClick={() => handleDelete(record.id)}
      />
    ),
  },
]

const Users = () => {
  const [openModal, setOpenModal] = useState(false)
  const [ticketData, setTicketData] = useState({})
  const [isPending, startTransition] = useTransition()

  const toggleModal = () => setOpenModal(!openModal)

  return (
    <PageLayout>
      <div className={classes.Users}>
        <section className={classes.Users__headerSection}>
          <PageBreadcrumb title="User" />
          <Button
            className={classes.Users__button}
            onClick={() => {
              startTransition(() => {
                setTicketData({})
                toggleModal()
              })
            }}
          >
            <PlusOutlined /> Add User
          </Button>
        </section>
        <TableWithFilter columns={columns} data={userData} tableTitle="Users" />
      </div>
      <Suspense fallback={<h4>Loading...</h4>}>
        {openModal && (
          <NewUserForm
            title="Invite User"
            isOpen={openModal}
            toggleModal={toggleModal}
            ticketData={ticketData}
          />
        )}
      </Suspense>
    </PageLayout>
  )
}

export default Users
