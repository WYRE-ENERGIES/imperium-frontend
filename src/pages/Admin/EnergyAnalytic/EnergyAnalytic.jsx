import React, { useState } from 'react'
import { TbActivityHeartbeat, TbBoltOff } from 'react-icons/tb'
import {
  adminEnergyAnalyticColumns,
  energyFilterOptions,
} from '../../../utils/data'
import {
  useGetEnergyPageAnalyticsQuery,
  useGetEnergyTableDataQuery,
} from '../../../features/slices/energySlice'

import AdminEnergyAnalytic from '../../../components/Widget/AdminEnergyAnalytic/AdminEnergyAnalytic'
import AdminPageLayout from '../../../components/Layout/AdminPageLayout/AdminPageLayout'
import EnergyStatistics from '../../../components/EnergyStatistics/EnergyStatistics'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import { RiseOutlined } from '@ant-design/icons'
import SHSTableWithFilter from '../../../components/SHSTableWithFilter/SHSTableWithFilter'
import { Spin } from 'antd'
import TableFooter from '../../../components/TableFooter/TableFooter'
import WidgetFilter from '../../../components/WidgetFilter/WidgetFilter'
import { adminTableData } from '../../../components/SHSTableWithFilter/data'
import classes from '../../Customer/EnergyAnalytic/EnergyAnalytic.module.scss'
import { formatLabel } from '../../../utils/helpers'
import useDebounce from '../../../hooks/useDebounce'

const EnergyAnalytic = () => {
  const [chartData, setChartData] = useState([
    {
      name: 'Energy Consumed',
      data: [400, 500, 350, 420, 320, 500, 410, 430, 410, 500, 570, 400],
    },
    {
      name: 'Energy Generated',
      data: [400, 500, 230, 430, 260, 430, 390, 380, 390, 330, 430, 310],
    },
  ])

  const [areaChartData, setAreaChartData] = useState([
    {
      name: 'Energy Difference',
      data: [350, 400, 500, 420, 500, 570, 410, 430, 410, 500, 400, 320],
    },
  ])

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [globalFilter, setGlobalFilter] = useState('yearly')

  const handleSearch = (e) => setSearch(e.target.value)
  const debounceValue = useDebounce(search, 1000)

  const { isError, error, data, isFetching } = useGetEnergyTableDataQuery({
    page,
    search: debounceValue,
    filterBy: globalFilter,
  })

  const {
    isFetching: isAnalyticsFetching,
    isError: isAnalyticsError,
    error: analyticsError,
    data: analyticsData,
  } = useGetEnergyPageAnalyticsQuery({ filterBy: globalFilter })

  const {
    isFetching: isCapacityFetching,
    isError: isCapacityError,
    error: capacityError,
    data: capacityData,
  } = useGetEnergyPageAnalyticsQuery({ filterBy: globalFilter })

  let widgets = []
  if (!isAnalyticsFetching) {
    widgets = [
      {
        id: 1,
        icon: TbBoltOff,
        title: 'Total Energy Consumed',
        value: analyticsData?.energy_consumed || 0,
        valueCurrency: 'kWh',
        graphColor: '#65AA4F',
      },
      {
        id: 2,
        icon: TbActivityHeartbeat,
        title: 'Total Energy Generated',
        value: analyticsData?.energy_generated || 0,
        valueCurrency: 'kWh',
        graphColor: '#C9E00C',
      },
      {
        id: 3,
        icon: RiseOutlined,
        title: 'Energy Difference',
        valueCurrency: 'kWh',
        value: analyticsData?.capacity || 0,
      },
    ].map((widget) => (
      <AdminEnergyAnalytic
        key={widget.id}
        Icon={widget.icon}
        duration={formatLabel(globalFilter)}
        valueCurrency={widget.valueCurrency}
        title={widget.title}
        value={widget.value}
        graphColor={widget.graphColor}
      />
    ))
  }

  return (
    <AdminPageLayout>
      <div
        style={{ backgroundColor: '#FCFCFD' }}
        className={classes.EnergyAnalytic}
      >
        <section className={classes.EnergyAnalytic__headerSection}>
          <PageBreadcrumb title="Energy Analytic" items={['Energy Analytic']} />
        </section>
        <section className={classes.EnergyAnalytic__filters}>
          <WidgetFilter
            selectFilterBy={(value) => setGlobalFilter(value)}
            filterBy={globalFilter}
          />
        </section>
        <div className={classes.EnergyAnalytic__widgets}>
          {isAnalyticsFetching ? (
            <div
              style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '7px 0px',
              }}
            >
              <Spin size="large" />
            </div>
          ) : (
            widgets
          )}
        </div>
        <div className={classes.EnergyAnalytic__shsTable}>
          <SHSTableWithFilter
            columns={adminEnergyAnalyticColumns}
            data={data?.results}
            tableTitle="Energy Table"
            tagValue="kWh"
            filterOptions={[]}
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
          <EnergyStatistics
            duration="For the last 12 months"
            chartData={chartData}
            areaChartData={areaChartData}
          />
        </div>
      </div>
    </AdminPageLayout>
  )
}

export default EnergyAnalytic
