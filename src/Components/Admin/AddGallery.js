import axios from "axios";
import React, { useCallback, useMemo, useState, useEffect } from "react";
// import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

function AddGallery(props) {
  const [image, setImage] = useState([]);
  const [error, setError] = useState("");

  const onDrop = useCallback((acceptedImage) => {
    {
      acceptedImage.length > 0
        ? setImage(
          acceptedImage.map((image) =>
              Object.assign(image, {
                preview: URL.createObjectURL(image),
              })
            )
          )
        : setError("File is To large");
    }
  }, []);

  const {
    getInputProps,
    getRootProps,
    } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
    minSize: 0,
    maxSize: 1000000,
  });
  const previewImage = image.map((image) => (
    <div key={image.name}>
      <img src={image.preview} alt={image.name}></img>
    </div>
  ));

  useEffect(
   () => {
      image.forEach((image) => URL.revokeObjectURL(image.preview));
    },
    [image]
  );

  const imageHandler = (e) => {
    const body = new FormData();
    e.preventDefault();

    for (let i = 0; i < image.length; i++) {
      body.append("file", image[i]);
    }
    props.addImage(body);
    document.getElementById("exampleModal").classList.remove("show", "d-block");
    document
      .querySelectorAll(".modal-backdrop")
      .forEach((el) => el.classList.remove("modal-backdrop"));
        setImage([]);
  };
  return (
    <div
      className="modal fade"
      id="exampleModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Add New Image
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <h6>Add Image</h6>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <div className="">Drag and drops files here</div>
            </div>
            <br></br>
              <div className="avatar avatar-xl me-3 border-radius-lg rounded float-start ">
                 {/* {previewSlide} */}
                {image.length > 0 ? previewImage : <p style={{color:"red"}}>{error}</p>}
                
              </div>
          </div>
          <div className="modal-footer">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) =>imageHandler(e)}
            >
              Add
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddGallery;
