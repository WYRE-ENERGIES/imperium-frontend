import Chart from 'react-apexcharts'
import React from 'react'
import { areaChartOptions } from '../data'

const AreaChart = ({ chartData }) => {
  return (
    <div>
      <Chart
        options={{
          ...areaChartOptions,
          theme: {
            mode: 'dark',
            monochrome: {
              enabled: true,
              color: '#497A38',
              shadeTo: 'light',
              shadeIntensity: 0.65,
            },
          },
        }}
        series={chartData}
      />
    </div>
  )
}

export default AreaChart
