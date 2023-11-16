import Chart from 'react-apexcharts'
import React from 'react'
import { areaChartOptions, getChartCategory, getMonthFromDate } from '../data'
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
  monthData,
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
          tooltip: {
            y: {
              formatter: function (
                value,
                { series, seriesIndex, dataPointIndex, w },
              ) {
                return value.toLocaleString()
              },
            },
          },
          xaxis: {
            ...areaChartOptions.xaxis,
            ...(currentMonth && {
              categories: currentMonth
                ? getChartCategory(
                    areaChartOptions.xaxis.categories,
                    currentMonth,
                  )
                : areaChartOptions.xaxis.categories,
            }),
            ...(monthData && {
              categories: getMonthFromDate(monthData),
            }),
            style: {
              colors: axisColor,
            },
            axisBorder: {
              color: 'gray',
            },
            labels: {
              rotate: -45,
              rotateAlways: true,
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
