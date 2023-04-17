import {
  BsCircle,
  BsCloudDrizzle,
  BsCloudHaze,
  BsCloudLightningRain,
  BsCloudMoon,
  BsCloudRainHeavy,
  BsCloudSun,
  BsClouds,
  BsCloudsFill,
  BsCloudy,
  BsSnow3,
  BsSun,
} from 'react-icons/bs'
import { Col, Row, Spin } from 'antd'

import { ReactComponent as BentArrowWidgetIcon } from '../../../assets/widget-icons/bent-arrow.svg'
import { ReactComponent as EnergyWidgetIcon } from '../../../assets/widget-icons/energy-icon.svg'
import Loading from '../../Loading/Loading'
import { MdOutlineLocationOn } from 'react-icons/md'
import React from 'react'
import { ReactComponent as SEnergyWidgetIcon } from '../../../assets/widget-icons/cancel-energy-con.svg'
import { ReactComponent as SunWidgetIcon } from '../../../assets/widget-icons/sun.svg'
import Widget from '../Widget/Widget'
import classes from './panel.module.scss'
import { formatLabel } from '../../../utils/helpers'

const weatherIcon = {
  'clear sky': <BsSun size={25} color="#5C9D48" />,
  'night clear sky': <BsCircle size={25} color="#5C9D48" />,
  'few clouds': <BsCloudSun size={25} color="#5C9D48" />,
  'night few clouds': <BsCloudMoon size={25} color="#5C9D48" />,
  'scattered clouds': <BsCloudy size={25} color="#5C9D48" />,
  'broken clouds': <BsClouds size={25} color="#5C9D48" />,
  'shower rain': <BsCloudDrizzle size={25} color="#5C9D48" />,
  'night others': <BsCloudsFill size={25} color="#5C9D48" />,
  rain: <BsCloudRainHeavy size={25} color="#5C9D48" />,
  thunderstorm: <BsCloudLightningRain size={25} color="#5C9D48" />,
  snow: <BsSnow3 size={25} color="#5C9D48" />,
  mist: <BsCloudHaze size={25} color="#5C9D48" />,
  others: <BsClouds size={25} color="#5C9D48" />,
}

const WeatherForecast = ({ temperature, time, description, season }) => {
  return (
    <div className={classes.WeatherForecast}>
      <h3 className={classes.WeatherForecast__time}>{time}</h3>
      {weatherIcon[description] ||
        weatherIcon[season === 'n' ? 'night others' : 'others']}
      <h3 className={classes.WeatherForecast__temperature}>
        {temperature} <span>&#8451;</span>
      </h3>
    </div>
  )
}

const PanelWidgets = ({
  data,
  isLoading,
  weatherLoading,
  result,
  weatherError,
  globalFilter,
}) => {
  let widgets = []
  if (!isLoading && data) {
    widgets = [
      {
        id: 1,
        icon: EnergyWidgetIcon,
        title: 'Panel Total Energy',
        value: data?.panel_total_energy
          ? parseFloat(data?.panel_total_energy?.toFixed(1)).toLocaleString()
          : 0,
        valueCurrency: 'WH',
      },
      {
        id: 2,
        icon: BentArrowWidgetIcon,
        title: 'Panel Voltage',
        value: data?.panel_voltage
          ? parseFloat(data?.panel_voltage?.toFixed(1)).toLocaleString()
          : 0,
        valueCurrency: 'V',
      },
      {
        id: 1,
        icon: SEnergyWidgetIcon,
        title: 'Panel Total Power',
        value: data?.panel_total_power
          ? parseFloat(data?.panel_total_power?.toFixed(1)).toLocaleString()
          : 0,
        valueCurrency: 'W',
      },
      {
        id: 1,
        icon: SunWidgetIcon,
        title: 'Panel Current',
        value: data?.panel_current
          ? parseFloat(data?.panel_current?.toFixed(1)).toLocaleString()
          : 0,
        valueCurrency: 'A',
      },
    ].map((data, index) => (
      <Widget
        key={index}
        title={data.title}
        Icon={data.icon}
        value={data.value}
        range={formatLabel(globalFilter)}
        valueCurrency={data.valueCurrency}
        style={{ height: '100%' }}
      />
    ))
  }

  let weatherForecast = []
  if (!weatherLoading && result?.weatherReport?.length) {
    weatherForecast = result.weatherReport.map((result, index) => (
      <WeatherForecast
        time={result.time}
        temperature={Math.ceil(result.temp)}
        description={
          result.season === 'n'
            ? `night ${result.description}`
            : result.description
        }
        key={index}
        season={result.season}
      />
    ))
  }

  return (
    <div className={classes.Panel}>
      {/* <Row
        justify={'space-between'}
        gutter={[2, 16]}
        className={classes.Panel__widgets}
      > */}
      {isLoading ? (
        <Spin />
      ) : (
        // <>
        //   <Col lg={14} md={14} sm={14} xs={24}>
        //     {widgets[0]}
        //   </Col>
        //   <Col lg={10} md={10} sm={10} xs={24}>
        //     {widgets[1]}
        //   </Col>
        //   <Col lg={14} md={14} sm={14} xs={24}>
        //     {widgets[2]}
        //   </Col>
        //   <Col lg={10} md={10} sm={10} xs={24}>
        //     {widgets[3]}
        //   </Col>
        // </>
        <div className={classes.Panel__gridContainer}>
          <div className={classes.Panel__gridItem}>{widgets[0]}</div>
          <div className={classes.Panel__gridItem}>{widgets[1]}</div>
          <div className={classes.Panel__gridItem}>{widgets[2]}</div>
          <div className={classes.Panel__gridItem}>{widgets[3]}</div>
        </div>
      )}
      {/* </Row> */}
      <div className={classes.Panel__weather}>
        <div className={classes.Panel__weatherDetails}>
          <div>
            Today’s weather forecast{' '}
            <div>
              <span>
                {!weatherLoading && Math.ceil(result?.weatherReport[0].temp)}{' '}
                &#8451;
              </span>
              <span>
                <MdOutlineLocationOn size={14} color="#5C9D48" />
                {!weatherLoading && result?.city}{' '}
              </span>
            </div>
          </div>
          <div>
            CO2 avoided{' '}
            <span>{parseFloat(data?.weather_stats?.co2?.toFixed(1)) || 0}</span>
          </div>
          <div>
            Total Panel <span>{data?.weather_stats?.total_panel || 0}</span>
          </div>
        </div>
        {weatherLoading ? (
          <Loading />
        ) : weatherError ? (
          <h3
            style={{
              fontSize: 18,
              color: '#66ab4f',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 50,
            }}
          >
            Failed to fetch weather report
          </h3>
        ) : result?.weatherReport.length ? (
          <div className={classes.Panel__weatherForecast}>
            <section>{weatherForecast}</section>
            <div></div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default PanelWidgets
