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
import bell from "../../../assets/bell.wav";

import { CountdownCircleTimer } from "react-countdown-circle-timer";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import Confetti from "react-confetti";

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
  const [isPreparing, setIsPreparing] = useState(true);
  const [prepTime, setPrepTime] = useState(5);
  const [key, setKey] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [currentAsanaIndex, setCurrentAsanaIndex] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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
  const isFirstAsana = currentAsanaIndex === 0;
  const isLastAsana = currentAsanaIndex === processedAsanas.length - 1;

  useEffect(() => {
    const breathAnimation = () => {
      if (containerRef.current) {
        containerRef.current.className = "sliderplay-image grow";

        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.className = "sliderplay-image shrink";
          }
        }, 3000);
      }
    };

    const interval = setInterval(breathAnimation, 6000);

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

  // if (processedAsanas.length === 0) {
  //   return <div className="challenge-play-container">Sequence not found</div>;
  // }

  const handleNext = () => {
    if (!isLastAsana) {
      setCurrentAsanaIndex(currentAsanaIndex + 1);
      setIsPreparing(true);
      setPrepTime(5);
      setKey((prevKey) => prevKey + 1);
    }
  };
  const handleBack = () => {
    if (!isFirstAsana) {
      setCurrentAsanaIndex(currentAsanaIndex - 1);
      setIsPreparing(true);
      setPrepTime(5);
      setKey((prevKey) => prevKey + 1);
    }
  };

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

    if (isLastAsana) {
      setIsFinished(true);

      setTimeout(() => {
        navigate(-1);
      }, 5000);
    }
  };

  return (
    <div className={`wood${darkMode ? " dark" : ""}`}>
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
                  key={key}
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

// The useRef will be used mainly to add a mark to the image and adding a class that makes it grow for 3
// seconds and return to its shape for the next 3.
// asanaDetails is retrieved with the location, and is mapped to processedAsanas to check if the sequence includes the
// asanasToRepeat, if so it is added to everything that the object has, the "side" key with right and left, which doubles
// the asana in the render.In order to allow next and previous, I generate currentAsana which will join the processedAsanas
// with the index of each one in the array.
// currentasanaindex is a state generated for the sole purpose of the interaction between next and previous.Without these processes,
//   I could skip it and directly use the processedAsanas as an end - to - end mapping.I declare it at 0 so that it starts from the first asana.
// isFirstAsana and isLastAsana will serve as conditional returns for the next and previous icons in both asanas.As well as f
// or the functions called by these icons.Like the handleTimerExpire in case it is the last position.
// I handle it like this at preparation time: I declare timer undefined, and there I check that basically the
// conditions are those that the component already has by default when it is rendered.If this happens, the following if,
//   and since preptime is 5 I advance and subtract 1 from every second, when it reaches 0 it goes through Else and
//   there I change the isPreparing to false and return to 5 in prepTime, finally I clean the timer on the outside of
//   the else, to ensure that the cleanUp is part of the useEffect and avoid strange behavior if it is executed again,
//   for example if the user presses Next and then isPreparing returns to true.
// Finally, key is a state that is basically generated with the intention of being updated.This happens in both
// handlenext and handleback, both incrementing it by 1, to always achieve a unique value and the basis is
//   in the CountDown timer, which needs which prop of the update of that value to restart.When React detects
//   that it was updated to a unique value, it mounts the component again
