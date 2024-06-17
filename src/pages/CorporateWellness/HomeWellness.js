import React from "react";
import "./homeWellness.css";
import office from "../../assets/office.jpg";
import { Link } from "react-router-dom";

function CorporateWellness() {
  return (
    <Link to="/program">
      <div className="container-wellness">
        <div className="cont-img-wellness">
          <h3>Employee Yoga Program</h3>
          <img className="img-wellness" src={office} alt="Office" />
        </div>
      </div>
    </Link>
  );
}

export default CorporateWellness;
