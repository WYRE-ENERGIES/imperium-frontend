import React, { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { Switch, Tag } from 'antd'
import { TbActivityHeartbeat, TbBoltOff } from 'react-icons/tb'
import {
  useGetAllShsPageAnalyticsQuery,
  useGetShsTableDataQuery,
} from '../../../features/slices/allShsSlice'

import AdminEnergyAnalytic from '../../../components/Widget/AdminEnergyAnalytic/AdminEnergyAnalytic'
import AdminPageLayout from '../../../components/Layout/AdminPageLayout/AdminPageLayout'
import { BsDot } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import ReactAvatar from 'react-avatar'
import TableFooter from '../../../components/TableFooter/TableFooter'
import TableWithFilter from '../../../components/SHSTableWithFilter/SHSTableWithFilter'
import WidgetFilter from '../../../components/WidgetFilter/WidgetFilter'
import WidgetLoader from '../../../components/Widget/WidgetLoader/WidgetLoader'
import classes from '../../Customer/Support/Support.module.scss'
import { formatLabel } from '../../../utils/helpers'
import { tab } from '@testing-library/user-event/dist/tab'
import useDebounce from '../../../hooks/useDebounce'

const ActivateShs = lazy(() => import('./ActivateShs/ActivateShs'))

const SHS = () => {
  const [selectedDevice, setSelectedDevice] = useState({})
  const [openActivateShsModal, setOpenActivateShsModal] = useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [globalFilter, setGlobalFilter] = useState('yearly')
  const [tableFilter, setTableFilter] = useState('')
  const [widgets, setWidgets] = useState([])

  const handleSearch = (e) => setSearch(e.target.value)
  const debounceValue = useDebounce(search, 1000)

  const toggleActivateShsModal = (e, record) => {
    setSelectedDevice(record)
    setOpenActivateShsModal(!openActivateShsModal)
  }

  const { isError, error, data, isFetching } = useGetShsTableDataQuery({
    page,
    search: debounceValue,
    filterBy: globalFilter,
    tableFilter: tableFilter,
  })

  const {
    isFetching: isAnalyticsFetching,
    isError: isAnalyticsError,
    error: analyticsError,
    data: analyticsData,
    refetch: analyticRefetch,
  } = useGetAllShsPageAnalyticsQuery({ filterBy: globalFilter })

  useEffect(() => {
    if (isAnalyticsFetching) return
    setWidgets(
      [
        {
          id: 1,
          title: 'Total Energy Consumed',
          duration: 'For the last 12 months',
          value: analyticsData?.total_shs
            ? analyticsData?.total_shs?.toLocaleString()
            : 0,
          graphColor: '#65AA4F',
        },
        {
          id: 2,
          title: 'Total Energy Generated',
          duration: 'For the last 12 months',
          value: analyticsData?.energy_generated
            ? parseFloat(
                analyticsData?.energy_generated?.toFixed(1),
              )?.toLocaleString()
            : 0,
          valueCurrency: 'kWh',
          graphColor: '#C9E00C',
        },
        {
          id: 3,
          title: 'Total Capacity',
          duration: 'For the last 12 months',
          value: analyticsData?.capacity
            ? parseFloat(analyticsData?.capacity?.toFixed(1))?.toLocaleString()
            : 0,
          graphColor: '#5714E4',
        },
      ].map((widget) => (
        <AdminEnergyAnalytic
          key={widget.id}
          duration={formatLabel(globalFilter)}
          valueCurrency={widget.valueCurrency}
          title={widget.title}
          value={widget.value}
          graphColor={widget.graphColor}
        />
      )),
    )
  }, [isAnalyticsFetching, analyticsData, globalFilter])

  useEffect(() => {
    analyticRefetch()
  }, [globalFilter, analyticRefetch])

  const columns = [
    {
      title: 'Shs Device',
      dataIndex: 'device_name',
      key: 'device_name',
      sorter: (a, b) => a.device_name.localeCompare(b.device_name),
      render: (_, record) => {
        return (
          <div className={classes.Support__nameDiv}>
            <Switch
              checked={record.status === 'ON'}
              defaultChecked={record.status === 'ON'}
              onChange={(e) => toggleActivateShsModal(e, record)}
            />
            <ReactAvatar
              size={30}
              round={true}
              name={record.client_name}
              fgColor="#385E2B"
              color="#F0F7ED"
            />
            <div className={classes.Support__names}>
              <h3 style={{ color: record.status !== 'OFF' ? '' : '#C4C4C4' }}>
                {record.device_name}
              </h3>
              <h4 style={{ color: record.status !== 'OFF' ? '' : '#C4C4C4' }}>
                {record?.client_name}
              </h4>
            </div>
          </div>
        )
      },
    },

    {
      title: 'Energy Consumed',
      key: 'energy_consumed',
      dataIndex: 'energy_consumed',
      render: (value, record) => (
        <p style={{ color: record.status !== 'OFF' ? '' : '#C4C4C4' }}>
          {parseFloat(value?.toLocaleString())?.toFixed(1)}
        </p>
      ),
    },
    {
      title: 'Energy Generated',
      key: 'energy_generated',
      dataIndex: 'energy_generated',
      render: (value, record) => (
        <p style={{ color: record.status !== 'OFF' ? '' : '#C4C4C4' }}>
          {parseFloat(value?.toLocaleString())?.toFixed(1)}
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
            <h3 style={{ color: record.status !== 'OFF' ? '' : '#C4C4C4' }}>
              {value}
            </h3>
            {/* <h4 style={{ color: record.status !== 'OFF' ? '' : '#C4C4C4' }}>
              {value.street}
            </h4> */}
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
          <span style={{ color: record.status !== 'OFF' ? color : '#C4C4C4' }}>
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
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (value) => {
        const color = value && value !== 'OFF' ? '#027A48' : '#606062'
        return (
          <Tag
            color={value && value !== 'OFF' ? 'success' : '#E6E6E6'}
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
            {value || 'OFF'}
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
          to={`shs/${record.device_id}`}
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
          <WidgetFilter
            selectFilterBy={(value) => setGlobalFilter(value)}
            filterBy={globalFilter}
          />
        </section>
        <div className={classes.Support__widgets}>
          {widgets.length ? widgets : <WidgetLoader />}
        </div>
        <div className={classes.Support__shsTable}>
          <TableWithFilter
            columns={columns}
            data={data?.results}
            tableTitle="SHS"
            filterOptions={[
              { name: 'ON', value: 'ON' },
              { name: 'OFF', value: 'OFF' },
            ]}
            isAdmin={true}
            handleSearch={handleSearch}
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
            onFilterChanged={(e) => setTableFilter(e)}
            url={'imperium-admin/shs/list-table-export/'}
            tableName={'shs_table'}
            cancelValue=" "
          />
        </div>
      </div>
      <Suspense fallback={<h4>Loading...</h4>}>
        {openActivateShsModal && (
          <ActivateShs
            shs={selectedDevice}
            isOpen={openActivateShsModal}
            toggleModal={toggleActivateShsModal}
          />
        )}
      </Suspense>
    </AdminPageLayout>
  )
}

export default SHS
