import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api'
import React, { useMemo } from 'react'
import Loading from '../Loading/Loading'
import useCurrentCoordinate from '../../hooks/useCurrentCoordinate'

const containerStyle = {
  width: '100%',
  height: '500px',
}

const ShsDeviceMap = () => {
  const { location, error } = useCurrentCoordinate()
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries: ['places'],
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

  if (!isLoaded) return <Loading />

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        options={options}
      >
        <MarkerF position={center} />
      </GoogleMap>
    </div>
  )
}

export default ShsDeviceMap
