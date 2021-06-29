import React from "react";

export default function Card({ image, link, title }) {
  return (
    <div className="card media-image">
      <a href={link} className="text-decoration-none">
        <img src={image} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
        </div>
      </a>
    </div>
  );
}
