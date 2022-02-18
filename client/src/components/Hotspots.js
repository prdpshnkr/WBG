import React, { useContext, useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { SearchContext } from "../context/SearchContext";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import MapDetails from "./MapDetails";
import BirdsList from "./BirdsList";
import BirdContext from "../context/BirdContext";

function Hotspots() {
  const { bird } = useContext(BirdContext);
  const { add, coords } = useContext(SearchContext);
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState([]);
  const [hotspots, setHotspots] = useState([]);

  const addObsData = async (data) => {
    const successNotify = () => toast("Record Successfully Added!");
    data.location = add;
    data.longitude = coords.lng;
    data.lattitude = coords.lat;
    await axios
      .post("http://localhost:3004/users", { data })
      .then((result) => {
        console.log(result.data);
        successNotify();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchNearbyHotspots = async () => {
    setLoading(true);
    const headers = {
      "X-eBirdApiToken": "bbrc0dgm44c7",
    };

    await axios
      .get(
        `https://api.ebird.org/v2/ref/hotspot/geo?lat=${coords.lat}&lng=${coords.lng}&fmt=json`,
        {
          headers: headers,
        }
      )
      .then((res) => {
        setHotspots(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(coords.lat);
  };

  return (
    <div className="row" style={{ padding: "0 6rem" }}>
      <div className="col-4 border-end border-info">
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
          <Formik
            initialValues={{
              location: add,
              longitude: coords.lng,
              lattitude: coords.lat,
            }}
            validationSchema={Yup.object({
              bird: Yup.string()
                .max(50, "Must be 50 characters or less")
                .required("Required"),
              birdcount: Yup.number().positive().integer().required("Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              addObsData(values);
              setSubmitting(false);
            }}
          >
            <Form>
              <div className="mb-3">
                <BirdsList />
              </div>
              <div className="mb-3">
                <label htmlFor="bird">Bird Details</label>
                <Field
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  name="bird"
                  type="bird"
                  placeholder="Enter Bird name"
                />
                <ErrorMessage name="bird" />{" "}
              </div>
              <div className="mb-3">
                <label htmlFor="bird">Bird Count</label>
                <Field
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  name="birdcount"
                  type="number"
                  placeholder="Bird Count"
                />
                <ErrorMessage name="birdcount" />
              </div>
              <button type="submit" className="btn btn-outline-info">
                Record
              </button>{" "}
              <button
                type="submit"
                onClick={() => fetchNearbyHotspots()}
                className="btn btn-outline-info"
              >
                Fetch Hotspots
              </button>
              <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </Form>
          </Formik>
        </>
        <div className="row">
          {bird && (
            <div className="p-3">
              <strong>Bird Details</strong>
              <p>
                <b>
                  <i>Label : </i>
                </b>{" "}
                {bird.label}
              </p>
              <p>
                <b>
                  <i>Family Common Name : </i>
                </b>{" "}
                {bird.familyComName}
              </p>
              <p>
                <b>
                  <i>Scientific Name : </i>
                </b>{" "}
                {bird.sciName}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="col-8">
        <MapDetails hotspots={hotspots} />
      </div>
    </div>
  );
}

export default Hotspots;
