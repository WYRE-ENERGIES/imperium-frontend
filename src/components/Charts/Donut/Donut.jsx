import Chart from 'react-apexcharts'
import Loading from '../../Loading/Loading'
import React from 'react'
import { adminPieChartOptions } from '../data'
import classes from './Donut.module.scss'

const Donut = ({ title, chartData, labels, loading }) => {
  return (
    <div className={classes.Donut}>
      <h1>{title}</h1>
      {loading ? (
        <Loading />
      ) : (
        <Chart
          options={{ ...adminPieChartOptions, labels }}
          type="donut"
          height="100%"
          series={chartData}
          width="100%"
        />
      )}
    </div>
  )
}

export default Donut
