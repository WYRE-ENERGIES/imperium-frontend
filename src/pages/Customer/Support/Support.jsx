import React, { Suspense, lazy, useState, useTransition } from 'react'

import { Button } from 'antd'
import { ReactComponent as Logo } from '../../../assets/icon.svg'
import { MdNorthEast } from 'react-icons/md'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import PageLayout from '../../../components/Layout/PageLayout'
import TableFooter from '../../../components/TableFooter/TableFooter'
import TicketTable from './TicketTable/TicketTable'
import classes from './Support.module.scss'
import { useGetClientSupportTicketsQuery } from '../../../features/slices/supportSlice'

const TicketForm = lazy(() => import('./TicketForm/TicketForm'))
const data = [
  { title: 'Contact Us', description: 'Imperium Support Mediums', icon: false },
  { title: 'Phone Number', description: '07029189834', icon: true },
  { title: 'Email', description: 'hello@imperium.com', icon: true },
]

const InnerCard = ({ title, description, icon }) => (
  <div className={classes.Support__innerSection}>
    <p className={classes.Support__title}>{title}</p>
    <p className={classes.Support__p}>
      {!icon && <Logo className={classes.Support__logo} />}
      {description}
      {icon && <MdNorthEast className={classes.Support__icon} size={12} />}
    </p>
  </div>
)

const Support = () => {
  const [openModal, setOpenModal] = useState(false)
  const [ticketData, setTicketData] = useState({})
  const [isPending, startTransition] = useTransition()
  const [page, setPage] = useState(1)

  const toggleModal = () => setOpenModal(!openModal)

  const handleEditTicket = (data) => {
    startTransition(() => {
      setTicketData((prev) => ({ ...prev, ...data }))
      toggleModal()
    })
  }
  const { data: supportData, isFetching } =
    useGetClientSupportTicketsQuery(page)

  return (
    <PageLayout>
      <div className={classes.Support} style={{ backgroundColor: '#FCFCFD' }}>
        <section className={classes.Support__headerSection}>
          <PageBreadcrumb title="Support" items={['Support']} />
          <Button
            className={classes.Support__button}
            onClick={() => {
              startTransition(() => {
                setTicketData({})
                toggleModal()
              })
            }}
          >
            Create Ticket
          </Button>
        </section>
        <section className={classes.Support__topSection}>
          <TicketTable
            onEditTicket={handleEditTicket}
            loading={isFetching}
            data={supportData?.results}
            footer={() => (
              <TableFooter
                pageNo={supportData?.page}
                totalPages={supportData?.total_pages}
                handleClick={setPage}
                hasNext={supportData?.page === supportData?.total_pages}
                hasPrev={!supportData?.total_pages || supportData?.page === 1}
              />
            )}
          />
        </section>
        <section className={classes.Support__bottomSection}>
          {data.map((item, index) => (
            <InnerCard
              key={`${item.title} ${index}`}
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </section>
      </div>
      <Suspense fallback="loading">
        {openModal && (
          <TicketForm
            title="Create Ticket"
            isOpen={openModal}
            toggleModal={toggleModal}
            ticketData={ticketData}
            isAdmin={false}
          />
        )}
      </Suspense>
    </PageLayout>
  )
}

export default Support
