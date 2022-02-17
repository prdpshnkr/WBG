import React from 'react'
import GoogleMapReact from 'google-map-react';

const MapDetails = ({center, zoom}) => {
  return (
    <div className='map'>
        <h3 className="mb-3 text-info">Map Details</h3>
        <GoogleMapReact
            bootstrapURLKeys={{key: 'AIzaSyAi_-dX933QLaWXxZUm1DJLxiujw3oaHbM'}}
            defaultCenter={center}
            defaultZoom={zoom}
        >
            
        </GoogleMapReact>
    </div>
  )
}

MapDetails.defaultProps = {
    center : {
        lat: 42.3265,
        lng: -122.8756
    },
    zoom : 6
}

export default MapDetails