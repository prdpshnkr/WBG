import React, { useContext } from "react";
import GoogleMapReact from "google-map-react";
import LocationMarker from "./LocationMarker";
import { SearchContext } from "../context/SearchContext";


const MapDetails = ({ center, zoom }) => {
  const { coords } = useContext(SearchContext);
  return (
    <div className="map">
      <h3 className="mb-3 text-info">Map Details</h3>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAi_-dX933QLaWXxZUm1DJLxiujw3oaHbM" }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <LocationMarker lat={center.lat} lng={center.lng} />
      </GoogleMapReact>
    </div>
  );
};

MapDetails.defaultProps = {
  center: {
    lat: 11.99293091826567,
    lng: 76.37999237775038,
  },
  zoom: 10,
};

export default MapDetails;
