import Chart from 'react-apexcharts'
import React from 'react'
import { groupedChartOptions } from '../data'
import { chartLabelFormatter } from '../../../utils/helpers'

const GroupedBarChart = ({
  chartData,
  colors,
  borderRadius,
  columnWidth,
  height,
  axisTicks,
  borderRadiusApplication,
}) => {
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
            labels: {
              colors: 'gray',
            },
          },
          plotOptions: {
            ...groupedChartOptions.plotOptions,
            bar: {
              ...groupedChartOptions.plotOptions.bar,
              borderRadius,
              columnWidth,
              borderRadiusApplication: borderRadiusApplication,

              rangeBarOverlap: true,
              rangeBarGroupRows: true,
            },
          },
          yaxis: {
            labels: {
              formatter: (value) => chartLabelFormatter(value),
              style: {
                colors: 'gray',
              },
            },
            axisBorder: {
              show: true,
              color: 'gray',
            },
            axisTicks: axisTicks,
          },
          xaxis: {
            ...groupedChartOptions.xaxis,
            labels: {
              style: {
                colors: 'gray',
                fontSize: '9px',
              },
              rotate: 0,
            },
            axisBorder: {
              show: true,
              color: 'gray',
            },
            axisTicks: axisTicks,
          },
          grid: {
            show: true,
            xaxis: {
              lines: {
                show: false,
              },
            },
            yaxis: {
              lines: {
                show: false,
              },
            },
          },
        }}
        type="bar"
        series={chartData}
        height={height}
      />
    </div>
  )
}

export default GroupedBarChart
