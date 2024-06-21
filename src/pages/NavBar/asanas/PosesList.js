import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breathe from "../../../components/Breathe/Breathe";
import "./posesList.css";
import { useDarkMode } from "../../../components/DarkMode";

function PosesList() {
  const [asanas, setAsanas] = useState([]);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    fetch("https://yoga-api-nzy4.onrender.com/v1//poses")
      .then((res) => res.json())
      .then((data) => setAsanas(data))
      .catch((error) => console.log("Error fetching data:", error));
  }, []);

  if (!asanas || asanas.length === 0) {
    return (
      <div>
        <h1 className="poses-loading">Loading...</h1>
        <Breathe className="breathe" />
      </div>
    );
  }

  const filteredAsanas = asanas.filter(
    (asana) => asana.english_name !== "Child's Pose"
  );

  return (
    <div className={`container-poselist ${darkMode ? "dark" : ""}`}>
      <div className="asana-poselist">
        {filteredAsanas.map((asana) => (
          <Link
            to={`/poses-list/${asana.english_name}`}
            key={asana.id}
            state={{ fromPosesList: "signal" }}
          >
            <div className="poselist-asana-item">
              <img src={asana.url_png} alt={asana.english_name} />
              <p>{asana.english_name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PosesList;
