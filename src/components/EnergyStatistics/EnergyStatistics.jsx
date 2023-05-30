import AreaChart from '../Charts/AreaChart/AreaChart'
import { ArrowUpOutlined } from '@ant-design/icons'
import GroupedBarChart from '../Charts/GroupedBarChart/GroupedBarChart'
import React from 'react'
import classes from './EnergyStatistics.module.scss'

const ChartCard = ({ title, subTitle, children }) => {
  return (
    <div className={classes.EnergyStatistics__card}>
      <h1>{title}</h1>
      <h3>
        <ArrowUpOutlined style={{ color: '#66AB4F', marginRight: '7px' }} />
        {subTitle}
      </h3>
      {children}
    </div>
  )
}

const EnergyStatistics = ({ duration, chartData, areaChartData }) => {
  return (
    <div className={classes.EnergyStatistics}>
      <ChartCard title="Energy Statistics(kWh)" subTitle={duration}>
        <GroupedBarChart
          chartData={chartData}
          colors={['#CEE5C8', '#497A38']}
          borderRadius={3}
          columnWidth={55}
          height="350px"
          borderRadiusApplication="around"
          axisTicks={false}
        />
      </ChartCard>

      <ChartCard title="Energy Difference(kWh)" subTitle={duration}>
        <AreaChart
          chartData={areaChartData}
          height="250px"
          showGrid={true}
          showGridX={false}
          showGridY={false}
          axisColor={'gray'}
          axisTicks={false}
          colors={['#65AA4F']}
        />
      </ChartCard>
    </div>
  )
}

export default EnergyStatistics
