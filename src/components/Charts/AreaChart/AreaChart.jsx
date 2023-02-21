import Chart from 'react-apexcharts'
import React from 'react'
import { areaChartOptions } from '../data'

const AreaChart = ({
  chartData,
  themeMode = 'light',
  chartProps,
  optionProps,
}) => {
  return (
    <div style={{ height: '100%' }}>
      <Chart
        options={{
          ...areaChartOptions,
          theme: {
            mode: themeMode,
          },
          ...optionProps,
        }}
        series={chartData}
        {...chartProps}
      />
    </div>
  )
}

export default AreaChart
