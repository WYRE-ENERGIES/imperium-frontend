import { TbActivityHeartbeat, TbBolt, TbBoltOff } from 'react-icons/tb'

import { ReactComponent as EnergyWidgetIcon } from '../assets/widget-icons/energy-icon.svg'
import { ReactComponent as HomeWidgetIcon } from '../assets/widget-icons/home-icon.svg'
import { RiseOutlined } from '@ant-design/icons'
import { ReactComponent as SEnergyWidgetIcon } from '../assets/widget-icons/cancel-energy-con.svg'

export const generalFilterOptions = [
  { name: 'Yearly', value: 'yearly' },
  { name: 'Monthly', value: 'monthly' },
  { name: 'Weekly', value: 'weekly' },
]

export const energyFilterOptions = [
  { name: 'Solar house System', value: 'solar' },
  { name: 'recently added', value: 'recent' },
  ...generalFilterOptions,
]

export const energyAnalyticColumns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: (value) => new Date(value).toDateString(),
  },
  {
    title: 'Energy Consumed (kWh)',
    key: 'energy_consumed',
    dataIndex: 'energy_consumed',
    render: (value) =>
      `${value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
  },
  {
    title: 'Energy Generated (kWh)',
    key: 'energy_generated',
    dataIndex: 'energy_generated',
    render: (value) =>
      `${value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
  },
]

export const batteryWidgetsData = [
  {
    id: 1,
    icon: EnergyWidgetIcon,
    title: 'Battery Status',
    range: 'For the year',
    value: 'Good',
    valuePercentage: 99,
  },
  {
    id: 2,
    icon: SEnergyWidgetIcon,
    title: 'Battery Voltage',
    range: 'For the year',
    value: '111.12',
    valueCurrency: 'V',
  },
  {
    id: 3,
    icon: HomeWidgetIcon,
    title: 'Battery Current',
    range: 'For the year',
    value: '50.82',
    valueCurrency: 'A',
  },
]

export const batteryTableData = [
  {
    id: 1,
    key: 1,
    created_at: 'January, 2023',
    battery_voltage: 6.35,
    battery_current: 14.36,
    battery_health: true,
    source: 'Utility',
  },
  {
    id: 2,
    key: 2,
    created_at: 'December, 2022',
    battery_voltage: 9.52,
    battery_current: 21.52,
    battery_health: true,
    source: 'Utility',
  },
  {
    id: 3,
    key: 3,
    created_at: 'November, 2022',
    battery_voltage: 3.18,
    battery_current: 7.18,
    battery_health: true,
    source: 'Solar',
  },
  {
    id: 4,
    key: 4,
    created_at: 'October, 2022',
    battery_voltage: 4.67,
    battery_current: 9.01,
    battery_health: false,
    source: 'Solar',
  },
  {
    id: 5,
    key: 5,
    created_at: 'September, 2022',
    battery_voltage: 6.82,
    battery_current: 14.74,
    battery_health: true,
    source: 'Utility',
  },
  {
    id: 6,
    key: 6,
    created_at: 'August, 2022',
    battery_voltage: 3.18,
    battery_current: 7.18,
    battery_health: true,
    source: 'Utility',
  },
  {
    id: 7,
    key: 7,
    created_at: 'July, 2022',
    battery_voltage: 4.67,
    battery_current: 9.01,
    battery_health: false,
    source: 'Solar',
  },
  {
    id: 8,
    key: 8,
    created_at: 'June, 2022',
    battery_voltage: 6.82,
    battery_current: 14.74,
    battery_health: true,
    source: 'Utility',
  },
]

export const panelColumns = [
  // {
  //   title: 'Date',
  //   dataIndex: 'date',
  //   key: 'date',
  //   render: (val) => (val ? new Date(val).toLocaleDateString() : ''),
  // },
  {
    title: 'Device Name',
    dataIndex: 'device_name',
    key: 'device_name',
  },
  {
    title: 'Panel Voltage (V)',
    key: 'total_panel_voltage',
    dataIndex: 'total_panel_voltage',
    render: (value) =>
      `${value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
  },
  {
    title: 'Panel Current (A)',
    key: 'total_panel_current',
    dataIndex: 'total_panel_current',
    render: (value) =>
      `${value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
  },
  {
    title: 'Panel Power (kW)',
    key: 'total_panel_power',
    dataIndex: 'total_panel_power',
    render: (value) =>
      `${value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
  },
  {
    title: 'Panel Total Energy (kWh)',
    key: 'total_panel_energy',
    dataIndex: 'total_panel_energy',
    render: (value) =>
      `${value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
  },
]

export const adminEnergyAnalyticColumns = [
  {
    title: (
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        Solar House System(SHS)
        <TbBolt style={{ marginLeft: '5px', color: '#497A38' }} size={18} />
      </span>
    ),
    dataIndex: 'shs_name',
    key: 'shs_name',
  },
  {
    title: (
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        Energy Consumed (kWh)
        <TbBoltOff style={{ marginLeft: '5px', color: '#497A38' }} size={18} />
      </span>
    ),
    key: 'energy_consumed',
    dataIndex: 'energy_consumed',
    render: (value) =>
      `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
  },
  {
    title: (
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        Energy Generated (kWh)
        <TbActivityHeartbeat
          style={{ marginLeft: '5px', color: '#497A38' }}
          size={18}
        />
      </span>
    ),
    key: 'energy_generated',
    dataIndex: 'energy_generated',
    render: (value) =>
      `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
  },
  {
    title: (
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        Energy Difference (kWh)
        <RiseOutlined
          style={{ marginLeft: '5px', color: '#497A38' }}
          size={18}
        />
      </span>
    ),
    key: 'shs_capacity',
    dataIndex: 'shs_capacity',
    render: (value) =>
      `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
  },
]
