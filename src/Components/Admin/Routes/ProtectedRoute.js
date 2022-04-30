import React from "react";
import { Route, Navigate, Routes, Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";

const ProtectedRoute = ({ component: Component, path: path }) => {
   const isAdmin = JSON.parse(localStorage.getItem("user"))
  //  isAdmin = true;
  //console.log(isAdmin, "admin");
  return (
    <div className="row">
      {/* <div className="cold-md-3"></div> */}
      <div className="col-md-12">
        <div style={{ marginLeft: "253px"}}>
          <Routes>
            <Route
              path={path}
              element={isAdmin ? <Component /> :<p> 404 No Page Found</p>}
            /> 
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoute;
