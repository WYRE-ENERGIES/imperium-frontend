import React, { Suspense, lazy, useEffect, useState } from 'react'
import { Switch, Tag } from 'antd'
import {
  useGetAdminCustomersListQuery,
  useGetCustomerPageAnalyticsQuery,
  useGetCustomerPageStatisticsQuery,
} from '../../../features/slices/customersSlice'

import AdminPageLayout from '../../../components/Layout/AdminPageLayout/AdminPageLayout'
import CustomerChartWidget from '../../../components/Widget/Customers/CustomerChartWidget'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { FiHome } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import ReactAvatar from 'react-avatar'
import TableFooter from '../../../components/TableFooter/TableFooter'
import TableWithFilter from '../../../components/SHSTableWithFilter/SHSTableWithFilter'
import TotalClientWidget from '../../../components/Widget/Customers/TotalClientWidget'
import { ReactComponent as UsersIcon } from '../../../assets/widget-icons/users-icon.svg'
import WidgetFilter from '../../../components/WidgetFilter/WidgetFilter'
import classes from './Customers.module.scss'
import { formatLabel } from '../../../utils/helpers'
import useDebounce from '../../../hooks/useDebounce'

const SHSForm = lazy(() => import('./SHSForm/SHSForm'))
const ActivateCustomer = lazy(() =>
  import('./ActivateCustomer/ActivateCustomer'),
)

const Customers = () => {
  const [chartData, setChartData] = useState([
    {
      name: 'users',
      data: [],
    },
  ])
  const [selectedUser, setSelectedUser] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openActivateCustomerModal, setOpenActivateCustomerModal] =
    useState(false)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [globalFilter, setGlobalFilter] = useState('yearly')

  const toggleModal = () => setOpenModal(!openModal)
  const toggleActivateCustomerModal = (record) => {
    setSelectedUser(record)
    setOpenActivateCustomerModal(!openActivateCustomerModal)
  }

  const handleSearch = (e) => setSearch(e.target.value)
  const debounceValue = useDebounce(search, 1000)

  const { isLoading, isError, error, data, isFetching, refetch } =
    useGetAdminCustomersListQuery({
      page,
      search: debounceValue,
      filterBy: globalFilter,
    })

  const {
    isLoading: isAnalyticsLoading,
    isFetching: isAnalyticsFetching,
    isError: isAnalyticsError,
    error: analyticsError,
    data: analyticsData,
    refetch: analyticsRefetch,
  } = useGetCustomerPageAnalyticsQuery({ filterBy: globalFilter })

  const {
    isLoading: isStatisticsLoading,
    isFetching: isStatisticsFetching,
    isError: isStatisticsError,
    error: statisticsError,
    data: statisticsData,
    refetch: statisticsRefetch,
  } = useGetCustomerPageStatisticsQuery({ filterBy: globalFilter })

  useEffect(() => {
    const cData = chartData[0]
    if (!isStatisticsLoading && statisticsData?.length) {
      cData.data = statisticsData
    }

    setChartData([cData])
  }, [statisticsData])

  useEffect(() => {
    refetch()
    analyticsRefetch()
    statisticsRefetch()
  }, [globalFilter])

  const columns = [
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
      sorter: (a, b) => a.customer_name.localeCompare(b.customer_name),
      render: (_, record) => (
        <div className={classes.Customers__nameDiv}>
          <Switch
            defaultChecked={record.status}
            onChange={() => toggleActivateCustomerModal(record)}
          />
          <ReactAvatar
            size={30}
            round={true}
            name={record.customer_name || record.customer_email}
            fgColor="#385E2B"
            color="#F0F7ED"
          />
          <div className={classes.Customers__names}>
            <h3 style={{ color: record.status ? '' : '#C4C4C4' }}>
              {record.customer_name}
            </h3>
            <h4 style={{ color: record.status ? '' : '#C4C4C4' }}>
              {record.customer_email}
            </h4>
          </div>
        </div>
      ),
    },
    {
      title: 'Purchase Date',
      key: 'purchased_date',
      dataIndex: 'purchased_date',
      sorter: (a, b) =>
        a.purchased_date
          ? a.purchased_date.localeCompare(b.purchased_date)
          : null,
      render: (value, record) => (
        <p style={{ color: record.status ? '' : '#C4C4C4' }}>
          {new Date(value).toLocaleDateString()}
        </p>
      ),
    },
    {
      title: 'SHS',
      key: 'shs_count',
      dataIndex: 'shs_count',
      sorter: (a, b) => a.shs_count - b.shs_count,
      render: (value, record) => (
        <p style={{ color: record.status ? '' : '#C4C4C4' }}>
          {value.toLocaleString()}
        </p>
      ),
    },
    {
      title: 'Users',
      key: 'users_count',
      dataIndex: 'users_count',
      sorter: (a, b) => a.users_count - b.users_count,
      render: (value, record) => (
        <p style={{ color: record.status ? '' : '#C4C4C4' }}>{value}</p>
      ),
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
  ]

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
          <WidgetFilter
            selectFilterBy={(value) => setGlobalFilter(value)}
            filterBy={globalFilter}
          />
        </section>
        <div className={classes.Customers__widgets}>
          <CustomerChartWidget
            chartData={chartData}
            colors="#497A38"
            borderRadius={5}
            columnWidth={30}
            loading={isStatisticsLoading || isStatisticsFetching}
          />
          <div className={classes.Customers__innerWidgets}>
            <TotalClientWidget
              title="All Added Users"
              Icon={UsersIcon}
              count={
                analyticsData?.users
                  ? analyticsData?.users?.toLocaleString()
                  : 0
              }
              duration={formatLabel(globalFilter)}
              linkTo="/admin/users"
              loading={isAnalyticsLoading || isAnalyticsFetching}
            />
            <TotalClientWidget
              title="Total Imperium Client"
              count={
                analyticsData?.clients
                  ? analyticsData?.clients?.toLocaleString()
                  : 0
              }
              duration={formatLabel(globalFilter)}
              loading={isAnalyticsLoading || isAnalyticsFetching}
            />
          </div>
        </div>
        <div className={classes.Customers__shsTable}>
          <TableWithFilter
            columns={columns}
            data={data?.results}
            tableTitle="All Customers"
            filterOptions={[]}
            isAdmin={true}
            hasBtn={true}
            btnText="Add SHS"
            BtnIcon={FiHome}
            btnAction={toggleModal}
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
          />
        </div>
      </div>
      <Suspense fallback={<h4>Loading...</h4>}>
        {openModal && <SHSForm isOpen={openModal} toggleModal={toggleModal} />}
        {openActivateCustomerModal && (
          <ActivateCustomer
            user={selectedUser}
            isOpen={openActivateCustomerModal}
            toggleModal={toggleActivateCustomerModal}
          />
        )}
      </Suspense>
    </AdminPageLayout>
  )
}

export default Customers
