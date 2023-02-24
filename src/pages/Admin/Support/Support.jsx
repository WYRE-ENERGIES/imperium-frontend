import React, {
  Suspense,
  lazy,
  useEffect,
  useState,
  useTransition,
} from 'react'
import { Spin, Tag, Tooltip } from 'antd'
import { ToastContainer, toast } from 'react-toastify'
import {
  getAdminSupportData,
  getAllAdminSupportTickets,
} from '../../../features/slices/supportSlice'
import {
  requestStatusEnum,
  supportPriorityEnums,
  supportStatusEnums,
} from '../../../utils/enums'
import { useDispatch, useSelector } from 'react-redux'

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
import tableClasses from '../../../components/TableFooter/TableFooter.module.scss'

const TicketForm = lazy(() =>
  import('../../Customer/Support/TicketForm/TicketForm'),
)

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
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [filterOption, setFilterOption] = useState('')
  const [isPending, startTransition] = useTransition()
  const dispatch = useDispatch()

  const toggleModal = () => setOpenModal(!openModal)
  const { results, status, message } = useSelector((state) => state.support)

  console.log(status)
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

  const handleSearch = (e) => setSearchQuery(e.target.value)

  useEffect(() => {
    dispatch(
      getAdminSupportData({
        search: searchQuery,
        ordering: filterOption,
        page,
      }),
    )
  }, [])

  useEffect(() => {
    if (status !== requestStatusEnum.IDLE) {
      dispatch(
        getAllAdminSupportTickets({
          search: searchQuery,
          ordering: filterOption,
          page,
        }),
      )
    }
  }, [searchQuery, filterOption, page])

  // if (status === requestStatusEnum.FAILED) {
  //   toast.error(`here ${message}`, {
  //     hideProgressBar: true,
  //     autoClose: 3000,
  //     theme: 'colored',
  //   })
  // }

  let widgets = []

  if (results.analytics) {
    widgets = [
      {
        icon: TicketIcon,
        name: 'All Tickets',
        value: results.analytics.all || 0,
      },
      {
        icon: UnResolvedIcon,
        name: 'Unresolved Tickets',
        value: results.analytics.unresolved || 0,
      },
      {
        icon: ResolvedIcon,
        name: 'Resolved Tickets',
        value: results.analytics.resolved || 0,
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

  const handleEditTicket = (data) => {
    startTransition(() => {
      setTicketTitle(`Ticket #${data.id}`)
      setTicketData((prev) => ({ ...prev, ...data }))
      toggleModal()
    })
  }

  return (
    <AdminPageLayout>
      <div className={classes.Support}>
        <section className={classes.Support__headerSection}>
          <PageBreadcrumb title="Support Ticket" items={['Support Ticket']} />
        </section>
        <div className={classes.Support__widgets}>
          {status === requestStatusEnum.LOADING && !results.analytics ? (
            <Spin />
          ) : (
            widgets
          )}
        </div>
        <div className={classes.Support__shsTable}>
          <TableWithFilter
            columns={columns}
            data={results.tickets?.results}
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
            isLoading={status === requestStatusEnum.LOADING}
            handleSearch={handleSearch}
            onFilterChanged={(value) => setFilterOption(value)}
            footer={() => (
              <TableFooter
                pageNo={1}
                handleClick={setPage}
                hasNext={results.tickets?.next}
                hasPrev={results.tickets?.previous}
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
