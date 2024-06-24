import React, { useEffect, useState } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaMusic } from "react-icons/fa";
import { useAudio } from "../../../components/MusicPlayer";
import info from "../../../assets/info.png";
import Breathe from "../../../components/Breathe/Breathe";
import { useDarkMode } from "../../../components/DarkMode";
import "./sliderInfo.css";

const SliderInfo = () => {
  const { darkMode } = useDarkMode();
  const location = useLocation();
  const { sequence, title, img, images } = location.state;
  const params = useParams();
  const index = params.index;
  const [asanaDetails, setAsanaDetails] = useState([]);
  const { isPlaying, stopAudio, playAudio } = useAudio();

  useEffect(() => {
    const fetchAsanas = async () => {
      try {
        const response = await fetch(
          "https://yoga-api-nzy4.onrender.com/v1/poses"
        );
        const data = await response.json();

        let filteredAsanas;

        if (sequence) {
          filteredAsanas = data.filter((asana) =>
            sequence.includes(asana.english_name)
          );
        }

        const orderedAsanas = sequence
          ? sequence.map((asanaName) =>
              filteredAsanas.find((asana) => asana.english_name === asanaName)
            )
          : filteredAsanas;

        setAsanaDetails(orderedAsanas);
      } catch (error) {
        console.error("Error fetching asana details:", error);
      }
    };

    fetchAsanas();
  }, [sequence]);

  if (!asanaDetails || asanaDetails.length === 0) {
    return (
      <div>
        <h1 className="sliderInfo-loading">Loading...</h1>
        <Breathe className="breathe" />
      </div>
    );
  }

  return (
    <div className={`sliderInfo-container ${darkMode ? "dark" : ""}`}>
      <div className="sliderInfo-portada">
        <div className="sliderInfo-day-iconBack">
          <Link to="/slider/gallery" state={{ images }}>
            <IoMdArrowRoundBack />
          </Link>
          <FaMusic
            className="music-icon"
            onClick={isPlaying ? stopAudio : playAudio}
          />
          <h1>{title}</h1>
          <img src={img} />
          <p>
            Here is your sequence! Take a look at the poses and begin your
            practice.
          </p>
        </div>
      </div>
      <div className="sliderInfo-day-sequence">
        <div className="sliderInfo-asana-container">
          {asanaDetails.map((asana, index) => (
            <Link to={`/poses-list/${asana.english_name}`} key={index}>
              <div className="sliderInfo-asana">
                <div className="sliderInfo-asana-img-contenedor">
                  <img
                    src={asana.url_png}
                    alt={`Asana ${index + 1}`}
                    className="sliderInfo-asana-img"
                  />
                  <span className="sliderInfo-asana-name">
                    {asana.english_name}
                  </span>
                </div>

                <img className="sliderInfo-info-icon" src={info} alt="Info" />
              </div>
            </Link>
          ))}
        </div>
        <Link
          to={`/slider/info/${index}/play`}
          state={{ asanaDetails }}
          className="sliderInfo-start-button"
        >
          Start
        </Link>
      </div>
    </div>
  );
};

export default SliderInfo;
