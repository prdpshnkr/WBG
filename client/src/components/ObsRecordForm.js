import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ObsRecordForm = () => {
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
    <Formik
      initialValues={{ location: "", longitude: "", lattitude: "" }}
      validationSchema={Yup.object({
        location: Yup.string()
          .max(50, "Must be 50 characters or less")
          .required("Required"),
        longitude: Yup.string()
          .max(5, "Must be 5 characters or less")
          .required("Required"),
        lattitude: Yup.string()
          .max(5, "Must be 5 characters or less")
          .required("Required"),
        bird: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("Required"),
        birdcount: Yup.number().positive().integer()
          .required("Required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        addObsData(values);
        setSubmitting(false);
      }}
    >
      <Form>
        <div style={{ padding: "1rem" }}>
          <h3 className="mt-2 mb-4 text-info">Record Your Observation</h3>
          <label htmlFor="location">Place</label>
          <div className="mb-3  ">
            <Field name="location" type="text" placeholder="Enter Place" />
            <ErrorMessage name="location" />
          </div>
          <label htmlFor="longitude">Longitude and Lattitude</label>
          <div className="mb-3">
            <Field name="longitude" type="text" placeholder="Enter Longitude" />
            <ErrorMessage name="longitude" />{" "}
            <Field
              name="lattitude"
              type="lattitude"
              placeholder="Enter Lattitude"
            />
            <ErrorMessage name="lattitude" />
          </div>
          <label htmlFor="bird">Bird</label>
          <div className="mb-3">
            <Field name="bird" type="bird" placeholder="Enter Bird name" />
            <ErrorMessage name="bird" />{" "}
            <Field name="birdcount" type="number" placeholder="Bird Count" />
            <ErrorMessage name="birdcount" />
          </div>
          <button type="submit" className="btn btn-outline-info">
            Record
          </button>
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
      </Form>
    </Formik>
  );
};

export default ObsRecordForm;
