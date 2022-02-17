import React, { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

function Hotspots() {
  const { add, coords } = useContext(SearchContext);

  console.log(add);
  console.log(coords);

  return (
    <div className="row" style={{ padding: "0 6rem" }}>
      <div className="col-5">
        <>
          <h3 className="mb-3 text-info">Location Details</h3>
          {add ? (
            <div>
              {add && <h3 className="mb-3">{add}</h3>}
              {coords && (
                <p>
                  <b>
                    <i>Lattitude </i>
                  </b>{" "}
                  {coords.lat}
                </p>
              )}
              {coords && (
                <p>
                  <b>
                    <i>Longitude </i>
                  </b>{" "}
                  {coords.lng}
                </p>
              )}
            </div>
          ) : (
            <div>
              <h5>No data available</h5>
              <h5 className="mb-3">Select a different Location</h5>
            </div>
          )}
        </>
      </div>
      <div className="col-7">
          <>
          <h3 className="mb-3 text-info">Map Details</h3>
          </>
      </div>
    </div>
  );
}

export default Hotspots;
