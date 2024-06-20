import React from "react";
import { Link } from "react-router-dom";
import gara6 from "../../assets/challengePic.jpg";
import "./challenge.css";
import { useDarkMode } from "../../components/DarkMode";

function Challenge() {
  const { darkMode } = useDarkMode();
  return (
    <div className={`container-challenge ${darkMode ? "dark" : ""}`}>
      <Link to="challengeGallery">
        <div className="cont-img">
          <h3 className="title-challenge">30 days Yoga Challenge</h3>
          <img className="img-challenge" src={gara6} alt="Yoga Challenge" />
        </div>
      </Link>
    </div>
  );
}

export default Challenge;
