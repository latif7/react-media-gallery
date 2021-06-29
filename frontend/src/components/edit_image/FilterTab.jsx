import React from "react";
import FilterType from "./FilterType";

export default function FilterTab({ onFilterChange }) {
  return (
    <div
      className="tab-pane fade show active"
      id="pills-filter"
      role="tabpanel"
      aria-labelledby="pills-filter-tab"
    >
      <div className="row">
        <div className="col-3">
          <FilterType
            image="../../logo192.png"
            type="none"
            onFilterChange={onFilterChange}
            title="Orginal"
          />
        </div>
        <div className="col-3">
          <FilterType
            image="../../greyscale.png"
            type="greyscale"
            onFilterChange={onFilterChange}
            title="Grayscale"
          />
        </div>
        <div className="col-3">
          <FilterType
            image="../../sepia.png"
            type="sepia"
            onFilterChange={onFilterChange}
            title="Sepia"
          />
        </div>
        <div className="col-3">
          <FilterType
            image="../../invert.png"
            type="invert"
            onFilterChange={onFilterChange}
            title="Invert"
          />
        </div>
        <div className="col-3">
          <FilterType
            image="../../emboss.png"
            type="emboss"
            onFilterChange={onFilterChange}
            title="Emboss"
          />
        </div>
        <div className="col-3">
          <FilterType
            image="../../vintage.png"
            type="vintage"
            onFilterChange={onFilterChange}
            title="Vintage"
          />
        </div>
        <div className="col-3">
          <FilterType
            image="../../lomo.png"
            type="lomo"
            onFilterChange={onFilterChange}
            title="Lomo"
          />
        </div>
        <div className="col-3">
          <FilterType
            image="../../sunrise.png"
            type="sunrise"
            onFilterChange={onFilterChange}
            title="Sunrise"
          />
        </div>
      </div>
    </div>
  );
}
