import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/AuthContext";
const Sidebar = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();
  const Signout = (e) => {
    alert();
    logout();
    localStorage.removeItem("user");
    localStorage.removeItem("Token");
    navigate("/");
  };
  return (
    <div
      className="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3   bg-gradient-dark"
      id="sidenav-main"
    >
      <div className="sidenav-header">
        {/* <i
          className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
          aria-hidden="true"
          id="iconSidenav"
        ></i> */}

        <a className="navbar-brand m-0" href="/" target="_blank">
          <div className="row">
            <div className="col-md-2">
              <i
                className="material-icons opacity-10"
                style={{ color: "white", fontSize: "30px" }}
              >
                admin_panel_settings
              </i>
            </div>
            <div className="col-md-10">
              <span
                className="font-weight-bold text-white"
                style={{ padding: "20px", fontSize: "20px" }}
              >
                ADMIN PANEL
              </span>
            </div>
          </div>
        </a>
      </div>
      <hr className="horizontal light mt-0 mb-2" />

      <ul className="navbar-nav ">
        <Link to="/slider">
          <li className="nav-item" style={{ marginBottom: "10px" }}>
            <div
              className="nav-link text-white active bg-gradient-primary"
              // href="./pages/dashboard.html"
            >
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">image</i>
              </div>
              <span className="nav-link-text ms-1">Slider</span>
            </div>
          </li>
        </Link>
        <Link to="/contact">
          <li className="nav-item" style={{ marginBottom: "10px" }}>
            <div
              className="nav-link text-white active bg-gradient-primary"
              // href="./pages/dashboard.html"
            >
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">
                  <span className="material-icons-outlined">
                    import_contacts
                  </span>
                </i>
              </div>
              <span className="nav-link-text ms-1">Contact</span>
            </div>
          </li>
        </Link>
        <Link to="/about">
          <li className="nav-item" style={{ marginBottom: "10px" }}>
            <div
              className="nav-link text-white active bg-gradient-primary"
              // href="./pages/dashboard.html"
            >
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">groups</i>
              </div>
              <span className="nav-link-text ms-1">About</span>
            </div>
          </li>
        </Link>
        <Link to="/gallery">
          <li className="nav-item" style={{ marginBottom: "10px" }}>
            <div
              className="nav-link text-white active bg-gradient-primary"
              // href="./pages/dashboard.html"
            >
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">collections</i>
              </div>
              <span className="nav-link-text ms-1">Gallery</span>
            </div>
          </li>
        </Link>

        <li className="nav-item mt-3">
          <h6 className="ps-4 ms-2 text-uppercase text-xs text-white font-weight-bolder opacity-8">
            Account Settings
          </h6>
        </li>

        <li className="nav-item">
          <div className="nav-link text-white " href="./pages/sign-in.html">
            <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
              <i className="material-icons opacity-10">login</i>
            </div>

            <button onClick={Signout}>
              <span className="nav-link-text ms-1">Sign out</span>
            </button>
          </div>
        </li>

        <Link to="/changepassword">
          <li className="nav-item">
            <div className="nav-link text-white " >
              <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                <i className="material-icons opacity-10">lock</i>
              </div>

              <span className="nav-link-text ms-1">Change Password</span>
            </div>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
