import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import "./challengeDay.css";
import { FaMusic } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import start from "../../../assets/challengeDay.jpg";
import info from "../../../assets/info.png";
import { useAudio } from "../../../components/Context/MusicPlayer";
import { useDarkMode } from "../../../components/Context/DarkMode";

function ChallengeDay() {
  const { darkMode } = useDarkMode();
  const { dia } = useParams();
  const location = useLocation();
  const sequences = location.state;
  const [daySequence, setDaySequence] = useState(null);
  const navigate = useNavigate();
  const { isPlaying, stopAudio, playAudio } = useAudio();

  useEffect(() => {
    const sequence = sequences.find(
      (sequence) => sequence.dia === parseInt(dia)
    );
    setDaySequence(sequence);
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  if (!daySequence) {
    return (
      <div className="no-sequence">
        No se encontró la secuencia para el día {dia}
      </div>
    );
  }

  const asanaLinks = Object.keys(daySequence)
    .map((key) =>
      Array.isArray(daySequence[key])
        ? daySequence[key].map((asana, index) => ({
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
          <h1>Day {dia}</h1>
          <img src={start} alt={`Start of Day ${dia}`} />
          <p>
            Here is your sequence! Take a look at the poses and begin your day{" "}
            {dia}.
          </p>
        </div>
      </div>

      <div className="challengeDay-day-sequence">
        <div className="challengeDay-asana-container">
          {asanaLinks.map((asana) => (
            <Link
              state={{ from: { dia } }}
              to={`/poses-list/${asana.english_name}`}
              key={asana.key}
              className="challengeDay-asana"
            >
              <div className="challengeDay-asana-img-contenedor">
                <img
                  src={asana.url_png}
                  alt={`Asana ${asana.key}`}
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
          to={`/challengeGallery/${dia}/play`}
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
// daySequence is an object, but I need an array to iterate and generate
//  the list in the jsx, that's why ObjectKeys takes it as a parameter and will return
//  an array only with the keys of that object (id, day, standing, seated). Mapping over that array
//  and check with Array.isArray that the portion of the daysequences object corresponding to the key,
//  that is being iterated, is an array, and if it is, I will create in that portion an object with 3 new keys.
//  If it is not an array, I will have an empty array. Finally, flat() will help me make the generated array alone
//  contains iterable values, that is, if a key (for example standing) generated 4 objects inside
//  because so determined, I do not end up with a nested array of 4 objects, but rather flat
//  goes through those brackets and generates 4 elements for my total array, it also goes through
//  the [] and then those empty arrays (id and dia) disappear from the final array asanaLinks

// as the day I receive it from useSearchParams, and useParams transforms everything
//  that retrieves a string, the parseInt converts it into a number for comparison
