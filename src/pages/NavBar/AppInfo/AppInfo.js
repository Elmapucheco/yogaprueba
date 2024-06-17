import React from "react";
import soul from "../../../assets/slider1.jpg";
import "./appInfo.css";

function AppInfo() {
  return (
    <div className="raka">
      <div className="img-soulmate">
        <h3 className="info-texto">Yoga para Garagara</h3>
        <img src={soul} />
      </div>
    </div>
  );
}

export default AppInfo;

/* <h3 className="info-yo">
        "I'm Gabriel, and this app serves as a showcase of my journey.
        Originally a yoga instructor, I've transitioned into the world of
        frontend development. This application represents a pivotal step in my
        career transition, highlighting my skills and passion for creating
        intuitive and user-friendly digital experiences."
      </h3> */
