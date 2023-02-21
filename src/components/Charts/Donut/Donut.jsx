import Chart from 'react-apexcharts'
import React from 'react'
import { adminPieChartOptions } from '../data'
import classes from './Donut.module.scss'

const Donut = ({ title, chartData }) => {
  return (
    <div className={classes.Donut}>
      <h1>{title}</h1>
      <Chart
        options={{ ...adminPieChartOptions }}
        type="donut"
        height="100%"
        series={chartData}
        width="100%"
      />
    </div>
  )
}

export default Donut
