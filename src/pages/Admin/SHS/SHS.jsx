import React, { Suspense, lazy, useState } from 'react'
import { Switch, Tag } from 'antd'
import { TbActivityHeartbeat, TbBoltOff } from 'react-icons/tb'

import AdminEnergyAnalytic from '../../../components/Widget/AdminEnergyAnalytic/AdminEnergyAnalytic'
import AdminPageLayout from '../../../components/Layout/AdminPageLayout/AdminPageLayout'
import { BsDot } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import ReactAvatar from 'react-avatar'
import TableWithFilter from '../../../components/SHSTableWithFilter/SHSTableWithFilter'
import WidgetFilter from '../../../components/WidgetFilter/WidgetFilter'
import classes from '../../Customer/Support/Support.module.scss'
import { data } from '../../../components/SHSTable/tableData'

const ActivateShs = lazy(() => import('./ActivateShs/ActivateShs'))

const SHS = () => {
  const [selectedUser, setSelectedUser] = useState(false)
  const [openActivateShsModal, setOpenActivateShsModal] = useState(false)

  const toggleActivateShsModal = (record) => {
    setSelectedUser(record)
    setOpenActivateShsModal(!openActivateShsModal)
  }

  const widgets = [
    {
      id: 1,
      icon: TbBoltOff,
      title: 'Total Energy Consumped',
      duration: 'For the last 12 months',
      value: '1124.89',
      valueCurrency: 'kWh',
      graphColor: '#65AA4F',
    },
    {
      id: 2,
      icon: TbActivityHeartbeat,
      title: 'Total Energy Generated',
      duration: 'For the last 12 months',
      value: '654.14',
      valueCurrency: 'kWh',
      graphColor: '#C9E00C',
    },
    {
      id: 3,
      icon: TbActivityHeartbeat,
      title: 'Total Capacity',
      duration: 'For the last 12 months',
      value: '5480 kVA / 76.9 kW',
      graphColor: '#5714E4',
    },
  ].map((widget) => (
    <AdminEnergyAnalytic
      key={widget.id}
      Icon={widget.icon}
      duration={widget.duration}
      valueCurrency={widget.valueCurrency}
      title={widget.title}
      value={widget.value}
      graphColor={widget.graphColor}
    />
  ))

  const columns = [
    {
      title: 'SHS Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, record) => (
        <div className={classes.Support__nameDiv}>
          <Switch
            style={{ backgroundColor: record.status ? '#385E2B' : '' }}
            defaultChecked={record.status}
            onChange={() => toggleActivateShsModal(record)}
          />
          <ReactAvatar
            size={30}
            round={true}
            name={record.name}
            fgColor="#385E2B"
            color="#F0F7ED"
          />
          <div className={classes.Support__names}>
            <h3 style={{ color: record.status ? '' : '#C4C4C4' }}>
              {record.name}
            </h3>
            <h4 style={{ color: record.status ? '' : '#C4C4C4' }}>
              {record.email}
            </h4>
          </div>
        </div>
      ),
    },
    {
      title: 'Energy Consumed',
      key: 'energyConsumed',
      dataIndex: 'energyConsumed',
      render: (value, record) => (
        <p style={{ color: record.status ? '' : '#C4C4C4' }}>
          {value.toLocaleString()}
        </p>
      ),
    },
    {
      title: 'Energy Generated',
      key: 'energyGenerated',
      dataIndex: 'energyGenerated',
      render: (value, record) => (
        <p style={{ color: record.status ? '' : '#C4C4C4' }}>
          {value.toLocaleString()}
        </p>
      ),
    },
    {
      title: 'Location',
      key: 'location',
      dataIndex: 'location',
      render: (value, record) => {
        return (
          <div className={classes.Support__Location}>
            <h3 style={{ color: record.status ? '' : '#C4C4C4' }}>
              {value.area}
            </h3>
            <h4 style={{ color: record.status ? '' : '#C4C4C4' }}>
              {value.street}
            </h4>
          </div>
        )
      },
    },
    {
      title: 'Battery',
      key: 'battery',
      dataIndex: 'battery',
      render: (value, record) => {
        let color
        if (value < 30) {
          color = '#F04438'
        } else if (value > 30 && value < 70) {
          color = '#F4A118'
        } else {
          color = '#027A48'
        }

        return (
          <span style={{ color: record.status ? color : '#C4C4C4' }}>
            {value}%
          </span>
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
        </span>
      ),
      key: 'status',
      dataIndex: 'status',
      sorter: (a, b) => a.status - b.status,
      render: (value) => {
        const color = value ? '#027A48' : '#606062'
        return (
          <Tag
            color={value ? 'success' : '#E6E6E6'}
            key={value}
            style={{
              borderRadius: '10px',
              paddingLeft: 0,
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: 'fit-content',
              color: color,
            }}
          >
            <BsDot size={20} />
            {value ? 'On' : 'Off'}
          </Tag>
        )
      },
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Link
          style={{
            color: record.status ? '#385E2B' : '#C4C4C4',
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '20px',
          }}
          to="#"
        >
          View
        </Link>
      ),
    },
  ]

  return (
    <AdminPageLayout>
      <div className={classes.Support}>
        <section className={classes.Support__headerSection}>
          <PageBreadcrumb title="All SHS" items={['All SHS']} />
        </section>
        <section className={classes.Support__filters}>
          <WidgetFilter />
        </section>
        <div className={classes.Support__widgets}>{widgets}</div>
        <div className={classes.Support__shsTable}>
          <TableWithFilter
            columns={columns}
            data={data}
            tableTitle="SHS"
            filterOptions={[]}
            isAdmin={true}
          />
        </div>
      </div>
      <Suspense fallback={<h4>Loading...</h4>}>
        {openActivateShsModal && (
          <ActivateShs
            user={selectedUser}
            isOpen={openActivateShsModal}
            toggleModal={toggleActivateShsModal}
          />
        )}
      </Suspense>
    </AdminPageLayout>
  )
}

export default SHS
