import Chart from 'react-apexcharts'
import React from 'react'
import classes from './GroupedBarChart.module.scss'
import { groupedChartOptions } from '../data'

const GroupedBarChart = ({ chartData, colors, borderRadius, columnWidth }) => {
  return (
    <div className={classes.GroupedBarChart}>
      <Chart
        options={{
          ...groupedChartOptions,
          fill: { colors },
          legend: {
            ...groupedChartOptions.legend,
            markers: {
              ...groupedChartOptions.legend.markers,
              fillColors: colors,
            },
          },
          plotOptions: {
            ...groupedChartOptions.plotOptions,
            bar: {
              ...groupedChartOptions.plotOptions.bar,
              borderRadius,
              columnWidth,
            },
          },
        }}
        type="bar"
        // height="90%"
        series={chartData}
        // width="100%"
      />
    </div>
  )
}

export default GroupedBarChart
