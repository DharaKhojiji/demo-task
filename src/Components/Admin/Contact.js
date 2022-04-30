import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Contact() {
  const [contact, setContact] = useState([]);
    const token = localStorage.getItem("Token");
    console.log(token, "contact token")
    useEffect(() => {
      axios
        .get(
          "http://localhost:5000/api/contactUs",
  
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        )
        .then((data) => {
          if (data.status) {
            setContact(data.data.contactusdata);
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }, []);
    //console.log(contact, "contact");
    const DeleteContact = (id) => {
      console.log(id,"id for delete");
      axios
      .delete(
        `http://localhost:5000/api/contactUs/${id}`,
         
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      ).then((data) => {
        console.log(data,"after delete");
        if (data.status) {
          toast.success(data.data.message);
          axios
          .get(
            `http://localhost:5000/api/contactUs`,
    
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          ).then((data) => {
            if (data.status) {
              setContact(data.data.contactusdata);
            }
           console.log("response", data);
          })
          .catch((err) => {
            console.log(err.response.data);
          });
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    };
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
                    Contact Information
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body pt-4 p-3">
          {contact.map((contact, index) => { 
           
              return(

            <ul className="list-group">
              <li className="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                <div className="d-flex flex-column">
                  {/* <h6 className="mb-3 text-sm">Oliver Liam</h6> */}
                  <span className="mb-2 text-xs">
                    ID:
                    <span className="text-dark font-weight-bold ms-sm-2">
                   {index + 1}
                    </span>
                  </span>
                  <span className="mb-2 text-xs">
                    Name:
                    <span className="text-dark font-weight-bold ms-sm-2">
                   {contact.name}
                    </span>
                  </span>
                  <span className="mb-2 text-xs">
                    Email Address:
                    <span className="text-dark ms-sm-2 font-weight-bold">
                    {contact.email}
                    </span>
                  </span>
                  <span className="text-xs mb-2">
                    Subject:
                    <span className="text-dark ms-sm-2 font-weight-bold">
                    {contact.subject}
                    </span>
                  </span>
                  <span className="mb-2 text-xs">
                    message:
                    <span className="text-dark ms-sm-2 font-weight-bold">
                    {contact.message}
                    </span>
                  </span>
                </div>
                <div className="ms-auto text-end">
                  <a
                    className="btn btn-link text-danger text-gradient px-3 mb-0"
                    href="javascript:;"
                    onClick={() =>DeleteContact(contact._id)}
                  >
                    <i className="material-icons text-sm me-2">delete</i>
                    Delete
                  </a>
                </div>
              </li>
            </ul>
              )
          })}
          </div>
        </div>
      </div>
    </div>
    <ToastContainer/>
    
     </>
  );
}

export default Contact;
