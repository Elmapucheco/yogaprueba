import React, { useEffect, useRef, useState } from "react";
import "./breathe.css";
import { useDarkMode } from "../Context/DarkMode";

const Breathe = () => {
  const containerRef = useRef(null);
  const [text, setText] = useState("Breathe In!");
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const totalTime = 7500;
    const breatheTime = 3000;
    const holdTime = 1500;
    //   el totaltime se define para el intervalo al final,
    //   los otros dos para establecer  los settimeout.Entonces en el return se define un ref
    // y como siempre con ref usare un useEffect.Por convencion la funcion comenzara con un if para asegurarme
    //  que al momento del useeffect el ref ya este existiendo, (es decir que el dom ya se haya renderizado)
    //   y ahi comienza la respiracion y los sucesivos settimeout.Una vez declarada la funcion, finalmente puedo llamarla,
    // generar el intervalo, y como return del useeffect la limpieza de todo para evitar fugas de memoria
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
  );
};

export default Breathe;
