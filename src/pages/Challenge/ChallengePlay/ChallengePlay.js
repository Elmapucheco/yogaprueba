import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "../../slider/SliderPlay/sliderPlay.css";
import nextIcon from "../../../assets/nextPlay.png";
import backIcon from "../../../assets/backPlay.png";
import nextIcondark from "../../../assets/nextPlaydark.png";
import backIcondark from "../../../assets/backPlaydark.png";
import pause from "../../../assets/pause.png";
import pausedark from "../../../assets/pausedark.png";
import play from "../../../assets/play.png";
import playdark from "../../../assets/playdark.png";
import exit from "../../../assets/exit.png";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import { useDarkMode } from "../../../components/Context/DarkMode";
import Confetti from "react-confetti";
import bell from "../../../assets/bell.wav";

const bellAudio = new Audio(bell);

const asanaDuration = 30;

const asanasToRepeat = [
  "Crescent Lunge",
  "Eagle",
  "Extended Side Angle",
  "Half-Moon",
  "King Pigeon",
  "Pyramid",
  "Reverse Warrior",
  "Side Plank",
  "Tree",
  "Wild Thing",
  "Low Lunge",
  "Triangle",
  "Warrior One",
  "Warrior Two",
];

const ChallengePlay = () => {
  const { darkMode } = useDarkMode();
  const containerRef = useRef(null);
  const location = useLocation();
  const { asanaLinks } = location.state;
  const [isPaused, setIsPaused] = useState(false);
  const [currentAsanaIndex, setCurrentAsanaIndex] = useState(0);
  const [key, setKey] = useState(0);
  const [isPreparing, setIsPreparing] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [prepTime, setPrepTime] = useState(5);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const goBack = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    navigate(-1);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const processedAsanas = asanaLinks.flatMap((asana) => {
    if (asanasToRepeat.includes(asana.english_name)) {
      return [
        { ...asana, side: "Right side" },
        { ...asana, side: "Left side" },
      ];
    }
    return [asana];
  });

  const currentAsana = processedAsanas[currentAsanaIndex];

  useEffect(() => {
    const breatheInTime = 3000;
    const breatheOutTime = 3000;

    const breathAnimation = () => {
      if (containerRef.current) {
        containerRef.current.className = "sliderplay-image grow";

        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.className = "sliderplay-image shrink";
          }
        }, breatheInTime);
      }
    };

    const interval = setInterval(
      breathAnimation,
      breatheInTime + breatheOutTime
    );

    breathAnimation();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timer;
    if (isPreparing && !isPaused) {
      if (prepTime > 0) {
        timer = setTimeout(() => {
          setPrepTime(prepTime - 1);
        }, 1000);
      } else {
        setIsPreparing(false);
        setPrepTime(5);
      }
    }
    return () => clearTimeout(timer);
  }, [isPreparing, prepTime, isPaused]);

  const isFirstAsana = currentAsanaIndex === 0;
  const isLastAsana = currentAsanaIndex === processedAsanas.length - 1;

  const handleTimerExpire = () => {
    bellAudio.play();
    if (!isPreparing) {
      setTimeout(() => {
        handleNext();
      }, 2000);
    }
    if (currentAsanaIndex === processedAsanas.length - 1) {
      setIsFinished(true);

      setTimeout(() => {
        navigate(-1);
      }, 5000);
    }
  };

  const handleBack = () => {
    if (currentAsanaIndex > 0) {
      setCurrentAsanaIndex(currentAsanaIndex - 1);
      setIsPreparing(true);
      setPrepTime(5);
      setKey((prevKey) => prevKey + 1);
    }
  };

  const handleNext = () => {
    if (currentAsanaIndex < processedAsanas.length - 1) {
      setCurrentAsanaIndex(currentAsanaIndex + 1);
      setIsPreparing(true);
      setPrepTime(5);
      setKey((prevKey) => prevKey + 1);
    }
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  if (asanaLinks.length === 0) {
    return (
      <div className="challenge-play-container">
        No se encontró la secuencia para reproducir
      </div>
    );
  }

  return (
    <div className={`sand ${darkMode ? "dark" : ""}`}>
      <div className={`sliderplay-container ${darkMode ? "dark" : ""}`}>
        {isFinished && <Confetti />}
        <div className="sliderPlay-header">
          <img
            src={exit}
            alt="Back"
            className="sliderplay-exit"
            onClick={goBack}
          />
          <span className="sliderplay-name">
            {currentAsana.english_name}{" "}
            {currentAsana.side && `(${currentAsana.side})`}
          </span>
        </div>
        <div className="sliderplay-main">
          {!isFirstAsana && (
            <img
              src={darkMode ? backIcondark : backIcon}
              alt="Back"
              className="sliderplay-icon sliderplay-icon-left"
              onClick={handleBack}
            />
          )}
          {!isLastAsana && (
            <img
              src={darkMode ? nextIcondark : nextIcon}
              alt="Next"
              className="sliderplay-icon sliderplay-icon-right"
              onClick={handleNext}
            />
          )}
          <img
            ref={containerRef}
            src={currentAsana.url_png}
            alt={`Asana ${currentAsanaIndex + 1}`}
            className="sliderplay-image"
          />
        </div>
        <div className="sliderplay-counter">
          <div>
            {isPreparing ? (
              <div className="sliderplay-preparation-timer">{prepTime}</div>
            ) : (
              <div className="sliderplay-cowntdown-wrapper">
                <CountdownCircleTimer
                  key={key} // Usamos el key para reiniciar el temporizador
                  isPlaying={!isPaused}
                  duration={asanaDuration}
                  colors={["#01497c", "#2c7da0", "#468faf", "#61a5c2"]}
                  colorsTime={[asanaDuration, 0]}
                  onComplete={handleTimerExpire}
                  size={90}
                >
                  {({ remainingTime }) => (
                    <div className="sliderplay-countdown-text">
                      {remainingTime}
                    </div>
                  )}
                </CountdownCircleTimer>
              </div>
            )}
          </div>
          <div className="sliderplay-icon-pause">
            <img
              src={
                isPaused
                  ? darkMode
                    ? playdark
                    : play
                  : darkMode
                  ? pausedark
                  : pause
              }
              alt={isPaused ? "Play" : "Pause"}
              onClick={handlePause}
            />
          </div>
        </div>
        {showModal && (
          <ConfirmModal onConfirm={handleConfirm} onCancel={handleCancel} />
        )}
      </div>
    </div>
  );
};

export default ChallengePlay;
