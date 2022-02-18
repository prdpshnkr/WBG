import React, { useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BirdsList from "./BirdsList";
import PlacesList from "./PlacesList";
import BirdContext from "../context/BirdContext";

const ObsRecordForm = () => {
  const { bird } = useContext(BirdContext);
  
  const addObsData = async (data) => {
    const successNotify = () => toast("Record Successfully Added!");
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
    <div className="row">
      <div className="col-5 border-end border-info">
        <Formik
          initialValues={{ location: "", longitude: "", lattitude: "" }}
          validationSchema={Yup.object({
            location: Yup.string()
              .max(50, "Must be 50 characters or less")
              .required("Required"),
            longitude: Yup.string()
              .max(12, "Must be 12 characters or less")
              .required("Required"),
            lattitude: Yup.string()
              .max(12, "Must be 12 characters or less")
              .required("Required"),
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
            <div style={{ padding: "0 6rem" }}>
              <h3 className="mt-2 mb-4 text-info">Record Your Observation</h3>
              <label htmlFor="location">Place</label>
              <div className="mb-3  ">
                <Field name="location" type="text" placeholder="Enter Place" />
                <ErrorMessage name="location" />
              </div>
              <label htmlFor="longitude">Location Details / Co ordinates</label>
              <div className="mb-3">
                <Field
                  name="longitude"
                  type="text"
                  placeholder="Enter Longitude"
                />
                <ErrorMessage name="longitude" />{" "}
                <Field
                  name="lattitude"
                  type="lattitude"
                  placeholder="Enter Lattitude"
                />
                <ErrorMessage name="lattitude" />
              </div>
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
            </div>
          </Form>
        </Formik>
      </div>
      <div className="col-4 border-end border-info">
        <h3 className="mt-2 mb-4 text-info">Search Places</h3>
        <PlacesList />
      </div>
      <div className="col-3">
        <h3 className="mt-2 mb-4 text-info">Search Birds</h3>
        <BirdsList />
        {bird && (
          <div className="p-3">
            <p>
              <b>
                <i>Label : </i>
              </b>{" "}
              {bird.label}
            </p>
            <p>
              <b>
                <i>Category : </i>
              </b>{" "}
              {bird.category}
            </p>
            <p>
              <b>
                <i>Family Code : </i>
              </b>{" "}
              {bird.familyCode}
            </p>
            <p>
              <b>
                <i>Family Common Name : </i>
              </b>{" "}
              {bird.familyComName}
            </p>
            <p>
              <b>
                <i>Family Scientific Name : </i>
              </b>{" "}
              {bird.familySciName}
            </p>
            <p>
              <b>
                <i>Order : </i>
              </b>{" "}
              {bird.order}
            </p>
            <p>
              <b>
                <i>Scientific Name : </i>
              </b>{" "}
              {bird.sciName}
            </p>
            <p>
              <b>
                <i>Species Code : </i>
              </b>{" "}
              {bird.speciesCode}
            </p>
            <p>
              <b>
                <i>Taxonomical Order : </i>
              </b>{" "}
              {bird.taxonOrder}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ObsRecordForm;
