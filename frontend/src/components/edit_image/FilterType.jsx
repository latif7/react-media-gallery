import React from "react";

export default function FilterType({
  image,
  title,
  type,
  onFilterChange,
  activeClass,
}) {
  return (
    <div
      className="card filter-type"
      data-filter={type}
      onClick={(e) => onFilterChange(e, type)}
    >
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
      </div>
    </div>
  );
}
