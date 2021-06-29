import React from "react";

export default function Breadcumb({ title }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h3 className="py-4">{title}</h3>
        </div>
      </div>
    </div>
  );
}
