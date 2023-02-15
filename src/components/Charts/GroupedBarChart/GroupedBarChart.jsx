import Chart from 'react-apexcharts'
import React from 'react'
import { groupedChartOptions } from '../data'

const GroupedBarChart = ({ chartData, colors, borderRadius, columnWidth }) => {
  return (
    <div>
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
        series={chartData}
      />
    </div>
  )
}

export default GroupedBarChart
