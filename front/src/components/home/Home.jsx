import React, { useState, useEffect } from "react";
import Card from "./Card";
import Breadcumb from "../common/Breadcumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import imageService from "../../services/imageService";
import { Modal, Button } from "react-bootstrap-v5";
import { getImageUrl } from "../../helpers/utilities";

export default function Home() {
  const [images, setImages] = useState([]);
  const [fileName, setFileName] = useState("");
  const [modalType, setModalType] = useState("success");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    let res = await imageService.getImages();
    if (res.data.status_code && res.data.status_code == 200) {
      setImages(res.data.data);
    }
  };

  const handleFiles = async (file) => {
    const formData = new FormData();
    formData.append("image", file[0], file[0].name);
    let res = await imageService.upload(formData);

    if (res.data.status_code && res.data.status_code == 200) {
      setFileName("");
      setModalType("success");
    } else {
      setModalType("danger");
    }

    setMessage(res.data.message);
    handleShow();
    getImages();
  };

  const onChange = (e) => {
    e.preventDefault();
    setFileName(e.target.files[0].name);
    let file = e.target.files;
    handleFiles(file);
  };

  const dragOver = (e) => e.preventDefault();
  const dragEnter = (e) => e.preventDefault();
  const dragLeave = (e) => e.preventDefault();

  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  };

  return (
    <>
      <Breadcumb title="Media Library" />
      <div className="container mb-4">
        <div
          className="shadow-sm rounded content-wrapper"
          style={{ padding: "0px 12px", background: "#fff" }}
        >
          <div className="row px-4 py-3">
            <div className="col">
              <h4>{images.length} Items</h4>
            </div>
          </div>

          <div className="row px-4" style={{ backgroundColor: "#fff" }}>
            {images &&
              images.map((image, i) => (
                <div className="col-4" key={i}>
                  <Card
                    title={image.replace("/Gallery/", "")}
                    image={getImageUrl(image)}
                    link={"/edit-image/" + image.replace("/Gallery/", "")}
                  />
                </div>
              ))}
          </div>

          <div className="row px-4 py-3" style={{ background: "#eee" }}>
            <div className="col">
              <h3>Upload Image</h3>
            </div>
            <div className="col">
              <form encType="multipart/form-data">
                <div
                  className="image-upload"
                  onDragOver={dragOver}
                  onDragEnter={dragEnter}
                  onDragLeave={dragLeave}
                  onDrop={fileDrop}
                >
                  <label
                    className="d-block"
                    style={{ cursor: "pointer" }}
                    htmlFor="file_upload"
                  >
                    {fileName ? (
                      fileName
                    ) : (
                      <p className="text-muted text-center mb-0">
                        <FontAwesomeIcon icon={faUpload} /> &nbsp; Drag and Drop
                        or
                        <b> Browese file </b>
                      </p>
                    )}
                    <input
                      data-required="image"
                      type="file"
                      name="image_name"
                      id="file_upload"
                      className="image-input"
                      onChange={(e) => onChange(e)}
                    />
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          className={
            modalType == "success"
              ? "bg-success text-light"
              : "bg-danger text-light"
          }
        >
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button
            variant={modalType == "success" ? "success" : "danger"}
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
