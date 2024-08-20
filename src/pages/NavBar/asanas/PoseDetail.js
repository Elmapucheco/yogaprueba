import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./poseDetail.css";
import arrowpurple from "../../../assets/arrowpurple.png";
import { useDarkMode } from "../../../components/Context/DarkMode";

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
    const fetchData = async () => {
      const localStorageAsana = JSON.parse(localStorage.getItem("asanas"));

      if (localStorageAsana) {
        const filteredAsana = localStorageAsana.find(
          (item) => item.english_name === name
        );
        setAsana(filteredAsana);
      } else {
        fetch(`https://yoga-api-nzy4.onrender.com/v1/poses?name=${name}`)
          .then((res) => res.json())
          .then((data) => {
            setAsana(data);
            console.log(data);
          })
          .catch((error) =>
            console.error("Error al obtener detalles de la asana:", error)
          );
      }
    };
    fetchData();
  }, []);

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

// I will use the params name to specify the information that comes either
// from LocalStorage in case posesList has already saved it, or from the api if not,
//   or that comes from Slider or Challenge.
// Whatever the source, I will save that specific data in the asana state for rendering.
// I will use the location to know where the component was linked from and
// accordingly decide what information I will show
