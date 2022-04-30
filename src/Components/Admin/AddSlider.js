import axios from "axios";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const baseStyle = {
  display: "flex",
  flexdirection: "column",
  alignitems: "center",
  padding: "20px",
  borderwidth: 2,
  borderradius: 2,
  bordercolor: "#eeeeee",
  borderstyle: "dashed",
  backgroundcolor: "#fafafa",
  color: "#bdbdbd",
  transition: "border .3s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const AddSlider = (props) => {
  const navigate = useNavigate();
  const [file, setFiles] = useState([]);
  const [error, setError] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    {acceptedFiles.length > 0 ? setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    ) : setError("File is To large")}
    
  }, []);
  const {
    getInputProps,
    getRootProps,
    isDragAccept,
    isDragReject,
    rejectedFiles,
    isDragActive,
    maxSize,
  } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
    minSize: 0,
    maxSize: 1000000,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragActive ? activeStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragAccept, isDragActive, isDragReject]
  );
  const previewSlide = file.map((file) => (
    <div key={file.name}>
      <img src={file.preview} alt={file.name}></img>
    </div>
  ));
  // clean up _______________________

    useEffect(
     () => {
      file.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [file]
  );
  const slideAddHandler = (e) => {
    const body = new FormData();
    e.preventDefault();
    for (let i = 0; i < file.length; i++) {
      body.append("file", file[i]);
    }
    props.sliderData(body);
    navigate("/slider");
    document.getElementById("exampleModal").classList.remove("show", "d-block");
    document
      .querySelectorAll(".modal-backdrop")
      .forEach((el) => el.classList.remove("modal-backdrop"));
    setFiles([]);
    
  };
  console.log(file, "preview error")
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        {/* {!closeModel && ( */}
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add New Slides
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
              <div {...getRootProps(style)}>
                <input {...getInputProps(style)} />
                <div className="">Drag and drops files here</div>
                {/* {isFileTooLarge && (
                  <div className="text-danger mt-2">File is too large.</div>
                )} */}
              </div>
              <br></br>
              <div className="avatar avatar-xl me-3 border-radius-lg rounded float-start ">
                 {/* {previewSlide} */}
                {file.length > 0 ? previewSlide : <p style={{color:"red"}}>{error}</p>}
                
              </div>
            </div>


            <div className="modal-footer">
            {!file.length ? null :<button
                type="button"
                className="btn btn-primary"
                onClick={(e) => slideAddHandler(e)}
              >
                Add
              </button>}
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
    </>
  );
};

export default AddSlider;
