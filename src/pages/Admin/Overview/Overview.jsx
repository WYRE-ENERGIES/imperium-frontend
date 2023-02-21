import { Button, List } from 'antd'
import React, { useState } from 'react'
import {
  additionalOverviewBarProps,
  additionalOverviewProps,
} from '../../../components/Charts/data'

import AdminEnergyAnalytic from '../../../components/Widget/AdminEnergyAnalytic/AdminEnergyAnalytic'
import AdminPageLayout from '../../../components/Layout/AdminPageLayout/AdminPageLayout'
import AreaChart from '../../../components/Charts/AreaChart/AreaChart'
import Donut from '../../../components/Charts/Donut/Donut'
import { ReactComponent as GraphIcon } from '../../../assets/widget-icons/Line.svg'
import { ReactComponent as GraphIcon2 } from '../../../assets/widget-icons/overview-line-icon.svg'
import PageBreadcrumb from '../../../components/PageBreadcrumb/PageBreadcrumb'
import SHSTable from '../../../components/SHSTable/SHSTable'
import ShsDeviceMap from '../../../components/Map/ShsDeviceMap'
import SimpleBarChart from '../../../components/Charts/SimpleBarChart/SimpleBarChart'
import WidgetFilter from '../../../components/WidgetFilter/WidgetFilter'
import classes from '../../Customer/Overview/Overview.module.scss'
import { listData } from '../../../utils/data'

const Overview = () => {
  const [pieChartData, setPieChartData] = useState([50, 75, 64, 35, 80, 27])
  const [areaChartData, setAreaChartData] = useState([
    {
      name: 'Energy Consumed',
      data: [350, 400, 500, 420, 500, 570, 410, 430, 410, 500, 400, 320],
    },
    {
      name: 'Energy Generation',
      data: [300, 350, 450, 320, 450, 470, 310, 330, 310, 450, 300, 220],
    },
  ])
  const [chartData, setChartData] = useState([
    {
      name: 'Bad Battery Status',
      data: [400, 500, 350, 420, 320, 500, 410, 430, 410, 500, 570, 400],
    },
  ])
  const [voltageChartData, setVoltageChartData] = useState([
    {
      name: 'Current',
      data: [350, 400, 500, 420, 500, 570, 410, 430, 410, 500, 400, 320],
    },
    {
      name: 'Voltage',
      data: [300, 350, 450, 320, 450, 470, 310, 330, 310, 450, 300, 220],
    },
  ])

  const widgets = [
    {
      id: 1,
      title: 'Total Energy Generation',
      duration: 'For the last 12 months',
      value: '1124.89',
      valueCurrency: 'kWh',
      graph: GraphIcon2,
    },
    {
      id: 2,
      title: 'Total Energy Consumption',
      duration: 'For the last 12 months',
      value: '654.14',
      valueCurrency: 'kWh',
      graph: GraphIcon,
    },
    {
      id: 3,
      title: 'Total Customers',
      duration: 'For the last 12 months',
      value: '279',
      graph: GraphIcon2,
    },
  ].map((widget) => (
    <AdminEnergyAnalytic
      key={widget.id}
      duration={widget.duration}
      valueCurrency={widget.valueCurrency}
      title={widget.title}
      value={widget.value}
      LineGraph={widget.graph}
    />
  ))

  return (
    <AdminPageLayout>
      <div className={classes.Overview}>
        <section className={classes.Overview__headerSection}>
          <PageBreadcrumb title="Overview" items={['Overview']} />
        </section>
        <section className={classes.Overview__filters}>
          <WidgetFilter />
        </section>
        <div className={classes.Overview__widgets}>{widgets}</div>
        <div className={classes.Overview__map}>{/* <ShsDeviceMap /> */}</div>
        <div className={classes.Overview__donutChart}>
          <Donut chartData={pieChartData} title="Imperium Users by Sector" />
        </div>
        <div className={classes.Overview__areaChart}>
          <div className={classes.Overview__chartHeader}>
            <h1>Energy Generation vs Energy Consumption</h1>
            <Button className={classes.Overview__chartHeaderBtn}>
              View report
            </Button>
          </div>
          <AreaChart
            chartData={areaChartData}
            chartProps={{ height: '100%', width: '100%' }}
            optionProps={additionalOverviewProps}
          />
        </div>
        <div className={classes.Overview__shsTable}>
          <SHSTable />
        </div>
        <div className={classes.Overview__bottom}>
          <div className={classes.Overview__bottomLeft}>
            <div className={classes.Overview__bottomChart}>
              <SimpleBarChart
                title="CO2 Emission Avoided"
                chartData={chartData}
                colors={['#66AB4F']}
                borderRadius={5}
                columnWidth={50}
                optionProps={additionalOverviewBarProps}
              />
            </div>
            <div className={classes.Overview__bottomAreaChart}>
              <AreaChart
                chartData={voltageChartData}
                chartProps={{ height: '100%', width: '100%' }}
                optionProps={{
                  ...additionalOverviewProps,
                  title: { text: 'Voltage & Current Statistic ' },
                  colors: ['#385E2B', '#7F56D9'],
                }}
              />
            </div>
          </div>
          <div className={classes.Overview__alerts}>
            <h1>Active Alerts</h1>
            <div className={classes.Overview__alertList}>
              <List
                dataSource={listData}
                renderItem={(item, index) => (
                  <List.Item key={index}>
                    <List.Item.Meta
                      title={item.issue}
                      description={item.name}
                    />
                    <p style={{ color: item.status ? '#5C9D48' : '#B42318' }}>
                      {item.status ? 'Resolved' : 'Unresolved'}
                    </p>
                  </List.Item>
                )}
              />
            </div>
            <Button className={classes.Overview__alertBtn}>Show more</Button>
          </div>
        </div>
      </div>
    </AdminPageLayout>
  )
}

export default Overview
