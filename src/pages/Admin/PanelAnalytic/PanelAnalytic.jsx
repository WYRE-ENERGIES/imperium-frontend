import React, { useEffect, useState } from 'react'
import { generalFilterOptions, panelColumns } from '../../../utils/data'
import {
  useGetPanelPageAnalyticsQuery,
  useGetPanelTableDataQuery,
} from '../../../features/slices/panelSlice'

import AdminPageLayout from '../../../components/Layout/AdminPageLayout/AdminPageLayout'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import PanelTable from '../../../components/SHSTableWithFilter/SHSTableWithFilter'
import PanelWidgets from '../../../components/Widget/Panel/Panel'
import TableFooter from '../../../components/TableFooter/TableFooter'
import WidgetFilter from '../../../components/WidgetFilter/WidgetFilter'
import WidgetLoader from '../../../components/Widget/WidgetLoader/WidgetLoader'
import classes from '../../Customer/PanelAnalytic/PanelAnalytic.module.scss'
import useDebounce from '../../../hooks/useDebounce'
import useWeather from '../../../hooks/useWeather'

const PanelAnalytic = () => {
  const [coord, weatherResult, isLoading, error] = useWeather()
  const [widgets, setWidgets] = useState(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [globalFilter, setGlobalFilter] = useState('yearly')

  const handleSearch = (e) => setSearch(e.target.value)
  const debounceValue = useDebounce(search, 1000)

  const {
    isError,
    error: tableError,
    data,
    isFetching,
    refetch,
  } = useGetPanelTableDataQuery({
    page,
    search: debounceValue,
    filterBy: globalFilter,
  })

  const {
    isFetching: isAnalyticsFetching,
    isError: isAnalyticsError,
    error: analyticsError,
    data: analyticsData,
    refetch: refetchAnalytics,
  } = useGetPanelPageAnalyticsQuery({ filterBy: globalFilter })

  useEffect(() => {
    if (isAnalyticsFetching) return
    if (isAnalyticsError) {
      setWidgets({})
      return
    }
    setWidgets(analyticsData)
  }, [isAnalyticsFetching, analyticsData])

  useEffect(() => {
    refetch()
    refetchAnalytics()
  }, [globalFilter])

  return (
    <AdminPageLayout>
      <div
        style={{ backgroundColor: '#FCFCFD' }}
        className={classes.PanelAnalytic}
      >
        <section className={classes.PanelAnalytic__headerSection}>
          <PageBreadcrumb title="Panel Analytic" items={['Panel Analytic']} />
        </section>
        <section className={classes.PanelAnalytic__filters}>
          <WidgetFilter
            selectFilterBy={(value) => setGlobalFilter(value)}
            filterBy={globalFilter}
          />
        </section>
        <div className={classes.PanelAnalytic__widgets}>
          {isAnalyticsFetching && !widgets ? (
            <WidgetLoader />
          ) : (
            <PanelWidgets
              data={widgets}
              isLoading={isAnalyticsFetching}
              weatherLoading={isLoading}
              result={weatherResult}
              globalFilter={globalFilter}
              weatherError={error}
            />
          )}
        </div>
        <div className={classes.PanelAnalytic__shsTable}>
          <PanelTable
            columns={panelColumns}
            data={data?.results}
            tableTitle="Panel Table"
            tagValue="kWh"
            filterOptions={[]}
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
          />
        </div>
      </div>
    </AdminPageLayout>
  )
}

export default PanelAnalytic
