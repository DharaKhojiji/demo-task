import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useQuery } from "react-query";
import { useSearchParams } from 'react-router-dom';
const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = "Password is Required";
  } else if (values.password.length > 20) {
    errors.password = "Must be 20 characters or less";
  }
  if (!values.confirmpassword) {
    errors.confirmpassword = "Password is Required";
  }
  return errors;
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const windowUrl = window.location.search;
  const token = windowUrl.split('=')[1]
  //  const { token } = useQuery();
  // const [token] = useSearchParams();
   console.log(token, "tokenreset")

  const toastOptions = {
    position: "bottom-center",
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmpassword: "",
    },
    validate,
    onSubmit: (values) => {
      console.log(values, "values");
      const { password, confirmpassword } = values;
      axios
        .patch(`http://localhost:5000/api/auth/userResetPassword/${token}`, {
          password,
          confirmpassword,
        })
        .then(({ status, data }) => {
          console.log(status , "status")
          if (status = 200) {
            console.log("here")
           toast.success(data.message)

            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  });
  return (
    <div className="container">
      <section style={{ width: "300px", height: "500px" }}>
        <main className="main-content  mt-0">
          <form onSubmit={formik.handleSubmit}>
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
              <div style={{ color: "red" }}>{formik.errors.password}</div>
            ) : null}
            <label className="form-label">Confirm password</label>
            <div className="input-group input-group-outline mb-3">
              <input
                type="password"
                name="confirmpassword"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmpassword}
              />
            </div>
            {formik.errors.confirmpassword ? (
              <div style={{ color: "red" }}>
                {formik.errors.confirmpassword}
              </div>
            ) : null}

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-lg bg-gradient-primary btn-lg w-100 mt-4 mb-0"
              >
                Submit
              </button>
            </div>
          </form>
        </main>
      </section>
      <ToastContainer />
    </div>
  );
};
export default ResetPassword;
