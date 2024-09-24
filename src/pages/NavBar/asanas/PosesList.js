import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breathe from "../../../components/Breathe/Breathe";
import "./posesList.css";
import { useDarkMode } from "../../../components/Context/DarkMode";

function PosesList() {
  const [asanas, setAsanas] = useState([]);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://yoga-api-nzy4.onrender.com/v1/poses"
        );
        const data = await response.json();

        setAsanas(data);

        localStorage.setItem("asanas", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    const localStorageData = JSON.parse(localStorage.getItem("asanas"));
    if (localStorageData) {
      setAsanas(localStorageData);
    } else {
      fetchData();
    }
  }, []);

  if (!asanas || asanas.length === 0) {
    return (
      <div>
        <h1 className="poses-loading">Loading...</h1>
        <Breathe className="breathe" delay={4000} />
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
