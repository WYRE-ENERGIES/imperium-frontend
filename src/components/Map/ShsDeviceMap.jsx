import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import React, { useMemo } from 'react'

const containerStyle = {
  width: '100%',
  height: '500px',
}

const ShsDeviceMap = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries: ['places'],
  })

  const center = useMemo(() => ({ lat: 43, lng: -80 }), [])
  const options = useMemo(() => ({ clickableIcons: false }), [])

  const onLoad = React.useCallback((map) => {}, [])
  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        options={options}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  )
}

export default ShsDeviceMap
