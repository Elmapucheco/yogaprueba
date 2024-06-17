import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "../../slider/SliderPlay/sliderPlay.css";
import nextIcon from "../../../assets/nextPlay.png";
import backIcon from "../../../assets/backPlay.png";
import pauseIcon from "../../../assets/pausePlay.png";
import playIcon from "../../../assets/play-button.png";
import exit from "../../../assets/exit.png";
import ConfirmModal from "../../../components/Modal/ConfirmModal";
import Confetti from "react-confetti";

const ChallengePlay = () => {
  const containerRef = useRef(null);
  const location = useLocation();
  const { daySequence } = location.state;
  const { dia } = useParams();
  const [isPaused, setIsPaused] = useState(false);
  const [currentAsanaIndex, setCurrentAsanaIndex] = useState(0);
  const [key, setKey] = useState(0);
  const [isPreparing, setIsPreparing] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [prepTime, setPrepTime] = useState(5);
  const navigate = useNavigate();
  const asanaDuration = 30;
  const [showModal, setShowModal] = useState(false);

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

  useEffect(() => {
    document.body.classList.add("no-padding");
    return () => {
      document.body.classList.remove("no-padding");
    };
  }, []);
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

  const allAsanas = [
    ...daySequence.seated,
    ...daySequence.standing,
    ...daySequence.backbend,
    ...daySequence.forwardBend,
    ...daySequence.balancing,
    ...daySequence.restorative,
  ];

  const processedAsanas = allAsanas.flatMap((asana) => {
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
    if (!isPreparing) {
      handleNext();
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

  if (processedAsanas.length === 0) {
    return (
      <div className="challenge-play-container">
        No se encontró la secuencia para reproducir
      </div>
    );
  }

  return (
    <div className="sliderplay-container">
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
            src={backIcon}
            alt="Back"
            className="sliderplay-icon sliderplay-icon-left"
            onClick={handleBack}
          />
        )}
        {!isLastAsana && (
          <img
            src={nextIcon}
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
            src={isPaused ? playIcon : pauseIcon}
            alt={isPaused ? "Play" : "Pause"}
            onClick={handlePause}
          />
        </div>
      </div>
      <ConfirmModal
        show={showModal}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default ChallengePlay;

//   return (
//     <div className="challenge-play-container">
//       <div className="challenge-play-content">
//         * <img
//           src={backIcon}
//           alt="Back"
//           className="challenge-play-icon challenge-play-icon-left"
//           onClick={handleBack}
//         />
//         <div className="challenge-play-main">
//           <img
//             src={currentAsana.url_png}
//             alt={`Asana ${currentAsanaIndex + 1}`}
//             className="challenge-play-image"
//           />
//           {isPreparing && <div className="preparation-timer">{prepTime}</div>}
//           <span className="challenge-play-asana-name">
//             {currentAsana.english_name} ({currentAsana.sanskrit_name}){" "}
//             {currentAsana.side && `(${currentAsana.side})`}
//           </span>
//           {!isPreparing && (
//             <CountdownCircleTimer
//               key={key}
//               isPlaying={!isPaused}
//               duration={asanaDuration}
//               colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
//               colorsTime={[asanaDuration, 0]}
//               onComplete={() => handleTimerExpire()}
//               size={100}
//             >
//               {({ remainingTime }) => (
//                 <div className="countdown-timer-text">{remainingTime}</div>
//               )}
//             </CountdownCircleTimer>
//           )}
//         </div>
//         <img
//           src={nextIcon}
//           alt="Next"
//           className="challenge-play-icon challenge-play-icon-right"
//           onClick={handleNext}
//         />
//         <img
//           src={pauseIcon}
//           alt="Pause"
//           className="challenge-play-icon challenge-play-icon-pause"
//           onClick={handlePause}
//         />
//       </div>
//     </div>
//   );
// };

// export default ChallengePlay;
