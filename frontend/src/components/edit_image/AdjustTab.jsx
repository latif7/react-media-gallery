import React from "react";
import InputRange from "./InutRange";

export default function AdjustTab({ onChange, filter }) {
  return (
    <div
      className="tab-pane fade "
      id="pills-adjust"
      role="tabpanel"
      aria-labelledby="pills-adjust-tab"
    >
      <div className="row">
        <div className="col-6">
          <InputRange
            label="Exposure"
            value={filter.exposure}
            onChange={onChange}
            name="exposure"
            step="1"
            min="-100"
            max="100"
          />
          <InputRange
            label="Contrast"
            value={filter.contrast}
            onChange={onChange}
            name="contrast"
            step="1"
            min="-100"
            max="100"
          />
          <InputRange
            label="Saturation"
            value={filter.saturation}
            onChange={onChange}
            name="saturation"
            step="1"
            min="-100"
            max="100"
          />
          <InputRange
            label="Hue"
            value={filter.hue}
            onChange={onChange}
            name="hue"
            step="1"
            min="0"
            max="100"
          />
        </div>
        <div className="col-6">
          <InputRange
            label="Vibrance"
            value={filter.vibrance}
            onChange={onChange}
            name="vibrance"
            step="1"
            min="0"
            max="100"
          />
          <InputRange
            label="Highlight"
            value={filter.highlight}
            onChange={onChange}
            name="highlight"
            step="1"
            min="-100"
            max="100"
          />

          <InputRange
            label="Noise"
            onChange={onChange}
            value={filter.noise}
            name="noise"
            step="1"
            min="0"
            max="100"
          />
        </div>
      </div>
    </div>
  );
}
