import React from "react";
import "./toggle.css";

function Toggle({ checked, onChange }) {
  return (
    <div
      className={`container-ans ${checked ? "toggled" : ""}`}
      onClick={onChange}
    >
      <div className="toggle-container-ans">
        <div className="toggle-button-ans"></div>
      </div>
    </div>
  );
}

export default Toggle;
