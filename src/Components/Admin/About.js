import React, { useEffect, useState } from "react";
import AddAbout from "./AddAbout";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import EditAbout from "./EditAbout";
const About = () => {
  const [about, setAbout] = useState([]);
  const [edit ,setEdit ] =  useState("");
  const token = localStorage.getItem("Token");

  // add about us ___________________________________________________
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/aboutUs/", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        if (data.status) {
          console.log("data", data);
          setAbout(data.data.aboutusdata);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);


  // delete about us_________________________________________
  const DeleteAbout = (aboutId) => {
    console.log(aboutId, "about id");
    console.log(token, "token");
    axios
      .delete(`http://localhost:5000/api/aboutUs/${aboutId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((dataAbout) => {
        console.log(dataAbout, "data after delte about");
        if (dataAbout.status) {
          toast.success(dataAbout.data.message);
          axios
            .get("http://localhost:5000/api/aboutUs/", {
              headers: {
                authorization: `Bearer ${token}`,
              },
            })
            .then((data) => {
              if (data.status) {
                console.log("data", data);
                console.log(about, "about");
                setAbout(data.data.aboutusdata);
              }
            })
            .catch((err) => {
              console.log(err.response.data.message);
            });
        }
      })
      .catch((err) => {
        console.log(err.response.dataAbout);
      });
  };
   const editDataHandler = (editData) => {
         console.log(editData , "editdata")
          axios
        .patch(`http://localhost:5000/api/aboutUs/${editData._id}`, editData, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((data) => {
          if (data.status) {
            toast.success(data.data.message);
            resetForm();
          }
        })
        .catch((err) => {
          toast.error(err.response.aboutData.Error);
          console.log(err.response.message); 
        });
   }


  return (
    <>
      <div className="row py-4">
        <div className="col-md-12 mt-4 ">
          <div className="card">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                <div className="row">
                  <div className="col-md-11">
                    <h4 className="text-white text-capitalize ps-3">
                      About Information
                    </h4>
                  </div>
                  <div className="col-md-1 text-white text-capitalize ps-3">
                    <i
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      className="material-icons opacity-10"
                      style={{ fontSize: "40px" }}
                      about={about}
                    >
                      post_add
                    </i>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body pt-4 p-3">
              {about?.map((about) => {
                return (
                  <ul className="list-group" key={about._id}>
                    <div className="row">
                      <li className="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                        {" "}
                        <div className="col-md-9 d-flex flex-column">
                          <span className="mb-3 text-xl">
                            Title:
                            <span className="text-dark font-weight-bold ms-sm-">
                              {about.title}
                            </span>
                          </span>
                          <span className="mb-3 text-xl">
                            Text:
                            <span className="text-dark font-weight-bold ms-sm-2">
                              {about.text}
                            </span>
                          </span>
                          <span className="mb-3 text-xl">
                            Address:
                            <span className="text-dark ms-sm-2 font-weight-bold">
                              {about.addresses}
                            </span>
                          </span>
                          <span className=" mb-3 text-xl">
                            Contact No:
                            <span className="text-dark ms-sm-2 font-weight-bold">
                              {about.contactNumber}
                            </span>
                          </span>
                          <span className="mb-3 text-xl">
                            Email:
                            <span className="text-dark ms-sm-2 font-weight-bold">
                              {about.email}
                            </span>
                          </span>
                        </div>
                        <div className="col-md-3">
                          <div className="ms-auto text-end">
                            <a className="btn btn-link text-danger text-gradient mb-0">
                              <i
                                className="material-icons text-sm me-2"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModalEdit"
                                onClick={() =>setEdit(about)}
                              >
                                edit
                              </i>
                              edit
                            </a>
                          </div>
                          <div className="ms-auto text-end">
                            <a
                              className="btn btn-link text-danger text-gradient px-3 mb-0"
                              onClick={() => DeleteAbout(about._id)}
                            >
                              <i className="material-icons text-sm me-2">
                                delete
                              </i>
                              Delete
                            </a>
                          </div>
                        </div>
                      </li>
                    </div>
                  </ul>
                );
              })}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      <AddAbout></AddAbout>
      <EditAbout edit={edit} editData={editDataHandler} ></EditAbout>
    </>
  );
};

export default About;
