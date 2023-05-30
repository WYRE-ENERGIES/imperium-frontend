import React, { useState, useEffect } from 'react'
import classes from './ActiveAlertsChart.module.scss'
import { Select, Space } from 'antd'
import Chart from 'react-apexcharts'
import { MdFilterList } from 'react-icons/md'
import { useGetAdminActiveAlertsStatisticsQuery } from '../../../../features/slices/activeAlerts/admin/adminActiveAlertSlice'
import { DataStatistics } from '../../../../utils/helpers'
import Loading from '../../../../components/Loading/Loading'

const ActiveAlertsCharts = () => {
  const [statsFilter, setStatsFilter] = useState('weekly')
  const { data: statistics, isLoading: isLoadingStatistics } =
    useGetAdminActiveAlertsStatisticsQuery({ filter: statsFilter })
  console.log(statsFilter)
  return (
    <section className={classes.ActiveAlertsCharts}>
      <div className={classes.ActiveAlertsCharts__ActiveAlertStats}>
        <div className={classes.ActiveAlertsCharts__ActiveAlertStatsHeader}>
          <div>
            <h1>Active Alert Statistic</h1>
            <p>Updated 1min ago</p>
          </div>
          <div className={classes.ActiveAlertsCharts__ActiveAlertStatsFilter}>
            <Space
              className={
                classes.ActiveAlertsCharts__ActiveAlertStatsFilterInput
              }
            >
              <div
                className={
                  classes.ActiveAlertsCharts__ActiveAlertStatsFormSelectPrefix
                }
              >
                <MdFilterList size={20} />
              </div>
              <Select
                className={
                  classes.ActiveAlertsCharts__ActiveAlertStatsFormSelect
                }
                defaultValue="Last 12 Months"
                style={{
                  width: 150,
                  border: 'none',
                  color: 'white',
                }}
                options={[
                  {
                    value: 'yearly',
                    label: 'Last 12 months',
                    style: {
                      color: '#497A38',
                    },
                  },
                  {
                    value: 'weekly',
                    label: 'Last 7 days',
                    style: {
                      color: '#497A38',
                    },
                  },
                  {
                    value: 'monthly',
                    label: 'Last 30 days',
                    style: {
                      color: '#497A38',
                    },
                  },
                ]}
                dropdownStyle={{ background: 'white' }}
                showArrow={false}
                onChange={(value) => setStatsFilter(value)}
              />
            </Space>
          </div>
        </div>
        <div className={classes.ActiveAlertsCharts__ActiveAlertStatsGraph}>
          {isLoadingStatistics ? (
            <Loading data={'graph...'} />
          ) : (
            <Chart
              series={[
                {
                  name: 'Unresolved alert',
                  data: DataStatistics(statistics, 'unresolved'),
                },
                {
                  name: 'Resolved alert',
                  data: DataStatistics(statistics, 'resolved'),
                },
              ]}
              options={{
                chart: {
                  type: 'bar',
                  height: 8,
                  stacked: true,
                  fontFamily: 'baloo 2',
                  toolbar: {
                    show: false,
                  },
                },
                yaxis: {
                  show: true,
                  showAlways: true,
                  axisBorder: {
                    show: true,
                  },
                },
                dataLabels: {
                  enabled: false,
                },
                grid: {
                  show: true,
                  padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                  },
                  position: 'back',
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
                xaxis: {
                  show: true,
                  categories: [
                    'Jan',
                    'feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                  ],
                },

                legend: {
                  position: 'bottom',
                  offsetY: 0,
                  markers: {
                    radius: 10,
                    width: 8,
                    height: 8,
                  },
                },
                plotOptions: {
                  bar: {
                    borderRadius: 3,
                    borderRadiusApplication: 'around',
                    columnWidth: 10,
                    dataLabels: {
                      hideOverflowingLabels: false,
                    },
                  },
                },
                colors: ['#F04438', '#C4C4C4'],
              }}
              type="bar"
              height="350px"
              width="100%"
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default ActiveAlertsCharts
