import React, { useEffect, useRef, useState } from "react";
import "./breathe.css";
import { useDarkMode } from "../Context/DarkMode";

const Breathe = ({ delay }) => {
  const containerRef = useRef(null);
  const [text, setText] = useState("Breathe In!");
  const { darkMode } = useDarkMode();
  const [isVisible, setIsVisible] = useState(!delay);

  useEffect(() => {
    const totalTime = 7500;
    const breatheTime = 3000;
    const holdTime = 1500;

    const breathAnimation = () => {
      if (containerRef.current) {
        setText("Breathe In!");
        containerRef.current.className = "container-breathe grow";

        setTimeout(() => {
          setText("Hold");

          setTimeout(() => {
            setText("Breathe Out!");
            if (containerRef.current) {
              containerRef.current.className = "container-breathe shrink";
            }
          }, holdTime);
        }, breatheTime);
      }
    };

    let interval;
    if (delay) {
      const timeout = setTimeout(() => {
        setIsVisible(true);
        setTimeout(breathAnimation, 0);
        interval = setInterval(breathAnimation, totalTime);
        return () => clearInterval(interval);
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      breathAnimation();
      interval = setInterval(breathAnimation, totalTime);
      return () => clearInterval(interval);
    }
  }, [delay]);

  return (
    isVisible && (
      <div className={`body-breath ${darkMode ? "dark" : ""}`}>
        <div className="container-breathe" ref={containerRef}>
          <div className="circle"></div>
          <p>{text}</p>
          <div className="pointer-container">
            <span className="pointer"></span>
          </div>
          <div className="gradient-circle"></div>
        </div>
      </div>
    )
  );
};

export default Breathe;
