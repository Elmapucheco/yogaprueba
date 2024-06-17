import React, { useEffect, useRef, useState } from "react";
import "./breathe.css";

const Breathe = () => {
  const containerRef = useRef(null);
  const [text, setText] = useState("Breathe In!");

  useEffect(() => {
    const totalTime = 7500;
    const breatheTime = (totalTime / 5) * 2;
    const holdTime = totalTime / 5;

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

    breathAnimation();
    const interval = setInterval(breathAnimation, totalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="body-breath">
      <div className="container-breathe" ref={containerRef}>
        <div className="circle"></div>
        <p>{text}</p>
        <div className="pointer-container">
          <span className="pointer"></span>
        </div>
        <div className="gradient-circle"></div>
      </div>
    </div>
  );
};

export default Breathe;
