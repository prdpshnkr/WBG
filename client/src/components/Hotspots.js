import React, { useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { SearchContext } from "../context/SearchContext";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import MapDetails from "./MapDetails";

function Hotspots() {
  const { add, coords } = useContext(SearchContext);

  console.log(add);
  console.log(coords);

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

  return (
    <div className="row" style={{ padding: "0 6rem" }}>
      <div className="col-5 border-end border-info">
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
                .max(20, "Must be 20 characters or less")
                .required("Required"),
              birdcount: Yup.number().positive().integer().required("Required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              addObsData(values);
              setSubmitting(false);
            }}
          >
            <Form>
              <label htmlFor="bird">Bird Details</label>
              <div className="mb-3">
                <Field name="bird" type="bird" placeholder="Enter Bird name" />
                <ErrorMessage name="bird" />{" "}
                <Field
                  name="birdcount"
                  type="number"
                  placeholder="Bird Count"
                />
                <ErrorMessage name="birdcount" />
              </div>
              <button type="submit" className="btn btn-outline-info">
                Record
              </button>{" "}
              <button className="btn btn-outline-info">Add Another</button>
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
      </div>
      <div className="col-7">
        <MapDetails />
      </div>
    </div>
  );
}

export default Hotspots;