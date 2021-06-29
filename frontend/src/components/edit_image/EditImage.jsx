import React, { Component, createRef } from "react";
import Breadcumb from "../common/Breadcumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagic } from "@fortawesome/free-solid-svg-icons";
import CropTab from "./CropTab";
import AdjustTab from "./AdjustTab";
import FilterTab from "./FilterTab";
import imageService from "../../services/imageService";
import "tui-image-editor/dist/tui-image-editor.css";
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap-v5";

export default class EditImage extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = createRef();
    this.state = {
      imgUrl: "",
      filter: "none",
      imageData: "",
      aspectRatio: 16 / 9,
      modalShow: false,
      modalType: "",
      message: "",
      rotate: 30,
      scaleH: 1,
      scaleV: 1,
      cropper: null,
      adjustFilter: {
        contrast: 0,
        exposure: 0,
        highlight: 0,
        saturation: 0,
        hue: 0,
        vibrance: 0,
        noise: 0,
      },
    };
  }

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  regiterCustomFilters() {
    window.Caman.Filter.register("crop", function () {
      // Here we call processPlugin so CamanJS knows how to handle it
      this.processPlugin("crop", arguments);
    });
    window.Caman.Filter.register("rotate", function () {
      // Here we call processPlugin so CamanJS knows how to handle it
      this.processPlugin("rotate", arguments);
    });
    window.Caman.Filter.register("flip", function () {
      return this.processPlugin("flip");
    });

    window.Caman.Filter.register("mirror", function () {
      this.processPlugin("mirror", arguments);
    });
    window.Caman.Filter.register("emboss", function (adjust) {
      return this.processKernel("Emboss", [-2, -1, 0, -1, 1, 1, 0, 1, 2]);
    });

    window.Caman.Filter.register("test", function (adjust) {
      return this.greyscale(100);
    });

    window.Caman.Filter.register("vintage", function (adjust) {
      if (adjust == null) {
        adjust = true;
      }
      this.greyscale();
      this.contrast(5);
      this.noise(3);
      this.sepia(100);
      this.channels({
        red: 8,
        blue: 2,
        green: 4,
      });
      this.gamma(0.87);
      if (adjust) {
        return this.vignette("40%", 30);
      }
    });

    window.window.Caman.Filter.register("lomo", function (adjust) {
      if (adjust == null) {
        adjust = true;
      }
      this.brightness(15);
      this.exposure(15);
      this.curves("rgb", [0, 0], [200, 0], [155, 255], [255, 255]);
      this.saturation(-20);
      this.gamma(1.8);
      if (adjust) {
        this.vignette("50%", 60);
      }
      return this.brightness(5);
    });
  }

  componentDidMount() {
    this.regiterCustomFilters();
    this.getImage();
  }

  getImage = async () => {
    let res = await imageService.getImage(this.props.match.params.image);
    this.setState(
      {
        imageData: "data:image/png;base64," + res.data.data.image,
      },
      function () {
        this.canvasRender();
      }
    );
  };
  //
  canvasRender = () => {
    let filter = this.state.filter;

    let img = new Image();
    var canvas = this.canvasRef.current;
    var ctx = canvas.getContext("2d");
    img.src = this.state.imageData;
    this.setState({ imgUrl: img });

    img.onload = function () {
      ctx.filter = filter;
      canvas.width = this.naturalWidth;
      canvas.height = this.naturalHeight;
      ctx.drawImage(img, 0, 0);
    };
  };

  resetCanvas(canvas) {
    let ctx = canvas.getContext("2d");
    let img = this.state.imgUrl;
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0, img.width, img.height);
  }

  applyFilter = (e, type) => {
    e.preventDefault();
    this.croperDestroy();

    let canvas = document.getElementById("myCanvas");

    this.resetCanvas(canvas);
    if (type == "none") {
      return;
    }
    window.window.Caman("#myCanvas", function () {
      this.replaceCanvas(canvas);
      this[type]().render();
    });
  };

  saveImage = async (e) => {
    let canvas = document.getElementById("myCanvas");
    let imagedata = "";
    if (this.state.cropper && this.state.cropper.getCropBoxData().width > 0) {
      imagedata = this.state.cropper.getCroppedCanvas().toDataURL("image/png");
    } else {
      imagedata = canvas.toDataURL("image/png");
    }

    let res = await imageService.updateImage({
      image: imagedata,
      fileName: this.props.match.params.image,
    });
    if (res.data.status_code && res.data.status_code == 200) {
      this.setState({ modalType: "success" });
    } else {
      this.setState({ modalType: "danger" });
    }

    this.setState({ message: res.data.message });
    this.handleShow();
  };

  onChangeAdjustFilter = (e) => {
    e.preventDefault();
    this.croperDestroy();
    const name = e.target.getAttribute("name");
    const value = e.target.value;
    this.setState(
      {
        adjustFilter: {
          ...this.state.adjustFilter,
          [e.target.name]: e.target.value,
        },
      },
      function () {
        return this.updateCanvasFilters();
      }
    );
  };

  updateCanvasFilters = () => {
    let filters = this.state.adjustFilter;
    console.log(filters);

    let canvas = document.getElementById("myCanvas");
    this.canvasRender(canvas);
    window.Caman("#myCanvas", function () {
      this.replaceCanvas(canvas);
      this.contrast(filters.contrast)
        .saturation(filters.saturation)
        .brightness(filters.highlight)
        .exposure(filters.exposure)
        .hue(filters.hue)
        .vibrance(filters.vibrance)
        .noise(filters.noise)
        .render();
    });
  };

  renderCrop = () => {
    var cropper = null;
    if (cropper) {
      cropper.clear();
    }
    const image = document.getElementById("myCanvas");
    this.resetCanvas(image);

    cropper = new Cropper(image, {
      autoCrop: false,
      zoomable: false,

      crop: function () {},
    });

    cropper.setAspectRatio(this.state.aspectRatio);
    // cropper.crop();

    this.setState({ cropper: cropper });
  };

  croperDestroy = () => {
    if (this.state.cropper) {
      this.state.cropper.destroy();
    }
  };

  changeAspectRation = (ration) => {
    this.croperDestroy();
    this.setState({ aspectRatio: ration }, function () {
      this.renderCrop();
    });
  };

  changeRotate = (deg) => {
    this.croperDestroy();
    this.setState({ rotate: deg }, function () {
      let canvas = document.getElementById("myCanvas");
      this.resetCanvas(canvas);

      if (deg == 0) {
        return;
      }

      window.Caman("#myCanvas", function () {
        this.replaceCanvas(canvas);
        this.rotate(deg);
        this.render();
      });
    });
  };

  flipImage(flipH, flipV) {
    let canvas = document.getElementById("myCanvas");

    if (flipH && flipV) {
      this.resetCanvas(canvas);
      return;
    }
    let ctx = canvas.getContext("2d");
    let img = this.state.imgUrl;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    var scaleH = flipH ? -1 : 1,
      scaleV = flipV ? -1 : 1,
      posX = flipH ? img.naturalWidth * -1 : 0,
      posY = flipV ? img.naturalHeight * -1 : 0;

    ctx.save();
    ctx.scale(scaleH, scaleV);
    ctx.drawImage(img, posX, posY, img.naturalWidth, img.naturalHeight);
    ctx.restore();
  }

  flip = (type) => {
    this.croperDestroy();
    if (type == "h") {
      this.setState({ scaleH: !this.state.scaleH });
      this.flipImage(1, 0);
    } else if (type == "v") {
      this.setState({ scaleV: !this.state.scaleV });
      this.flipImage(0, 1);
    } else {
      this.flipImage(1, 1);
    }
  };

  render() {
    return (
      <>
        <Breadcumb title={this.props.match.params.image} />
        <div className="container ">
          <div
            className="shadow-sm rounded content-wrapper"
            style={{ padding: "30px 100px", background: "#fff" }}
          >
            <div className="row">
              <div className="col">
                <div className="card mb-3 ">
                  <canvas ref={this.canvasRef} id="myCanvas"></canvas>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <ul
                  className="nav nav-pills mb-3 d-flex justify-content-center"
                  id="pills-tab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="pills-filter-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-filter"
                      type="button"
                      role="tab"
                      aria-controls="pills-filter"
                      aria-selected="true"
                    >
                      Filter
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-adjust-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-adjust"
                      type="button"
                      role="tab"
                      aria-controls="pills-adjust"
                      aria-selected="false"
                    >
                      Adjust
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="pills-crop-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-crop"
                      type="button"
                      role="tab"
                      aria-controls="pills-crop"
                      aria-selected="false"
                    >
                      Crop
                    </button>
                  </li>
                </ul>

                <div className="tab-content px-4" id="pills-tabContent">
                  <FilterTab onFilterChange={this.applyFilter} />
                  <AdjustTab
                    filter={this.state.adjustFilter}
                    onChange={this.onChangeAdjustFilter}
                  />
                  <CropTab
                    flip={this.flip}
                    changeRotate={this.changeRotate}
                    changeAspectRation={this.changeAspectRation}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-light">
          <div className="container">
            <div style={{ padding: "30px 100px", background: "#fff" }}>
              <div className="row">
                <div className="col">
                  <button
                    className="btn btn-primary float-end me-2"
                    onClick={(e) => this.saveImage(e)}
                  >
                    Save
                  </button>
                  <Link className="btn btn-light float-end me-2" to="/">
                    Back
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header
            closeButton
            className={
              this.state.modalType == "success"
                ? "bg-success text-light"
                : "bg-danger text-light"
            }
          >
            <Modal.Title>Alert</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.state.message}</Modal.Body>
          <Modal.Footer>
            <Button
              variant={this.state.modalType == "success" ? "success" : "danger"}
              onClick={this.handleClose}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
