import React from "react";
import { flip } from "@popperjs/core";

export default function CropTab({ changeAspectRation, changeRotate, flip }) {
  return (
    <div
      className="tab-pane fade"
      id="pills-crop"
      role="tabpanel"
      aria-labelledby="pills-crop-tab"
    >
      <div className="row mt-4">
        <div className="col">
          <label className="col-form-label me-2">Flip</label>
          <button
            type="button"
            onClick={() => flip("none")}
            className="btn btn-outline-primary me-2"
          >
            None
          </button>
          <button
            type="button"
            onClick={() => flip("h")}
            className="btn btn-outline-secondary me-2"
          >
            Flip Horizontally
          </button>
          <button
            type="button"
            onClick={() => flip("v")}
            className="btn btn-outline-secondary me-2"
          >
            Flip Vertically
          </button>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <label className="col-form-label me-2">Rotate</label>
          <button
            type="button"
            onClick={() => changeRotate(0)}
            className="btn btn-outline-primary me-2"
          >
            0 deg
          </button>
          <button
            type="button"
            onClick={() => changeRotate(30)}
            className="btn btn-outline-secondary me-2"
          >
            30 deg
          </button>
          <button
            type="button"
            onClick={() => changeRotate(60)}
            className="btn btn-outline-secondary me-2"
          >
            60 deg
          </button>
          <button
            type="button"
            onClick={() => changeRotate(90)}
            className="btn btn-outline-secondary me-2"
          >
            90 deg
          </button>
          <button
            type="button"
            onClick={() => changeRotate(180)}
            className="btn btn-outline-secondary me-2"
          >
            180 deg
          </button>
        </div>
        <div className="row mt-4">
          <div className="col">
            <label className="col-form-label me-2">Ratio</label>
            <button
              type="button"
              onClick={() => changeAspectRation(16 / 9)}
              className="btn btn-outline-primary me-2"
            >
              16:9
            </button>
            <button
              type="button"
              onClick={() => changeAspectRation(16 / 9)}
              className="btn btn-outline-secondary me-2"
            >
              10:7
            </button>

            <button
              onClick={() => changeAspectRation(10 / 7)}
              type="button"
              className="btn btn-outline-secondary me-2"
            >
              7:5
            </button>
            <button
              onClick={() => changeAspectRation(4 / 3)}
              type="button"
              className="btn btn-outline-secondary me-2"
            >
              4:3
            </button>
            <button
              type="button"
              onClick={() => changeAspectRation(5 / 3)}
              className="btn btn-outline-secondary me-2"
            >
              5:3
            </button>
            <button
              onClick={() => changeAspectRation(3 / 2)}
              type="button"
              className="btn btn-outline-secondary me-2"
            >
              3:2
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
