export const apexChartOptions = {
  chart: {
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  legend: {
    markers: {
      radius: 10,
    },
  },
  xaxis: {
    categories: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    title: {
      // text: 'Month',
      offsetY: 90,
    },
  },
  yaxis: {},
  plotOptions: {
    bar: {
      borderRadiusWhenStacked: 'last',
      borderRadiusApplication: 'end',
    },
  },
  dataLabels: {
    enabled: false,
  },
}

export const groupedChartOptions = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    markers: {
      radius: 10,
    },
  },
  xaxis: {
    categories: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  },
  plotOptions: {
    bar: {
      borderRadiusApplication: 'around',
    },
  },
  dataLabels: {
    enabled: false,
  },
  theme: {
    mode: 'dark',
  },
}

export const areaChartOptions = {
  chart: {
    height: 500,
    type: 'area',
    toolbar: {
      show: false,
    },
  },
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    categories: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  },
  dataLabels: {
    enabled: false,
  },
}

export const stackBarData = [
  {
    id: 1,
    energyGenerated: '400',
    energyConsumed: '400',
    month: 'January',
  },
  {
    id: 2,
    energyGenerated: '500',
    energyConsumed: '500',
    month: 'February',
  },
  {
    id: 3,
    energyGenerated: '230',
    energyConsumed: '350',
    month: 'March',
  },
  {
    id: 4,
    energyGenerated: '430',
    energyConsumed: '420',
    month: 'April',
  },
  {
    id: 5,
    energyGenerated: '260',
    energyConsumed: '320',
    month: 'May',
  },
  {
    id: 6,
    energyGenerated: '430',
    energyConsumed: '500',
    month: 'June',
  },
  {
    id: 7,
    energyGenerated: '390',
    energyConsumed: '410',
    month: 'July',
  },
  {
    id: 8,
    energyGenerated: '380',
    energyConsumed: '430',
    month: 'August',
  },
  {
    id: 9,
    energyGenerated: '390',
    energyConsumed: '410',
    month: 'September',
  },
  {
    id: 10,
    energyGenerated: '330',
    energyConsumed: '500',
    month: 'October',
  },
  {
    id: 11,
    energyGenerated: '430',
    energyConsumed: '570',
    month: 'November',
  },
  {
    id: 12,
    energyGenerated: '310',
    energyConsumed: '400',
    month: 'December',
  },
]
