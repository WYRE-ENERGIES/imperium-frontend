import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'

import { Bar } from 'react-chartjs-2'
import React from 'react'
import classes from './StackedBarChart.module.scss'
import { overviewStackedOptions } from './data'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const StackedBarChart = ({ title, chartData }) => {
  return (
    <div className={classes.StackedBarChart}>
      <h1>{title}</h1>
      <Bar data={chartData} options={overviewStackedOptions} width="600" />
    </div>
  )
}

export default StackedBarChart
