import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./poseDetail.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDarkMode } from "../../../components/DarkMode";

function PoseDetail() {
  const [asana, setAsana] = useState(null);
  const { name } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useDarkMode();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    let isMounted = true;

    fetch(`https://yoga-api-nzy4.onrender.com/v1/poses?name=${name}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setAsana(data);
        }
      })
      .catch((error) =>
        console.error("Error al obtener detalles de la asana:", error)
      );

    return () => {
      isMounted = false;
    };
  }, [name]);

  if (!asana) {
    return <div className="pose-loading">Loading...</div>;
  }

  const receivedSignal =
    location.state && location.state.fromPosesList === "signal";

  return (
    <div className={`container-posedetail ${darkMode ? "dark" : ""}`}>
      <div className="container-posedetail-info">
        <div className="back-to-container">
          <button onClick={goBack}>
            <IoMdArrowRoundBack />
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
