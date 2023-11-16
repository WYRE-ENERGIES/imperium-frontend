import Chart from 'react-apexcharts'
import React from 'react'
import { barChartOptions, getChartCategory } from '../data'
import { chartLabelFormatter } from '../../../utils/helpers'

const SimpleBarChart = ({
  title,
  chartData,
  colors,
  borderRadius,
  columnWidth,
  optionProps,
  xLabel,
  height,
  width,
  strokeWidth,
  showGridY,
  showGrid,
  showYAxis,
  currentMonth,
}) => {
  return (
    <Chart
      options={{
        ...barChartOptions,
        fill: { colors },
        plotOptions: {
          ...barChartOptions.plotOptions,
          bar: {
            ...barChartOptions.plotOptions.bar,
            // borderRadius,
            // columnWidth,
          },
        },
        title: {
          text: title,
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
        yaxis: {
          // labels: {
          //   formatter: (value) => chartLabelFormatter(value),
          // },
        },
        // xaxis: {
        //   labels: {
        //     show: true,
        //     rotate: -45,
        //     rotateAlways: false,
        //     hideOverlappingLabels: true,
        //     showDuplicates: false,
        //     trim: false,
        //     minHeight: undefined,
        //     maxHeight: 120,
        //     style: {
        //       colors: [],
        //       fontSize: '4px',
        //       fontFamily: 'Helvetica, Arial, sans-serif',
        //       fontWeight: 400,
        //       cssClass: 'apexcharts-xaxis-label',
        //     },
        //     offsetX: 0,
        //     offsetY: 0,
        //     format: undefined,
        //     formatter: undefined,
        //     datetimeUTC: true,
        //     datetimeFormatter: {
        //       year: 'yyyy',
        //       month: "MMM 'yy",
        //       day: 'dd MMM',
        //       hour: 'HH:mm',
        //     },
        //   },
        // },
        xaxis: {
          ...barChartOptions.xaxis,
          ...(currentMonth && {
            categories: getChartCategory(
              barChartOptions.xaxis.categories,
              currentMonth,
            ),
          }),
          labels: {
            // rotate: 90,
            minHeight: undefined,
            maxHeight: 120,
          },
          title: {
            text: xLabel,
            offsetX: 0,
            offsetY: 130,
            style: {
              color: '#737373',
              fontSize: '12px',
              fontFamily: 'Baloo 2',
              fontWeight: 600,
            },
          },
        },

        ...optionProps,
      }}
      type="bar"
      height="100%"
      series={chartData}
      width="100%"
    />
  )
}

export default SimpleBarChart
