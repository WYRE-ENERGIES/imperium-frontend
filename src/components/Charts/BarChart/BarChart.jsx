import { Bar } from 'react-chartjs-2'
import { Charts as ChartJS } from 'chart.js/auto'
import React from 'react'
import classes from './BarChart.module.scss'

const BarChart = ({ chartData }) => {
  return (
    <div className={classes.StackedBarChart}>
      <Bar data={chartData} width="600" />
    </div>
  )
}

export default BarChart
