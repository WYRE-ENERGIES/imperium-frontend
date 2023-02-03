import { generalFilterOptions, panelData } from '../../../utils/data'

import EnergyAnalyticWidget from '../../../components/SHSTableWithFilter/SHSTableWithFilter'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import PageLayout from '../../../components/Layout/PageLayout'
import PanelWidgets from '../../../components/Widget/Panel/Panel'
import React from 'react'
import ShsCapacityDropdown from '../../../components/ShsCapacityDropdown/ShsCapacityDropdown'
import WidgetFilter from '../../../components/WidgetFilter/WidgetFilter'
import classes from './PanelAnalytic.module.scss'
import { useWeather } from '../../../hooks/useWeather'

const columns = [
  {
    title: 'Monthly',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Panel Voltage',
    key: 'panelVoltage',
    dataIndex: 'panelVoltage',
    render: (value) => `${value.toLocaleString()} V`,
  },
  {
    title: 'Panel Current',
    key: 'panelCurrent',
    dataIndex: 'panelCurrent',
    render: (value) => `${value.toLocaleString()} A`,
  },
  {
    title: 'Panel Power',
    key: 'panelPower',
    dataIndex: 'panelPower',
    render: (value) => `${value.toLocaleString()} W`,
  },
  {
    title: 'Panel Total Energy',
    key: 'panelTotalEnergy',
    dataIndex: 'panelTotalEnergy',
    render: (value) => `${value.toLocaleString()} WH`,
  },
]

const PanelAnalytic = () => {
  const [coord, weatherResult, isLoading, error] = useWeather()

  return (
    <PageLayout>
      <div
        style={{ backgroundColor: '#FCFCFD' }}
        className={classes.PanelAnalytic}
      >
        <section className={classes.PanelAnalytic__headerSection}>
          <PageBreadcrumb title="Panel Analytic" />
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
            columns={columns}
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
