import React, { Suspense, lazy, useState, useTransition } from 'react'
import { Tag, Tooltip } from 'antd'

import AdminPageLayout from '../../../components/Layout/AdminPageLayout/AdminPageLayout'
import { BsDot } from 'react-icons/bs'
import { FaRegQuestionCircle } from 'react-icons/fa'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import { ReactComponent as ResolvedIcon } from '../../../assets/widget-icons/resolved-icon.svg'
import SupportWidget from '../../../components/Widget/Support/SupportWidget'
import TableWithFilter from '../../../components/SHSTableWithFilter/SHSTableWithFilter'
import { ReactComponent as TicketIcon } from '../../../assets/widget-icons/ticket-icon.svg'
import { ReactComponent as UnResolvedIcon } from '../../../assets/widget-icons/unresolved-icon.svg'
import classes from '../../Customer/Support/Support.module.scss'

const TicketForm = lazy(() =>
  import('../../Customer/Support/TicketForm/TicketForm'),
)

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

const Support = () => {
  const [openModal, setOpenModal] = useState(false)
  const [ticketData, setTicketData] = useState({})
  const [ticketTitle, setTicketTitle] = useState('')
  const [isPending, startTransition] = useTransition()

  const toggleModal = () => setOpenModal(!openModal)

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

  const widgets = [
    { icon: TicketIcon, name: 'All Tickets', value: 300 },
    { icon: UnResolvedIcon, name: 'Unresolved Tickets', value: 24 },
    { icon: ResolvedIcon, name: 'Resolved Tickets', value: 276 },
  ].map((ticket, index) => (
    <SupportWidget
      key={index}
      Icon={ticket.icon}
      name={ticket.name}
      value={ticket.value}
    />
  ))

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
          <PageBreadcrumb title="Support Ticket" />
        </section>
        <div className={classes.Support__widgets}>{widgets}</div>
        <div className={classes.Support__shsTable}>
          <TableWithFilter
            columns={columns}
            data={data}
            tableTitle="User Issues Ticket"
            filterOptions={[]}
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
    </AdminPageLayout>
  )
}

export default Support
