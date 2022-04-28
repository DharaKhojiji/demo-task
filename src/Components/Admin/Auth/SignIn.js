import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is Required";
  } else if (values.password.length > 20) {
    errors.password = "Must be 20 characters or less";
  }

  return errors;
};

const SignIn = () => {
  const { login } = useContext(UserContext);
  const [error, setError]=useState([]);
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-center",
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values, "values");
      const { email, password } = values;

      axios
        .post("http://localhost:5000/api/auth/login", { email, password })
        .then(({ status, data }) => {
          if (status === 200) {
            //lert("success");
            console.log(data);
            toast.success("Login Succussfully");
            login();
            localStorage.setItem("user", JSON.stringify(data));
            
            navigate("/dashboard");
          }
        })
        .catch((err) => {
          console.log("catch", err.response.data);
          setError(err.response.data.message)
          toast.error(error, toastOptions);
        });
    },
  });
  return (
    <div className="container">
      <main className="main-content  mt-0">
        <section>
          <div className="page-header min-vh-100">
            <div className="container">
              <div className="row">
                <div className="col-md-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column">
                  <div
                    className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center"
                    style={{
                      backgroundImage: `url(${
                        process.env.PUBLIC_URL +
                        "./assets/img/illustrations/illustration-signup.jpg"
                      })`,

                      backgroundSize: "cover",
                    }}
                  ></div>
                </div>
                <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5">
                  <div className="card" style={{ padding: "36px" }}>
                    <div className="card card-plain">
                      <div
                        className="card-header"
                        style={{ color: " #D81B60" }}
                      >
                        <h4 className="font-weight-bolder">Sign In</h4>
                      </div>
                      <div
                        className="card-body"
                        style={{ marginBottom: "50px" }}
                      >
                        <form onSubmit={formik.handleSubmit}>
                          <label className="form-label">Email</label>
                          <div className="input-group input-group-outline mb-3">
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.email}
                            />
                          </div>

                          {formik.errors.email ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.email}
                            </div>
                          ) : null}
                          <label className="form-label">password</label>
                          <div className="input-group input-group-outline mb-3">
                            <input
                              type="password"
                              name="password"
                              className="form-control"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.password}
                            />
                          </div>
                          {formik.errors.password ? (
                            <div style={{ color: "red" }}>
                              {formik.errors.password}
                            </div>
                          ) : null}
                          <div
                            className="text-center"
                            style={{ paddingLeft: "35%" }}
                          >
                            <Link to="/forgotpassword">
                              <span>Forgot Password?</span>
                            </Link>
                          </div>

                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0"
                            >
                              Admin Login
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
