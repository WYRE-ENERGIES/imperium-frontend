import { ReactComponent as EnergyWidgetIcon } from '../../../assets/overview/energy-icon.svg'
import { ReactComponent as HomeWidgetIcon } from '../../../assets/overview/home-icon.svg'
import InstructionModal from './InstructionModal/InstructionModal'
import OverviewWidget from '../../../components/Widget/Overview/OverviewWidget'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import PageLayout from '../../../components/Layout/PageLayout'
import React from 'react'
import { ReactComponent as SEnergyWidgetIcon } from '../../../assets/overview/cancel-energy-con.svg'
import SHSTable from '../../../components/SHSTable/SHSTable'
import WidgetFilter from '../../../components/WidgetFilter/WidgetFilter'
import classes from './Overview.module.scss'

const Overview = () => {
  const widgets = [
    {
      id: 1,
      icon: EnergyWidgetIcon,
      title: 'Total Energy Generation ',
      range: 'For the year',
      value: '100.241',
    },
    {
      id: 2,
      icon: SEnergyWidgetIcon,
      title: 'Total Energy Consumption',
      range: 'For the year',
      value: '50.82',
    },
    {
      id: 3,
      icon: HomeWidgetIcon,
      title: 'Total SHS',
      range: 'For the year',
      value: '7',
    },
  ].map((widget) => (
    <OverviewWidget
      key={widget.id}
      Icon={widget.icon}
      range={widget.range}
      title={widget.title}
      value={widget.value}
    />
  ))

  return (
    <PageLayout>
      <div style={{ backgroundColor: '#FCFCFD' }} className={classes.Overview}>
        <section className={classes.Overview__headerSection}>
          <PageBreadcrumb title="Overview" />
        </section>
        <section className={classes.Overview__filters}>
          <WidgetFilter />
        </section>
        <div className={classes.Overview__widgets}>{widgets}</div>
        <div className={classes.Overview__shsTable}>
          <SHSTable />
        </div>
      </div>
      {/* <InstructionModal /> */}
    </PageLayout>
  )
}

export default Overview
