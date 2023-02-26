import {
  generalFilterOptions,
  panelColumns,
  panelData,
} from '../../../utils/data'

import EnergyAnalyticWidget from '../../../components/SHSTableWithFilter/SHSTableWithFilter'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import PageLayout from '../../../components/Layout/PageLayout'
import PanelWidgets from '../../../components/Widget/Panel/Panel'
import React from 'react'
import ShsCapacityDropdown from '../../../components/ShsCapacityDropdown/ShsCapacityDropdown'
import WidgetFilter from '../../../components/WidgetFilter/WidgetFilter'
import classes from './PanelAnalytic.module.scss'
import useWeather from '../../../hooks/useWeather'

const PanelAnalytic = () => {
  const [coord, weatherResult, isLoading, error] = useWeather()

  return (
    <PageLayout>
      <div
        style={{ backgroundColor: '#FCFCFD' }}
        className={classes.PanelAnalytic}
      >
        <section className={classes.PanelAnalytic__headerSection}>
          <PageBreadcrumb title="Panel Analytic" items={['Panel Analytic']} />
          <ShsCapacityDropdown />
        </section>
        <section className={classes.PanelAnalytic__filters}>
          <WidgetFilter />
        </section>
        <div className={classes.PanelAnalytic__widgets}>
          <PanelWidgets totalPanel={8} />
        </div>
        <div className={classes.PanelAnalytic__shsTable}>
          <EnergyAnalyticWidget
            columns={panelColumns}
            data={panelData}
            tableTitle="Panel Table"
            tagValue="kWh"
            filterOptions={generalFilterOptions}
          />
        </div>
      </div>
    </PageLayout>
  )
}

export default PanelAnalytic
