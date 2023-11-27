import React, { Suspense, lazy, useState, useTransition } from 'react'
import { Spin, Tag, Tooltip } from 'antd'
import { ToastContainer, toast } from 'react-toastify'
import { supportPriorityEnums, supportStatusEnums } from '../../../utils/enums'
import {
  useGetAdminSupportTicketsQuery,
  useGetSupportPageAnalyticsQuery,
} from '../../../features/slices/supportSlice'

import AdminPageLayout from '../../../components/Layout/AdminPageLayout/AdminPageLayout'
import { BsDot } from 'react-icons/bs'
import { FaRegQuestionCircle } from 'react-icons/fa'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import { ReactComponent as ResolvedIcon } from '../../../assets/widget-icons/resolved-icon.svg'
import SupportWidget from '../../../components/Widget/Support/SupportWidget'
import TableFooter from '../../../components/TableFooter/TableFooter'
import TableWithFilter from '../../../components/SHSTableWithFilter/SHSTableWithFilter'
import { ReactComponent as TicketIcon } from '../../../assets/widget-icons/ticket-icon.svg'
import { ReactComponent as UnResolvedIcon } from '../../../assets/widget-icons/unresolved-icon.svg'
import classes from '../../Customer/Support/Support.module.scss'
import useDebounce from '../../../hooks/useDebounce'

const TicketForm = lazy(() => import('./TicketForm/TicketForm'))

const getColor = (name) => {
  let color = ''

  switch (name) {
    case supportStatusEnums.PENDING:
      color = 'warning'
      break
    case supportStatusEnums.RESOLVED:
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
    case supportPriorityEnums.URGENT:
      color = '#B42318'
      break
    case supportPriorityEnums.NORMAL:
      color = '#363F72'
      break
  }

  return color
}

const Support = () => {
  const [openModal, setOpenModal] = useState(false)
  const [ticketData, setTicketData] = useState({})
  const [ticketTitle, setTicketTitle] = useState('')
  const [isPending, startTransition] = useTransition()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [ordering, setOrdering] = useState('')

  const toggleModal = () => setOpenModal(!openModal)
  const handleSearch = (e) => setSearch(e.target.value)
  const debounceValue = useDebounce(search, 1000)

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '5%',
      render: (text) => `#${text}`,
    },
    {
      title: 'Date',
      key: 'purchased_date',
      dataIndex: 'created_at',
      sorter: (a, b) =>
        a.created_at ? a.created_at.localeCompare(b.created_at) : null,
      render: (value, record) => (
        <p style={{ color: record.status ? '' : '#C4C4C4' }}>
          {new Date(value).toLocaleDateString()}
        </p>
      ),
    },
    {
      title: 'Client Name',
      dataIndex: 'client',
      key: 'client',
    },
    {
      title: 'User Name',
      dataIndex: 'user',
      key: 'user',
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
          Status
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
      align: 'center',
      render: (_, record) => (
        <a
          to="#"
          style={{
            color: record.status ? '#385E2B' : '#C4C4C4',
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '20px',
          }}
          onClick={() => handleEditTicket(record)}
        >
          View
        </a>
      ),
    },
  ]
  const handleEditTicket = (data) => {
    startTransition(() => {
      setTicketTitle(`Ticket #${data.id}`)
      setTicketData((prev) => ({ ...prev, ...data }))
      toggleModal()
    })
  }

  const { isLoading, isError, error, data, isFetching } =
    useGetAdminSupportTicketsQuery({
      page,
      search: debounceValue,
      ordering,
    })

  const {
    isLoading: isAnalyticsLoading,
    isError: isAnalyticsError,
    error: analyticsError,
    data: analyticsData,
  } = useGetSupportPageAnalyticsQuery()

  let widgets = []
  if (!isAnalyticsLoading) {
    widgets = [
      {
        icon: TicketIcon,
        name: 'All Tickets',
        value: analyticsData?.all ? analyticsData?.all?.toLocaleString() : 0,
      },
      {
        icon: UnResolvedIcon,
        name: 'Unresolved Tickets',
        value: analyticsData?.unresolved
          ? analyticsData?.unresolved?.toLocaleString()
          : 0,
      },
      {
        icon: ResolvedIcon,
        name: 'Resolved Tickets',
        value: analyticsData?.resolved
          ? analyticsData?.resolved?.toLocaleString()
          : 0,
      },
    ].map((ticket, index) => (
      <SupportWidget
        key={index}
        Icon={ticket.icon}
        name={ticket.name}
        value={ticket.value}
      />
    ))
  }

  return (
    <AdminPageLayout>
      <div className={classes.Support}>
        <section className={classes.Support__headerSection}>
          <PageBreadcrumb title="Support Ticket" items={['Support Ticket']} />
        </section>
        <div className={classes.Support__widgets}>
          {isAnalyticsLoading ? <Spin size="large" /> : widgets}
        </div>
        <div className={classes.Support__shsTable}>
          <TableWithFilter
            columns={columns}
            data={data?.results}
            tableTitle="User Issues Ticket"
            filterOptions={[
              {
                value: 'created_at',
                name: 'Date',
              },
              {
                value: 'priority',
                name: 'Priority',
              },
            ]}
            handleSearch={handleSearch}
            onFilterChanged={(value) => setOrdering(value)}
            isLoading={isFetching}
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
      <Suspense fallback="loading">
        {openModal && (
          <TicketForm
            title={ticketTitle}
            isOpen={openModal}
            toggleModal={toggleModal}
            ticketData={ticketData}
            isAdmin={true}
          />
        )}
      </Suspense>
      <ToastContainer />
    </AdminPageLayout>
  )
}

export default Support
