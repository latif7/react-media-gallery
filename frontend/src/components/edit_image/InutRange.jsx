import React from "react";

export default function InutRange({
  label,
  value,
  step,
  min,
  max,
  name,
  onChange,
}) {
  return (
    <div className="mb-3 row">
      <label htmlFor={name} className="col-sm-2 col-form-label">
        {label}
      </label>
      <div className="col-sm-10">
        <input
          type="range"
          name={name}
          onChange={(e) => onChange(e)}
          className="form-range"
          id={name}
          step={step}
          min={min}
          max={max}
          value={value}
        />
      </div>
    </div>
  );
}
