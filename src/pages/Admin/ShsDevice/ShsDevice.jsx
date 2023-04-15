import React, { useState } from 'react'

import AdminPageLayout from '../../../components/Layout/AdminPageLayout/AdminPageLayout'
import { useParams } from 'react-router-dom'
import {
  useGetEnergyGenerationQuery,
  useGetEnergyStatisticsQuery,
  useGetPanelsListQuery,
  useGetShsPerformanceQuery,
} from '../../../features/slices/shs/admin/adminShsSlice'
import { useEffect } from 'react'
import Shs from '../../../components/ShsDeviceDetail/Shs'

const ShsDevice = () => {
  const { id } = useParams()
  const [panels, setPanels] = useState([
    {
      device_name: '300',
      panel_voltage: '300',
      panel_kwh: '300',
    },
    {
      device_name: '300',
      panel_voltage: '300',
      panel_kwh: '300',
    },
    {
      device_name: '300',
      panel_voltage: '300',
      panel_kwh: '300',
    },
  ])

  const [performance, setPerformance] = useState([])
  const [energyGeneration, setEnergyGeneration] = useState([])
  const [energyStatistics, setEnergyStatistics] = useState([])
  const [client, setclient] = useState('')
  const { data: energyGenerationData, isLoading: energyGenerationDataLoading } =
    useGetEnergyGenerationQuery({ id: id })

  const { data: energyStatisticsData, isLoading: energyStatisticsDataLoading } =
    useGetEnergyStatisticsQuery({ id: id })

  const { data: panelData, isLoading: panelDataLoading } =
    useGetPanelsListQuery({ id: id })

  const { data: performanceData, isLoading: performanceLoading } =
    useGetShsPerformanceQuery({ id: id })

  useEffect(() => {
    setPanels(panelData?.results)
    setEnergyGeneration(energyGenerationData)
  }, [panelData, energyGenerationData])
  useEffect(() => {
    setPerformance(performanceData)
    setEnergyStatistics(energyStatisticsData)
    setclient(performanceData?.device_details.device_name || 'Device not found')
  }, [performanceData, energyStatisticsData])

  return (
    <AdminPageLayout>
      <Shs
        id={id}
        client={client}
        user={'admin'}
        performance={performance}
        performanceLoading={performanceLoading}
        panels={panels}
        panelDataLoading={panelDataLoading}
        energyStatistics={energyStatistics}
        energyStatisticsLoading={energyStatisticsDataLoading}
        energyGeneration={energyGeneration}
        energyGenerationLoading={energyGenerationDataLoading}
      />
    </AdminPageLayout>
  )
}

export default ShsDevice
