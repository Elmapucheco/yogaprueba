// ChallengeDay.js
import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import "./challengeDay.css"; // Importa el archivo CSS
import { IoMdArrowRoundBack } from "react-icons/io";
import start from "../../../assets/challengeDay.jpg";
import info from "../../../assets/info.png";
import MusicPlayer from "../../../components/MusicPlayer";
import { useDarkMode } from "../../../components/DarkMode";

function ChallengeDay() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { dia } = useParams();
  const location = useLocation();
  const sequences = location.state;
  const [daySequence, setDaySequence] = useState(null);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    // Encontrar el día correspondiente en las secuencias
    const sequence = sequences.find(
      (sequence) => sequence.dia === parseInt(dia)
    );
    setDaySequence(sequence);
  }, [dia, sequences]);

  if (!daySequence) {
    return (
      <div className="no-sequence">
        No se encontró la secuencia para el día {dia}
      </div>
    );
  }

  return (
    <div className={`challengeDay-container ${darkMode ? "dark" : ""}`}>
      <div className="challengeDay-portada">
        <div className="challengeDay-day-iconBack">
          <button onClick={goBack}>
            <IoMdArrowRoundBack />
          </button>
          {/* <MusicPlayer /> */}
          <h1>Day {dia}</h1>
          <img src={start} />
          <p>
            Here is your sequence! Take a look at the poses and begin your day{" "}
            {dia}.
          </p>
        </div>
      </div>

      <div className="challengeDay-day-sequence">
        <div className="challengeDay-asana-container">
          {Object.keys(daySequence).map(
            (key) =>
              Array.isArray(daySequence[key]) &&
              daySequence[key].map((asana, index) => (
                <Link
                  state={{ from: { dia } }}
                  to={`/poses-list/${asana.english_name}`}
                  key={`${key}_${index}`}
                  className="challengeDay-asana"
                >
                  <div className="challengeDay-asana-img-contenedor">
                    <img
                      src={asana.url_png}
                      alt={`Asana ${index + 1}`}
                      className="challengeDay-asana-img"
                    />
                    <span className="challengeDay-asana-name">
                      {asana.english_name}
                    </span>
                  </div>

                  <img className="challengeDay-info-icon" src={info} />
                </Link>
              ))
          )}
        </div>
        <Link
          to={`/challengeGallery/${dia}/play`}
          state={{ daySequence }}
          className="challengeDay-start-button"
        >
          Start
        </Link>
      </div>
    </div>
  );
}

export default ChallengeDay;
