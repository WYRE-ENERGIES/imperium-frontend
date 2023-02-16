import React, { useState } from 'react'
import { TbActivityHeartbeat, TbBoltOff } from 'react-icons/tb'
import {
  adminEnergyAnalyticColumns,
  energyFilterOptions,
} from '../../../utils/data'

import AdminEnergyAnalytic from '../../../components/Widget/AdminEnergyAnalytic/AdminEnergyAnalytic'
import AdminPageLayout from '../../../components/Layout/AdminPageLayout/AdminPageLayout'
import EnergyStatistics from '../../../components/EnergyStatistics/EnergyStatistics'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import { RiseOutlined } from '@ant-design/icons'
import SHSTableWithFilter from '../../../components/SHSTableWithFilter/SHSTableWithFilter'
import WidgetFilter from '../../../components/WidgetFilter/WidgetFilter'
import { adminTableData } from '../../../components/SHSTableWithFilter/data'
import classes from '../../Customer/EnergyAnalytic/EnergyAnalytic.module.scss'

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
      name: 'Energy Consumed',
      data: [350, 400, 500, 420, 500, 570, 410, 430, 410, 500, 400, 320],
    },
  ])

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
      icon: RiseOutlined,
      title: 'Capacity',
      duration: 'For the last 12 months',
      value: '654.14',
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
          <WidgetFilter />
        </section>
        <div className={classes.EnergyAnalytic__widgets}>{widgets}</div>
        <div className={classes.EnergyAnalytic__shsTable}>
          <SHSTableWithFilter
            columns={adminEnergyAnalyticColumns}
            data={adminTableData}
            tableTitle="Energy Table"
            tagValue="kWh"
            filterOptions={energyFilterOptions}
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
