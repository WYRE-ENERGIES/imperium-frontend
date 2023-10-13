import Chart from 'react-apexcharts'
import React from 'react'
import { getChartCategory, groupedChartOptions } from '../data'
import { chartLabelFormatter } from '../../../utils/helpers'

const GroupedBarChart = ({
  chartData,
  colors,
  borderRadius,
  columnWidth,
  height,
  axisTicks,
  borderRadiusApplication,
  themeMode,
  currentMonth,
}) => {
  return (
    <div>
      <Chart
        options={{
          ...groupedChartOptions,
          // fill: { colors },
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
          theme: {
            mode: themeMode,
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
          // yaxis: {
          //   labels: {
          //     formatter: (value) => chartLabelFormatter(value),
          //     style: {
          //       colors: 'gray',
          //     },
          //   },
          //   axisBorder: {
          //     show: true,
          //     color: 'gray',
          //   },
          //   axisTicks: axisTicks,
          // },
          yaxis: {
            labels: {
              show: false,
              // formatter: (value) => chartLabelFormatter(value),
              // style: {
              //   colors: 'gray',
              // },
            },
            // axisBorder: {
            //   show: true,
            //   color: 'gray',
            // },
            // axisTicks: axisTicks,
          },
          xaxis: {
            ...groupedChartOptions.xaxis,
            show: true,
            labels: {
              rotate: -45,
              rotateAlways: true,
              minHeight: 100,
              maxHeight: 180,
              style: {
                colors: 'gray',
              },
            },
            axisBorder: {
              color: 'gray',
            },
            axisTicks: axisTicks,
            ...(currentMonth
              ? {
                  categories: getChartCategory(
                    groupedChartOptions.xaxis.categories,
                    currentMonth,
                  ),
                }
              : {}),
          },
          grid: {
            show: false,
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
