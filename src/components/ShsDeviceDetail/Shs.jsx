import { Tag } from 'antd'

import React from 'react'
import PageBreadcrumb from '../PageBreadcrumb/PageBreadcrumb'
import PowerSwitch from '../PowerSwitch/PowerSwitch'
import classes from './Shs.module.scss'
import Loading from '../Loading/Loading'
import Performance from './Performance'
import Panel from './Panel'

import ShsChart from './ShsChart'
import { RxCaretDown } from 'react-icons/rx'
import { getChartCategory } from '../Charts/data'
import { useState } from 'react'
import { useEffect } from 'react'

const Shs = ({
  device_id,
  client,
  performance,
  performanceLoading,
  panels,
  user,
  panelDataLoading,
  energyStatistics,
  energyStatisticsLoading,
  energyGeneration,
  energyGenerationLoading,
}) => {
  const [statisticsChartData, setStatisticsChartData] = useState([
    {
      name: 'Energy Consumed',
      data: [],
    },
    {
      name: 'Energy Generation',
      data: [],
    },
  ])
  const energyGenerationSeries = [
    {
      name: 'Kwh',
      data: energyGeneration
        ? energyGeneration.map((data, key) => Math.round(data?.daily_energy))
        : [],
    },
  ]
  useEffect(() => {
    if (energyStatisticsLoading) return
    setStatisticsChartData(energyStatistics)
  }, [energyStatistics])

  return (
    <section className={classes.Shs}>
      <section className={classes.Shs__BreadCrumb}>
        {' '}
        <div className={classes.Shs__PageBreadcrumb}>
          <PageBreadcrumb title={client} items={['Overview', '...', client]} />

          <div className={classes.Shs__PageBreadcrumbCaret}>
            <RxCaretDown size={70} />
          </div>
        </div>
        <PowerSwitch device_id={device_id} user={user} />
      </section>
      <div className={classes.Shs__GridView}>
        <section className={classes.Shs__EnergyPerfomance}>
          <div>
            {' '}
            <Performance
              performanceLoading={performanceLoading}
              performance={performance}
            />
          </div>
          <div>
            <div className={classes.Shs__EnergyChart}>
              {energyStatisticsLoading ? (
                <Loading data={'energy chart'} />
              ) : (
                <ShsChart
                  series={statisticsChartData}
                  type="area"
                  title="Energy Consumed VS Energy Generated"
                  // categories={[
                  //   'Jan',
                  //   'feb',
                  //   'Mar',
                  //   'Apr',
                  //   'May',
                  //   'Jun',
                  //   'Jul',
                  //   'Aug',
                  //   'Sep',
                  //   'Oct',
                  //   'Nov',
                  //   'Dec',
                  // ]}
                  categories={getChartCategory(
                    [
                      'Jan',
                      'Feb',
                      'Mar',
                      'Apr',
                      'May',
                      'Jun',
                      'Jul',
                      'Aug',
                      'Sept',
                      'Oct',
                      'Nov',
                      'Dec',
                    ],
                    new Date().getMonth() + 1,
                  )}
                  xLabel="Month"
                  colors={['#C9E00C', '#5C9D48']}
                  opacity={0.1}
                  dataLabels={{
                    enabled: false,
                  }}
                />
              )}
            </div>
          </div>
        </section>
        <section className={classes.Shs__EnergyStats}>
          <div>
            {' '}
            <div className={classes.Shs__Generation}>
              <div className={classes.Shs__GenerationHeader}>
                <h1>
                  Average Panel Load <span>(kWh)</span>
                </h1>
                <Tag
                  key={'1'}
                  style={{
                    borderRadius: '20px',
                    color: '#363636',
                    border: 'none',
                    fontSize: '12px',
                    fontWeight: 500,
                    lineHeight: '20px',
                  }}
                >
                  Today
                </Tag>
              </div>

              {energyGenerationLoading ? (
                <Loading data={'Average Panel generated'} />
              ) : (
                <ShsChart
                  series={energyGenerationSeries}
                  type="bar"
                  yaxis={false}
                  categories={
                    energyGeneration
                      ? energyGeneration.map((data, key) => {
                          const hour = new Date(data?.created_at__date)
                          return hour.toDateString('en-US', {
                            // hour12: true,
                            // hour: 'numeric',
                            day: 'numeric',
                          })
                        })
                      : []
                  }
                  colors="#497A38"
                  opacity={0.9}
                  dataLabels={{
                    enabled: true,
                    position: 'top',
                    style: {
                      fontSize: '14px',
                      fontWeight: 'bold',
                    },
                  }}
                  plotOptions={{
                    bar: {
                      barHeight: '7%',
                      borderRadius: 7,
                      borderRadiusApplication: 'end',
                      columnWidth: '100px',
                      dataLabels: {
                        enabled: false,
                        position: 'top',
                      },
                    },
                  }}
                />
              )}
            </div>
          </div>
          <div>
            <div className={classes.Shs__EnergyPanel}>
              <p>Panels</p>

              {panelDataLoading ? (
                <Loading data={'panel list'} />
              ) : panels ? (
                <Panel panels={panels} performance={performance} />
              ) : (
                'No data records...'
              )}
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default Shs
