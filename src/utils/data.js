export const panelData = [
  {
    id: 1,
    key: 1,
    name: 'January, 2023',
    panelVoltage: 6.35,
    panelCurrent: 14.36,
    panelPower: 3.4,
    panelTotalEnergy: 24.0,
  },
  {
    id: 2,
    key: 2,
    name: 'December, 2022',
    panelVoltage: 9.52,
    panelCurrent: 21.52,
    panelPower: 3.4,
    panelTotalEnergy: 24.0,
  },
  {
    id: 3,
    key: 3,
    name: 'November, 2022',
    panelVoltage: 3.18,
    panelCurrent: 7.18,
    panelPower: 3.4,
    panelTotalEnergy: 24.0,
  },
  {
    id: 4,
    key: 4,
    name: 'October, 2022',
    panelVoltage: 4.67,
    panelCurrent: 9.01,
    panelPower: 3.4,
    panelTotalEnergy: 24.0,
  },
  {
    id: 5,
    key: 5,
    name: 'September, 2022',
    panelVoltage: 6.82,
    panelCurrent: 14.74,
    panelPower: 3.4,
    panelTotalEnergy: 24.0,
  },
  {
    id: 6,
    key: 6,
    name: 'August, 2022',
    panelVoltage: 3.18,
    panelCurrent: 7.18,
    panelPower: 3.4,
    panelTotalEnergy: 24.0,
  },
  {
    id: 7,
    key: 7,
    name: 'July, 2022',
    panelVoltage: 4.67,
    panelCurrent: 9.01,
    panelPower: 3.4,
    panelTotalEnergy: 24.0,
  },
  {
    id: 8,
    key: 8,
    name: 'June, 2022',
    panelVoltage: 6.82,
    panelCurrent: 14.74,
    panelPower: 3.4,
    panelTotalEnergy: 24.0,
  },
]

export const generalFilterOptions = [
  { name: 'Weekly', value: 'weekly' },
  { name: 'Monthly', value: 'monthly' },
  { name: 'Yearly', value: 'yearly' },
]

export const energyFilterOptions = [
  { name: 'Solar house System', value: 'solar' },
  { name: 'recently added', value: 'recent' },
  ...generalFilterOptions,
]
