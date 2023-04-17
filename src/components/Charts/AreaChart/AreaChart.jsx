import Chart from 'react-apexcharts'
import React from 'react'
import { areaChartOptions } from '../data'
import { chartLabelFormatter } from '../../../utils/helpers'

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
          yaxis: {
            labels: {
              formatter: (value) => chartLabelFormatter(value),
            },
          },
        }}
        series={chartData}
        {...chartProps}
      />
    </div>
  )
}

export default AreaChart
