import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./poseDetail.css";
import arrowpurple from "../../../assets/arrowpurple.png";
import { useDarkMode } from "../../../components/Context/DarkMode";
import Breathe from "../../../components/Breathe/Breathe";

function PoseDetail() {
  const [asana, setAsana] = useState(null);
  const { name } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const receivedSignal = location.state;
  const { darkMode } = useDarkMode();

  function goBack() {
    navigate(-1);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://yoga-api-nzy4.onrender.com/v1/poses?name=${name}`
        );
        const data = await response.json();

        setAsana(data);
      } catch (error) {
        console.error("Error getting asana data:", error);
      }
    }
    const localStorageAsana = JSON.parse(localStorage.getItem("asanas"));

    if (localStorageAsana) {
      const filteredAsana = localStorageAsana.find(
        (item) => item.english_name === name
      );
      setAsana(filteredAsana);
    } else {
      fetchData();
    }
  }, []);

  if (!asana) {
    return (
      <div>
        <h1 className="poses-loading">Loading...</h1>
        <Breathe className="breathe" delay={4000} />
      </div>
    );
  }

  return (
    <div className={`container-posedetail ${darkMode ? "dark" : ""}`}>
      <div className="container-posedetail-info">
        <div className="back-to-container">
          <button onClick={goBack}>
            <img src={arrowpurple} alt="icon return" />
          </button>
        </div>
        <div className="details-desktop">
          <div className="asana-nameasana">
            <img
              className="img-svg"
              src={asana.url_png}
              alt={`${asana.english_name} pose`}
            />
            <h2>
              {asana.english_name} ({asana.sanskrit_name})
            </h2>
          </div>
          <div className="text-asanas">
            {receivedSignal && (
              <>
                <h3>Benefits</h3>
                <p>{asana.pose_benefits}</p>
              </>
            )}
            <h3>Description</h3>
            <p>{asana.pose_description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PoseDetail;
