import Chart from 'react-apexcharts'
import React from 'react'
import { areaChartOptions } from '../data'
import classes from './AreaChart.module.scss'

const AreaChart = ({ chartData }) => {
  return (
    <div className={classes.AreaChart}>
      <Chart
        options={{
          ...areaChartOptions,
          theme: {
            mode: 'dark',
            monochrome: {
              enabled: true,
              color: '#497A38',
              shadeTo: 'light',
              shadeIntensity: 0.65,
            },
          },
        }}
        series={chartData}
      />
    </div>
  )
}

export default AreaChart
