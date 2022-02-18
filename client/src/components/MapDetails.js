import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import LocationMarker from "./LocationMarker";
import LocationInfoBox from "./LocationInfoBox";

const MapDetails = ({ hotspots, center, zoom }) => {

  const [locationInfo, setLocationInfo] = useState(null);

  const markers = hotspots && hotspots.map((hotspot) => {
    return (
      <LocationMarker
        lat={hotspot.lat}
        lng={hotspot.lng}
        onClick={() =>
          setLocationInfo({
            id: hotspot.locId,
            title: hotspot.locName,
            lat: hotspot.lat,
            lng: hotspot.lng
          })
        }
      />
    );
  });

  return (
    <div className="map">
      <h3 className="mb-3 text-info">Map Details</h3>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAi_-dX933QLaWXxZUm1DJLxiujw3oaHbM" }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {markers}
      </GoogleMapReact>
      {locationInfo && <LocationInfoBox info={locationInfo} />}
    </div>
  );
};

MapDetails.defaultProps = {
  center: {
    lat: 11.99293091826567,
    lng: 76.37999237775038,
  },
  zoom: 6,
};

export default MapDetails;
