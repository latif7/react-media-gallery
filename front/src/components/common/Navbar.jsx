import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        {/* <a className="navbar-brand" href="/">
          MEDEIFOLIO
        </a> */}
        <Link to="/" className="navbar-brand">
          MEDEIFOLIO
        </Link>
      </div>
    </nav>
  );
}
