import Chart from 'react-apexcharts'
import React from 'react'
import { apexChartOptions } from '../data'
import classes from './StackedBarChart.module.scss'
import { chartLabelFormatter } from '../../../utils/helpers'

const FormatData = ({ value }) => {
  return
}
const StackedBarChart = ({
  title,
  chartData,
  colors,
  borderRadius,
  columnWidth,
  legendPosition,
  legendHorizontalAlign,
  yLabelTitle,
  xLabelTitle,
  showGrid,
  showGridX,
  showGridY,
  tickPlacement = 'on',
  labelColors,
  showYAxisBorder,
  yAxisTick,
}) => {
  return (
    <div className={classes.StackedBarChart}>
      <h1>{title}</h1>
      <Chart
        options={{
          ...apexChartOptions,
          fill: { colors },
          legend: {
            ...apexChartOptions.legend,
            position: legendPosition,
            horizontalAlign: legendHorizontalAlign,
            markers: {
              ...apexChartOptions.legend.markers,
              fillColors: colors,
            },
            labels: {
              ...apexChartOptions.legend.labels,
            },
          },
          plotOptions: {
            ...apexChartOptions.plotOptions,
            bar: {
              ...apexChartOptions.plotOptions.bar,
              borderRadius,
              columnWidth,
            },
          },
          grid: {
            show: showGrid,
            xaxis: {
              lines: {
                show: showGridX,
              },
            },
            yaxis: {
              lines: {
                show: showGridY,
              },
            },
          },
          xaxis: {
            ...apexChartOptions.xaxis,
            tickPlacement: tickPlacement,
            title: {
              ...apexChartOptions.xaxis.title,
              text: xLabelTitle,
            },
          },
          yaxis: {
            ...apexChartOptions.yaxis,
            axisBorder: {
              show: showYAxisBorder,
            },
            axisTicks: {
              show: yAxisTick,
            },
            title: {
              text: yLabelTitle,
            },
            labels: {
              // style: {
              //   colors: 'red',
              // },
              formatter: (value) => chartLabelFormatter(value),
            },
          },
        }}
        type="bar"
        height="100%"
        series={chartData}
        width="100%"
      />
    </div>
  )
}

export default StackedBarChart
