import axios from "axios";
import React,{useState, useEffect} from "react";
import { toast, ToastContainer } from "react-toastify";
import AddGallery from "./AddGallery";
import ToggleButton from 'react-toggle-button'
const Gallery = () => {
  const token = localStorage.getItem("Token");
  const [gallery, setGallery] = useState([])


  useEffect(() => {
    axios
      .get("http://localhost:5000/api/gallery/")
      .then((data) => {
        if (data.status) {
          setGallery(data.data.data);
         
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

  const ImagedataHandler = (img) => {
  axios
     .post("http://localhost:5000/api/gallery/upload",
      img, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },).then((data) =>{
        if (data.status) { 
          toast.success(data.data.message);
          axios
            .get("http://localhost:5000/api/gallery/")
            .then((data) => {
               setGallery(data.data.data);
            })
            .catch((err) => {
              console.log(err.response.data.message);
            });
        }
      }).catch((err) => {
        console.log(err.response)
      })
  }
  const ImageDeleteHandler = (id) => {
    console.log(id, "id delete slider");
    axios
      .delete(`http://localhost:5000/api/gallery/delete/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        if (data.status) {
          toast.success(data.data.message);
          axios
            .get("http://localhost:5000/api/gallery/")
            .then((data) => {
              if (data.status) {
                setGallery(data.data.data);
              }
            })
            .catch((err) => {
              console.log(err.response.data.message);
            });
        }
      })
      .catch((err) => {
        console.log("error", err.response.data);
      });
  };
  
  const ImageAciveHandler = (id) => {
    // console.log(id, "id for active ");

    axios
      .patch(`http://localhost:5000/api/gallery/update/${id}`, gallery, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        if (data.status) {
          toast.success(data.data.message);
          // setActive((preValue) =>!preValue)
          axios
            .get(`http://localhost:5000/api/gallery/`, {
              headers: {
                authorization: `Bearer ${token}`,
              },
            })
            .then((data) => {
              if (data.status) {
                setGallery(data.data.data);
               
              }
            })
            .catch((err) => {
              console.log(err.response.data.message);
            });
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
 
  return (
    <>
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-12">
            <div className="card my-4">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                  <div className="row">
                    <div className="col-md-11">
                      <h4 className="text-white text-capitalize ps-3">
                        Gallery Table
                      </h4>
                    </div>
                    <div className="col-md-1 text-white text-capitalize ps-3">
                      <i
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        className="material-icons opacity-10"
                        style={{ fontSize: "40px" }}
                      >
                        post_add
                      </i>
                    </div>
                    <></>
                  </div>
                </div>
              </div>
              <div className="card-body px-0 pb-2">
                <div className="table-responsive p-0">
                  <table className="table align-items-center mb-0">
                    <thead>
                      <tr>
                        <th className="text-center text-uppercase text-secondary font-weight-bolder opacity-7">
                          NAME
                        </th>
                        <th className="text-center text-uppercase text-secondary font-weight-bolder opacity-7">
                          IMAGE
                        </th>
                        <th className="text-center text-uppercase text-secondary font-weight-bolder opacity-7">
                          STATUS
                        </th>
                        <th className="text-center text-uppercase text-secondary font-weight-bolder opacity-7">
                          DELETE
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                        {gallery.map((img) => {
                          return (
                            <tr key={img._id}>
                              <td className="align-middle text-center text-sm">
                                <p className="text-lg font-weight-bold mb-0">
                                  {img.name}
                                </p>
                              </td>
                              <td className="align-middle text-center text-sm">
                                <div>
                                  <img
                                    src={`http://${img.url}`}
                                    //  src={slideItem.url}
                                    className="avatar avatar-xl me-3 border-radius-lg"
                                    alt="icons"
                                  />
                                </div>
                              </td>
                              <td style={{ paddingLeft: "9.5%" }}>
                                <ToggleButton
                                  value={img.status || false}
                                  onToggle={() => {
                                    ImageAciveHandler(img._id)
                                  }}
                                />
                              </td>
                            
                              <td className="text-center text-lg">
                                <button
                                  className="badge badge-sm bg-gradient-danger"
                                  onClick={() =>
                                    ImageDeleteHandler (img._id)
                                  }
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer/>
      </div>
      <AddGallery addImage={ImagedataHandler}></AddGallery>
    </>
  );
};

export default Gallery;
