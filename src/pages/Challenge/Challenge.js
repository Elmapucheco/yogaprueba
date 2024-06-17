import React from "react";
import { Link } from "react-router-dom";
import gara6 from "../../assets/challengePic.jpg";
import "./challenge.css";

function Challenge() {
  return (
    <div className="container-challenge">
      <Link to="challengeGallery">
        <h3 className="title-challenge">30 days Yoga Challenge</h3>
        <div className="cont-img">
          <img className="img-challenge" src={gara6} alt="Yoga Challenge" />
        </div>
      </Link>
    </div>
  );
}

export default Challenge;
