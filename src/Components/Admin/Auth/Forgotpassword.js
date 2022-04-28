import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const EmailValidatiion = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});
const toastOptions = {
    position: "bottom-center",
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
const Forgotpassword = () => (
    
  <div>
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={EmailValidatiion}
      onSubmit={(values,{ resetForm }) => {
       console.log(values);
       const {email} = values;
       axios
           .post("http://localhost:5000/api/auth/forgotPassword", {email})
           .then(({ status, data }) => {
            if (status === 200) {
              toast.success(data.message);
              resetForm();
            
            }
          })
          .catch((err) => {
            console.log("catch", err.response.data.message);
            // setError(err.response.data.message)
            toast.error(err.response.data.message, toastOptions);
          });
      }}
    >
      {({ errors, touched }) => (
        <main className="main-content  mt-0">
          <div
            className="page-header align-items-start min-vh-80"
            style={{
              backgroundImage: `url(${
                process.env.PUBLIC_URL +
                "./assets/img/illustrations/illustration-signin.jpg"
              })`,
              width: "95%",
              borderRadius: "15px",
            }}
          >
            <span className="mask bg-gradient-dark opacity-6"></span>
            <div className="container my-auto">
              <div className="row">
                <div className="col-lg-4 col-md-8 col-12 mx-auto">
                  <div
                    className="card z-index-0 fadeIn3 fadeInBottom"
                    style={{ paddingBottom: "30px" }}
                  >
                    <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                      <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                        <h4 className="text-white font-weight-bolder text-center ">
                          Reset Password
                        </h4>
                      </div>
                    </div>
                    <div className="card-body">
                      <Form
                        role="form"
                        className="text-start"
                        style={{ padding: "20px" }}
                      >
                        <div className="input-group input-group-outline mb-3">
                          <Field
                            name="email"
                            type="email"
                            className="form-control"
                            placeholder="Enter your Email"
                          />
                        </div>
                        {errors.email && touched.email ? (
                          <div style={{ color: "red" }}>{errors.email}</div>
                        ) : null}
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn bg-gradient-primary w-100 my-4 mb-2"
                          >
                            Submit
                          </button>
                        </div>
                      </Form>
                      {/* <label  >Email</label>
                    <div className="input-group input-group-outline mb-3">
                      <input type="Emial" className="form-control" />
                    </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </main>
      )}
    </Formik>
  </div>
);

export default Forgotpassword;

