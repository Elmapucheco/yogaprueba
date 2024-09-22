import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "./challengeDay.css";
import { FaMusic } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import start from "../../../assets/challengeDay.jpg";
import info from "../../../assets/info.png";
import { useAudio } from "../../../components/Context/MusicPlayer";
import { useDarkMode } from "../../../components/Context/DarkMode";

function ChallengeDay() {
  const { darkMode } = useDarkMode();
  const location = useLocation();
  const sequence = location.state;
  const navigate = useNavigate();
  const { isPlaying, stopAudio, playAudio } = useAudio();

  function goBack() {
    navigate(-1);
  }

  if (!sequence) {
    return (
      <div className="no-sequence">
        No sequence found for the day {sequence.dia}
      </div>
    );
  }

  const asanaLinks = Object.keys(sequence)
    .map((key) =>
      Array.isArray(sequence[key])
        ? sequence[key].map((asana, index) => ({
            english_name: asana.english_name,
            key: `${key}_${index}`,
            url_png: asana.url_png,
          }))
        : []
    )
    .flat();

  return (
    <div className={`challengeDay-container ${darkMode ? "dark" : ""}`}>
      <div className="challengeDay-portada">
        <div className="challengeDay-day-iconBack">
          <button onClick={goBack}>
            <IoMdArrowRoundBack />
          </button>
          <FaMusic
            className="music-icon"
            onClick={isPlaying ? stopAudio : playAudio}
          />
          <h1>Day {sequence.dia}</h1>
          <img src={start} alt={`Day Challenge ${sequence.dia}`} />
          <p>
            Here is your sequence! Take a look at the poses and begin your day{" "}
            {sequence.dia}.
          </p>
        </div>
      </div>

      <div className="challengeDay-day-sequence">
        <div className="challengeDay-asana-container">
          {asanaLinks.map((asana) => (
            <Link
              to={`/poses-list/${asana.english_name}`}
              key={asana.key}
              className="challengeDay-asana"
            >
              <div className="challengeDay-asana-img-contenedor">
                <img
                  src={asana.url_png}
                  alt={`Icon ${asana.english_name}`}
                  className="challengeDay-asana-img"
                />
                <span className="challengeDay-asana-name">
                  {asana.english_name}
                </span>
              </div>
              <img
                className="challengeDay-info-icon"
                src={info}
                alt="Info Icon"
              />
            </Link>
          ))}
        </div>
        <Link
          to={`/challengeGallery/${sequence.dia}/play`}
          state={{ asanaLinks }}
          className="challengeDay-start-button"
        >
          Start
        </Link>
      </div>
    </div>
  );
}

export default ChallengeDay;
