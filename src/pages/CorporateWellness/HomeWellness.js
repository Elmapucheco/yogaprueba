import React from "react";
import "./homeWellness.css";
import office from "../../assets/office.jpg";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../components/DarkMode";

function CorporateWellness() {
  const { darkMode } = useDarkMode();
  return (
    <div className={`container-wellness ${darkMode ? "dark" : ""}`}>
      <Link to="/program">
        <div className="cont-img-wellness">
          <h3>Employee Yoga Program</h3>
          <img className="img-wellness" src={office} alt="Office" />
        </div>
      </Link>
    </div>
  );
}

export default CorporateWellness;
