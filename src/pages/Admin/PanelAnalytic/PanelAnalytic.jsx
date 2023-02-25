import {
  generalFilterOptions,
  panelColumns,
  panelData,
} from '../../../utils/data'

import AdminPageLayout from '../../../components/Layout/AdminPageLayout/AdminPageLayout'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import PanelTable from '../../../components/SHSTableWithFilter/SHSTableWithFilter'
import PanelWidgets from '../../../components/Widget/Panel/Panel'
import React from 'react'
import WidgetFilter from '../../../components/WidgetFilter/WidgetFilter'
import classes from '../../Customer/PanelAnalytic/PanelAnalytic.module.scss'
import useWeather from '../../../hooks/useWeather'

const PanelAnalytic = () => {
  const [coord, weatherResult, isLoading, error] = useWeather()

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
          <WidgetFilter />
        </section>
        <div className={classes.PanelAnalytic__widgets}>
          <PanelWidgets totalPanel={8} />
        </div>
        <div className={classes.PanelAnalytic__shsTable}>
          <PanelTable
            columns={panelColumns}
            data={panelData}
            tableTitle="Panel Table"
            tagValue="kWh"
            filterOptions={generalFilterOptions}
            isAdmin={true}
          />
        </div>
      </div>
    </AdminPageLayout>
  )
}

export default PanelAnalytic
