import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import nextIcon from "../../../assets/nextPlay.png";
import backIcon from "../../../assets/backPlay.png";
import nextIcondark from "../../../assets/nextPlaydark.png";
import backIcondark from "../../../assets/backPlaydark.png";
import pause from "../../../assets/pause.png";
import pausedark from "../../../assets/pausedark.png";
import exit from "../../../assets/exit.png";
import play from "../../../assets/play.png";
import playdark from "../../../assets/playdark.png";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import Confetti from "react-confetti";
import bell from "../../../assets/bell.wav";
import "./sliderPlay.css";
import { useDarkMode } from "../../../components/Context/DarkMode";

const asanaDuration = 30;

const bellAudio = new Audio(bell);

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

const SliderPlay = () => {
  const { darkMode } = useDarkMode();
  const containerRef = useRef(null);
  const location = useLocation();
  const { asanaDetails } = location.state;
  const [isPaused, setIsPaused] = useState(false);
  const [currentAsanaIndex, setCurrentAsanaIndex] = useState(0);
  const [key, setKey] = useState(0); // Añadimos un estado para reiniciar el temporizador
  const [isPreparing, setIsPreparing] = useState(true); // Estado para el temporizador de preparación
  const [prepTime, setPrepTime] = useState(5); // Estado para el temporizador de preparación
  const [showModal, setShowModal] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const navigate = useNavigate();

  const goBack = () => {
    setShowModal(true); // Mostrar el modal de confirmación
  };

  const handleConfirm = () => {
    setShowModal(false);
    navigate(-1);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const processedAsanas = asanaDetails.flatMap((asana) => {
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
    const breatheInTime = 3000; // 3 segundos para "breathe in"
    const breatheOutTime = 3000; // 3 segundos para "breathe out"

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

    breathAnimation(); // Ejecutar inmediatamente

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

  if (processedAsanas.length === 0) {
    return <div className="challenge-play-container">Sequence not found</div>;
  }

  const handleNext = () => {
    if (currentAsanaIndex < processedAsanas.length - 1) {
      setCurrentAsanaIndex(currentAsanaIndex + 1);
      setIsPreparing(true); // Reiniciar preparación
      setPrepTime(5); // Reiniciar el tiempo de preparación
      setKey((prevKey) => prevKey + 1);
    }
  };

  const handleBack = () => {
    if (currentAsanaIndex > 0) {
      setCurrentAsanaIndex(currentAsanaIndex - 1);
      setIsPreparing(true); // Reiniciar preparación
      setPrepTime(5); // Reiniciar el tiempo de preparación
      setKey((prevKey) => prevKey + 1);
    }
  };
  const isFirstAsana = currentAsanaIndex === 0;
  const isLastAsana = currentAsanaIndex === processedAsanas.length - 1;
  const handlePause = () => {
    setIsPaused(!isPaused);
  };

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
                  colors={["#1c7b8a", "#1c707d", "#196672", "#175d68"]}
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

export default SliderPlay;
