import React from "react";

const LocationInfoBox = ({ info }) => {
  return (
    <div className="location-info">
      <h3>Location Info</h3>
      <ul>
        <li>
          ID: <strong>{info.id}</strong>
        </li>
        <li>
          TITLE: <strong>{info.title}</strong>
        </li>
        <li>
          LAT: <strong>{info.lat}</strong>
        </li>
        <li>
          LNG: <strong>{info.lng}</strong>
        </li>
      </ul>
    </div>
  );
};

export default LocationInfoBox;
