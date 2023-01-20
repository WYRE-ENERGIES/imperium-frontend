import React, { useState } from 'react'

import { Button } from 'antd'
import { ReactComponent as Logo } from '../../../assets/icon.svg'
import { MdNorthEast } from 'react-icons/md'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import PageLayout from '../../../components/Layout/PageLayout'
import TicketForm from './TicketForm/TicketForm'
import TicketTable from './TicketTable/TicketTable'
import classes from './Support.module.scss'

const data = [
  { title: 'Contact Us', description: 'Imperium Support Mediums', icon: false },
  { title: 'Phone Number', description: '07029189834', icon: true },
  { title: 'Email', description: 'hello@imperium.com', icon: true },
]

const InnerCard = ({ title, description, icon }) => (
  <div className={classes.Support__innerSection}>
    <p>{title}</p>
    <p className={classes.Support__p}>
      {!icon && <Logo style={{ marginRight: 13 }} />}
      {description}
      {icon && <MdNorthEast style={{ marginLeft: 13 }} size={15} />}
    </p>
  </div>
)

export const Support = () => {
  const [openModal, setOpenModal] = useState(false)

  const toggleModal = () => setOpenModal(!openModal)

  return (
    <PageLayout>
      <div className={classes.Support} style={{ backgroundColor: '#FCFCFD' }}>
        <section className={classes.Support__headerSection}>
          <PageBreadcrumb title="Support" />
          <Button className={classes.Support__button} onClick={toggleModal}>
            Create Ticket
          </Button>
        </section>
        <section className={classes.Support__topSection}>
          <TicketTable />
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
      <TicketForm
        title="Create Ticket"
        isOpen={openModal}
        toggleModal={toggleModal}
      />
    </PageLayout>
  )
}
