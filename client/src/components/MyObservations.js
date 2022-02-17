import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyObservations() {
  const [data, setData] = useState([]);
  const [birdDetails, setBirdDetails] = useState([]);

  const getBirdDetails = (data) => {
    axios
      .get(
        `https://api.ebird.org/v2/ref/taxonomy/ebird?species=${data}&version=2019`,
        {
          params: {
            fmt: "json",
          },
        }
      )
      .then((res) => {
        setBirdDetails(res.data[0]);
        console.log(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editBirdDetails = (data) => {
    axios
      .delete(`http://localhost:3004/users/${data}`)
      .then((result) => {
        console.log(result.data);
        setData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteBirdDetails = (data) => {
    const deleteNotify = () => toast("Record Successfully Deleted!");

    axios
      .delete(`http://localhost:3004/users/${data}`)
      .then((result) => {
        addObsData();
        deleteNotify();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addObsData = () => {
    axios
      .get("http://localhost:3004/users")
      .then((result) => {
        console.log(result.data);
        setData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    addObsData();
  }, []);

  return (
    <div className="row p-2">
      <div className="col-9 border-end border-info">
        <h3 className="mb-3 text-info">My Recorded Observations</h3>
        <div className="d-inline">
          <div className="row">
            {data.map((d) => {
              return (
                <div className="col-4">
                  <div className="card mb-2" style={{ width: "18rem" }}>
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <h6
                          onClick={() => editBirdDetails(d.data.bird)}
                          className="badge bg-light text-dark"
                        >
                          Edit
                        </h6>
                        <h6
                          onClick={() => deleteBirdDetails(d.id)}
                          className="badge bg-warning text-dark"
                        >
                          Delete
                        </h6>
                      </div>
                      <h5 className="card-title">
                        {d.data.bird.toUpperCase()}
                      </h5>
                      <p className="card-text">
                        {`You found this at ${d.data.location} on ${d.data.longitude} E and ${d.data.lattitude} S lattitude `}
                        {d.data.number &&
                          `There were ${d.data.number} in numbers`}
                      </p>
                      <button
                        onClick={() => getBirdDetails(d.data.bird)}
                        className="btn btn-sm btn-outline-info"
                      >
                        Get More Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="col-3">
        <h3 className="mb-3 text-info">Bird Details</h3>
        {birdDetails ? (
          <div>
            {birdDetails.speciesCode && (
              <h3 className="mb-3">{birdDetails.speciesCode.toUpperCase()}</h3>
            )}
            {birdDetails.sciName && (
              <p>
                <b>
                  <i>Scientific Name : </i>
                </b>{" "}
                {birdDetails.sciName}
              </p>
            )}
            {birdDetails.comName && (
              <p>
                <b>
                  <i>Common Name : </i>
                </b>{" "}
                {birdDetails.comName}
              </p>
            )}
            {birdDetails.familyComName && (
              <p>
                <b>
                  <i>Family Common Name : </i>
                </b>{" "}
                {birdDetails.familyComName}
              </p>
            )}
            {birdDetails.familySciName && (
              <p>
                <b>
                  <i>Family Scientific Name : </i>
                </b>{" "}
                {birdDetails.familySciName}
              </p>
            )}
            {birdDetails.order && (
              <p>
                <b>
                  <i>Order Name : </i>
                </b>{" "}
                {birdDetails.order}
              </p>
            )}
          </div>
        ) : (
          <div>
            <h5>No data available</h5>
            <h5 className="mb-3">Select a different bird</h5>
          </div>
        )}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default MyObservations;
