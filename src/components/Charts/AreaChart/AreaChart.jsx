import Chart from 'react-apexcharts'
import React from 'react'
import { areaChartOptions, getChartCategory } from '../data'
import { chartLabelFormatter } from '../../../utils/helpers'

const AreaChart = ({
  chartData,
  themeMode,
  chartProps,
  optionProps,
  showGrid,
  showGridX,
  colors,
  showGridY,
  axisColor,
  axisTicks,
  height,
  width,
  showYAxis,
  strokeWidth = 1,
  currentMonth,
}) => {
  return (
    <div style={{ height: '100%' }}>
      <Chart
        options={{
          ...areaChartOptions,
          fill: {
            opacity: 1,
            gradient: {
              enabled: true,
              opacityFrom: 0.55,
              opacityTo: 0,
            },
          },
          colors: colors,
          stroke: {
            ...areaChartOptions.stroke,
            width: strokeWidth,
          },
          theme: {
            mode: themeMode,
          },
          ...optionProps,
          yaxis: {
            show: showYAxis,
            labels: {
              formatter: (value) => chartLabelFormatter(value),
              style: {
                colors: 'gray',
              },
            },
            style: {
              colors: axisColor,
            },
            axisBorder: {
              show: true,
              color: 'gray',
            },
            axisTicks: axisTicks,
          },
          xaxis: {
            ...areaChartOptions.xaxis,
            ...(currentMonth && {
              categories: getChartCategory(
                areaChartOptions.xaxis.categories,
                currentMonth,
              ),
            }),
            style: {
              colors: axisColor,
            },
            axisBorder: {
              color: 'gray',
            },
            labels: {
              style: {
                colors: 'gray',
              },
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
        }}
        series={chartData}
        {...chartProps}
        height={height}
        type="area"
        width={width}
      />
    </div>
  )
}

export default AreaChart
