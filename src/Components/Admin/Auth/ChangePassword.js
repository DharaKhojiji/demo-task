import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
const validate = (values) => {
  const errors = {};

  if (!values.oldPassword) {
    errors.oldPassword = "Password is Required";
  } else if (values.oldPassword.length > 20) {
    errors.oldPassword = "Must be 20 characters or less";
  }
  if (!values.newPassword) {
    errors.newPassword = "Password is Required";
  } else if (values.newPassword.length > 20) {
    errors.newPassword = "Must be 20 characters or less";
  }
  if (!values.cnewPassword) {
    errors.cnewPassword = "Password is Required";
  }
  return errors;
};

const ChangePassword = () => {
    const token = localStorage.getItem("Token");
  const toastOptions = {
    position: "bottom-center",
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const formik = useFormik({
    initialValues: {
        oldPassword: "",
        newPassword: "",
        cnewPassword: "",
    },
    validate,
    onSubmit: (values, {resetForm}) => {
      console.log(values, "values");
    //   const { oldpassword, newpassword, newconfirmpassword } = values;
      axios
        .patch("http://localhost:5000/api/auth/resetPassword", values, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then(({ status, data }) => {
          if (status === 200) {
            console.log(data, "change password");
            toast.success(data.message);
            resetForm();
          }
        })  
        .catch((err) => {
            toast.error(err.response.data.message,toastOptions);
          console.log(err.response);
        });
    },
  });
  return (
    <>
        <section>
          <div className="container">
              <div className="row">

             
            <div
              className="card"
              style={{ padding: "36px", marginLeft: "265px", marginTop:"30px", width:"600px" }}
            >
              <div className="card card-plain">
                <div className="card-header" style={{ color: " #D81B60" }}>
                  <h4 className="font-weight-bolder">Change password</h4>
                </div>
                <div className="card-body" style={{ marginBottom: "50px" }}>
                  <form onSubmit={formik.handleSubmit}>
                    <label className="form-label"> Old password</label>
                    <div className="input-group input-group-outline mb-3">
                      <input
                        type="password"
                        name="oldPassword"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.oldPassword}
                      />
                    </div>
                    {formik.errors.oldPassword ? (
                      <div style={{ color: "red" }}>
                        {formik.errors.oldPassword}
                      </div>
                    ) : null}
                    <label className="form-label"> New password</label>
                    <div className="input-group input-group-outline mb-3">
                      <input
                        type="password"
                        name="newPassword"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.newPassword}
                      />
                    </div>

                    {formik.errors.newPassword ? (
                      <div style={{ color: "red" }}>
                        {formik.errors.newPassword}
                      </div>
                    ) : null}
                    <label className="form-label">Confirm New password</label>
                    <div className="input-group input-group-outline mb-3">
                      <input
                        type="password"
                        name="cnewPassword"
                        className="form-control"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cnewPassword}
                      />
                    </div>
                    {formik.errors.cnewPassword ? (
                      <div style={{ color: "red" }}>
                        {formik.errors.cnewPassword}
                      </div>
                    ) : null}

                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-lg bg-gradient-primary btn-lg w-40 mt-4 mb-0"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            </div>
          </div>
        </section>
   
      <ToastContainer />
    
    </>
  );
};
export default ChangePassword;
