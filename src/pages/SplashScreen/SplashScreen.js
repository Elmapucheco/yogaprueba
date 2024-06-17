// SplashScreen.js
import React from "react";
import splash from "../../assets/breathe.JPG";
import logo from "../../assets/splashLogo.webp";
import { useEffect } from "react";
import "./splashScreen.css";

function SplashScreen() {
  useEffect(() => {
    // Al montar el componente, agregar la clase 'no-padding' al body
    document.body.classList.add("no-padding");

    // Al desmontar el componente, quitar la clase 'no-padding' del body
    return () => {
      document.body.classList.remove("no-padding");
    };
  }, []);
  return (
    <div className="splash-screen">
      <img className="splash-background" src={splash} alt="Logo" />
      <div className="splash-logo-container">
        <img className="splash-logo" src={logo} />
      </div>
    </div>
  );
}

export default SplashScreen;
