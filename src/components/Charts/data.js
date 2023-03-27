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
    fontFamily: 'baloo 2',
    toolbar: {
      show: false,
    },
  },
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    categories: [
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
    axisTicks: {
      show: false,
    },
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

export const barChartOptions = {
  chart: {
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
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      borderRadiusApplication: 'around',
    },
  },
  dataLabels: {
    enabled: false,
  },
}

export const adminPieChartOptions = {
  dataLabels: {
    enabled: false,
  },
  colors: ['#99C78A', '#FF9C66', '#67E3F9', '#A4BCFD', '#7375FD', '#D5D9EB'],
  plotOptions: {
    pie: {
      startAngle: 0,
      endAngle: 360,
      expandOnClick: true,
      donut: {
        size: '80%',
        background: 'transparent',
        labels: {
          show: true,
          name: {
            show: true,
          },
          value: {
            show: true,
          },
          total: {
            show: true,
            showAlways: true,
            label: 'Total',
            fontSize: '1em',
            fontFamily: 'baloo 2',
            fontWeight: 600,
            color: '#28293D',
            formatter: function (w) {
              return w.globals.seriesTotals.reduce((a, b) => {
                return a + b
              }, 0)
            },
          },
        },
      },
    },
  },
  legend: {
    formatter: function (seriesName, opts) {
      return [seriesName, ' - ', opts.w.globals.series[opts.seriesIndex]]
    },
  },
}

export const additionalOverviewProps = {
  legend: {
    position: 'top',
    horizontalAlign: 'right',
  },
  yaxis: { labels: { show: false } },
  colors: ['#385E2B', '#C9E00C'],
}

export const additionalCustomerProps = {
  grid: {
    show: false,
  },
}

export const additionalOverviewBarProps = {
  ...barChartOptions,
  xaxis: {
    ...barChartOptions.xaxis,
    title: {
      text: 'Month',
      offsetY: 90,
    },
  },
  yaxis: {
    title: {
      text: 'CO2 (Kg)',
    },
  },
}
