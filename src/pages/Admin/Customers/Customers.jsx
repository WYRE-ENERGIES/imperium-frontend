import React, { Suspense, useState, useTransition } from 'react'
import { Switch, Tag } from 'antd'

import AdminPageLayout from '../../../components/Layout/AdminPageLayout/AdminPageLayout'
import CustomerChartWidget from '../../../components/Widget/Customers/CustomerChartWidget'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { FiHome } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import ReactAvatar from 'react-avatar'
import SHSForm from './SHSForm/SHSForm'
import TableWithFilter from '../../../components/SHSTableWithFilter/SHSTableWithFilter'
import TotalClientWidget from '../../../components/Widget/Customers/TotalClientWidget'
import { ReactComponent as UsersIcon } from '../../../assets/widget-icons/users-icon.svg'
import WidgetFilter from '../../../components/WidgetFilter/WidgetFilter'
import classes from './Customers.module.scss'
import { customersData } from '../../../utils/userData'

const columns = [
  {
    title: 'Client',
    dataIndex: 'client',
    key: 'client',
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (_, record) => (
      <div className={classes.Customers__nameDiv}>
        <Switch
          style={{ backgroundColor: record.status ? '#385E2B' : '' }}
          defaultChecked={record.status}
          onChange={() => console.log('clicked')}
        />
        <ReactAvatar
          size={30}
          round={true}
          name={record.name}
          fgColor="#385E2B"
          color="#F0F7ED"
        />
        <div className={classes.Customers__names}>
          <h3>{record.name}</h3>
          <h4>{record.email}</h4>
        </div>
      </div>
    ),
  },
  {
    title: 'Purchase Date',
    key: 'purchaseDate',
    dataIndex: 'purchaseDate',
    render: (value) => value.toLocaleString(),
  },
  {
    title: 'SHS',
    key: 'noOfShs',
    dataIndex: 'noOfShs',
    sorter: (a, b) => a.noOfShs - b.noOfShs,
    render: (value) => value.toLocaleString(),
  },
  {
    title: 'Users',
    key: 'noOfUsers',
    dataIndex: 'noOfUsers',
    sorter: (a, b) => a.noOfUsers - b.noOfUsers,
    render: (value) => value.toLocaleString(),
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
          {value ? 'Active' : 'Deactivated'}
        </Tag>
      )
    },
  },
  {
    title: '',
    key: 'action',
    // width: '10%',
    align: 'center',
    render: (_, record) => {
      const color = record.status ? '#808080' : '#B54708'
      return (
        <div className={classes.Customers__actions}>
          <ExclamationCircleOutlined style={{ color }} />
          <Link
            to="#"
            style={{
              color: record.status ? '#385E2B' : '#C4C4C4',
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '20px',
            }}
          >
            View
          </Link>
        </div>
      )
    },
  },
]

const Customers = () => {
  const [chartData, setChartData] = useState([
    {
      name: 'users',
      data: [400, 500, 350, 420, 320, 500, 410, 430, 410, 500, 570, 400],
    },
  ])
  const [openModal, setOpenModal] = useState(false)
  const [isPending, startTransition] = useTransition()

  const toggleModal = () => setOpenModal(!openModal)

  return (
    <AdminPageLayout>
      <div className={classes.Customers}>
        <section className={classes.Customers__headerSection}>
          <PageBreadcrumb
            title="Customers"
            items={['Customers', 'Assign SHS']}
          />
        </section>
        <section className={classes.Customers__filters}>
          <WidgetFilter />
        </section>
        <div className={classes.Customers__widgets}>
          <CustomerChartWidget
            chartData={chartData}
            colors="#497A38"
            borderRadius={5}
            columnWidth={30}
          />
          <TotalClientWidget
            title="All Added Users"
            Icon={UsersIcon}
            count={598}
            duration="For the last 12 months"
          />
          <TotalClientWidget
            title="Total Imperium Client"
            count={214}
            duration="For the last 12 months"
          />
        </div>
        <div className={classes.Customers__shsTable}>
          <TableWithFilter
            columns={columns}
            data={customersData}
            tableTitle="All Customers"
            filterOptions={[]}
            isAdmin={true}
            hasBtn={true}
            btnText="Add SHS"
            BtnIcon={FiHome}
            btnAction={toggleModal}
          />
        </div>
      </div>
      <Suspense fallback={<h4>Loading...</h4>}>
        {openModal && <SHSForm isOpen={openModal} toggleModal={toggleModal} />}
      </Suspense>
    </AdminPageLayout>
  )
}

export default Customers
