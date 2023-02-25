import { Button, Tag } from 'antd'
import React, { Suspense, lazy, useState, useTransition } from 'react'

import AdminPageLayout from '../../../components/Layout/AdminPageLayout/AdminPageLayout'
import { FiTrash2 } from 'react-icons/fi'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import PageLayout from '../../../components/Layout/PageLayout'
import { PlusOutlined } from '@ant-design/icons'
import ReactAvatar from 'react-avatar'
import Swal from 'sweetalert2'
import TableFooter from '../../../components/TableFooter/TableFooter'
import TableWithFilter from '../../../components/SHSTableWithFilter/SHSTableWithFilter'
import classes from './Users.module.scss'
import { useGetUsersListQuery } from '../../../features/slices/usersSlice'
import { useLocation } from 'react-router-dom'
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
          name={record.name || record.invitee_email}
          fgColor="#385E2B"
          color="#F0F7ED"
        />
        <div className={classes.Users__names}>
          {record.status !== 'PENDING' && <h3>{record.name}</h3>}
          <h4>{record.invitee_email}</h4>
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
    key: 'created_at',
    dataIndex: 'created_at',
    sorter: (a, b) => a.created_at.localeCompare(b.created_at),
    render: (val) => (val ? new Date(val).toLocaleDateString() : ''),
  },
  {
    title: 'Last Active',
    key: 'last_login',
    dataIndex: 'last_login',
    sorter: (a, b) =>
      a.last_login ? a.last_login.localeCompare(b.last_login) : null,
    render: (val) => (val ? new Date(val).toLocaleDateString() : ''),
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    sorter: (a, b) => a.status.localeCompare(b.status),
    render: (value) => {
      const color = value !== 'PENDING' ? '#027A48' : '#B54708'
      return (
        <Tag
          color={value !== 'PENDING' ? 'success' : 'error'}
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
          {value}
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
  const { pathname } = useLocation()
  const [openModal, setOpenModal] = useState(false)
  const [ticketData, setTicketData] = useState({})
  const [isPending, startTransition] = useTransition()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const toggleModal = () => setOpenModal(!openModal)
  const handleSearch = (e) => setSearch(e.target.value)

  const DefaultLayout = pathname.includes('admin')
    ? AdminPageLayout
    : PageLayout

  const { data, isFetching } = useGetUsersListQuery()

  return (
    <DefaultLayout>
      <div className={classes.Users}>
        <section className={classes.Users__headerSection}>
          <PageBreadcrumb title="Users" items={['Users']} />
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
        <TableWithFilter
          columns={columns}
          data={data?.results || userData}
          tableTitle="Users"
          isLoading={isFetching}
          handleSearch={handleSearch}
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
    </DefaultLayout>
  )
}

export default Users
