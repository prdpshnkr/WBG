import React, { useState, useContext } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import { SearchContext } from "../context/SearchContext";

function MapDisplay() {
  const { setAdd, setCoords } = useContext(SearchContext);

  const [address, setAddress] = useState("");
  const [coordinates, setCordinates] = useState({
    lat: null,
    lng: null,
  });

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const ll = await getLatLng(results[0]);
    console.log(results);
    console.log(ll);
    setAddress(value);
    setCordinates(ll);
    setAdd(value);
    setCoords(ll);
  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input",
              })}
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      {coordinates && (
        <div className="p-3">
          <p>
            <b>
              <i>Lattitude : </i>
            </b>{" "}
            {coordinates.lat}
          </p>
          <p>
            <b>
              <i>Longitude : </i>
            </b>{" "}
            {coordinates.lng}
          </p>
          <p>
            <b>
              <i>Address : </i>
            </b>{" "}
            {address}
          </p>
        </div>
      )}
    </div>
  );
}

export default MapDisplay;
