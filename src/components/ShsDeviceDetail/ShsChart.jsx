import React from 'react'
import Chart from 'react-apexcharts'
const ShsChart = ({
  series,
  type,
  title,
  yaxis = true,
  categories,
  xLabel,
  colors,
  dataLabels,
  opacity,
  plotOptions,
}) => {
  return (
    <Chart
      height="100%"
      options={{
        title: {
          text: title,
          align: 'left',
          margin: 10,
          offsetX: 10,
          offsetY: 20,
          floating: false,
          style: {
            fontSize: '18px',
            fontWeight: '500',
            fontFamily: undefined,
            color: '#263238',
          },
        },
        legend: {
          fontSize: '14px',
          position: 'top',
          horizontalAlign: 'right',
        },
        fill: {
          opacity: opacity,
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.45,
            opacityTo: 0.05,
            stops: [20, 100, 100, 100],
          },
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
        plotOptions: { ...plotOptions },
        chart: {
          id: 'energy-bar',
          fontFamily: 'baloo 2',
          stacked: true,
          toolbar: {
            show: false,
          },
          type: 'area',
        },
        stroke: {
          curve: 'smooth',
        },
        colors: colors,
        xaxis: {
          categories: categories,
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
          labels: {
            rotate: -45,
          },
        },
        yaxis: {
          show: yaxis,
          title: {
            text: 'kWh',
            offsetX: 0,
            offsetY: 0,
            style: {
              color: '#737373',
              fontSize: '12px',
              fontFamily: 'Baloo 2',
              fontWeight: 600,
            },
          },
        },
        dataLabels: { ...dataLabels },
      }}
      type={type}
      series={series}
      width="100%"
    />
  )
}

export default ShsChart
