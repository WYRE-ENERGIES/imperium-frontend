import {
  GoogleMap,
  MarkerF,
  useLoadScript,
  OverlayView,
} from '@react-google-maps/api'
import React, { useMemo, useState } from 'react'
import Loading from '../Loading/Loading'
import useCurrentCoordinate from '../../hooks/useCurrentCoordinate'
import GoodIcon from '../../assets/good-marker-icon.svg'
import BadIcon from '../../assets/bad-marker-icon.svg'
import classes from './MapStyle.module.scss'

const containerStyle = {
  width: '100%',
  height: '500px',
}

const libraries = ['places']

const ShsDeviceMap = ({ isLoading, data = [] }) => {
  const [hoveredMarker, setHoveredMarker] = useState(null)
  const { location, error } = useCurrentCoordinate()
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries,
  })

  const center = useMemo(() => location, [location])
  const options = useMemo(
    () => ({
      clickableIcons: false,
      streetViewControl: false,
      mapTypeControl: false,
    }),
    [],
  )

  const onLoad = React.useCallback((map) => {}, [])

  const markers =
    data &&
    data.map((item, index) => (
      <MarkerF
        key={index}
        position={{
          lat: item?.coordinates?.lat,
          lng: item?.coordinates?.lon,
        }}
        icon={{
          url: item?.device_status === 'on' ? GoodIcon : BadIcon,
          scaledSize: new window.google.maps.Size(40, 40),
        }}
        onMouseOver={() => setHoveredMarker(item)}
        onMouseOut={() => setHoveredMarker(null)}
      />
    ))

  if (!isLoaded || !location || isLoading) return <Loading />

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
        onLoad={onLoad}
        options={options}
      >
        {markers}
        {hoveredMarker && (
          <OverlayView
            position={{
              lat: hoveredMarker?.coordinates?.lat,
              lng: hoveredMarker?.coordinates?.lon,
            }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            getPixelPositionOffset={(width, height) => ({
              x: -(width / 2),
              y: -(height + 10),
            })}
          >
            <div className={classes.MapStyle}>
              <h5>{hoveredMarker?.device_address}</h5>
              <p>
                Energy Today:{' '}
                <span
                  style={{
                    color:
                      hoveredMarker?.device_status === 'on'
                        ? '#497a38'
                        : '#bf1717',
                  }}
                >
                  {hoveredMarker?.energy_today} kWh
                </span>
              </p>
              <p>
                Battery Percentage{' '}
                <span
                  style={{
                    color:
                      hoveredMarker?.device_status === 'on'
                        ? '#497a38'
                        : '#bf1717',
                  }}
                >
                  {hoveredMarker?.battery_percent}%
                </span>
              </p>
            </div>
          </OverlayView>
        )}
      </GoogleMap>
    </div>
  )
}

export default ShsDeviceMap
