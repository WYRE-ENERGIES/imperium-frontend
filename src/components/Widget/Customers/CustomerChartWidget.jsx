import React from 'react'
import SimpleBarChart from '../../Charts/SimpleBarChart/SimpleBarChart'
import { Spin } from 'antd'
import { additionalCustomerProps } from '../../Charts/data'
import classes from './CustomersWidget.module.scss'

const CustomerChartWidget = ({
  chartData,
  colors,
  borderRadius,
  columnWidth,
  loading,
  height,
  width,
  strokeWidth,
  showGridY,
  showGrid,
  showYAxis,
  currentMonth,
}) => {
  return (
    <div className={classes.CustomerChartWidget}>
      {loading ? (
        <div
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spin />
        </div>
      ) : (
        <SimpleBarChart
          title="Customers Statistic"
          chartData={chartData}
          colors={colors}
          borderRadius={borderRadius}
          columnWidth={columnWidth}
          optionProps={additionalCustomerProps}
          height={height}
          width={width}
          strokeWidth={strokeWidth}
          showGridY={showGridY}
          showGrid={showGrid}
          showYAxis={showYAxis}
          currentMonth={currentMonth}
        />
      )}
    </div>
  )
}

export default CustomerChartWidget
