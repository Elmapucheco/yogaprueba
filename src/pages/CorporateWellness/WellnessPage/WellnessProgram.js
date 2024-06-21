import React from "react";
import { Link } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import "./wellnessProgram.css";
import { useDarkMode } from "../../../components/DarkMode";

const WellnessProgram = () => {
  const { darkMode } = useDarkMode();
  return (
    <div className={`program-container ${darkMode ? "dark" : ""}`}>
      <h1>
        Boost your team's well-being with our{" "}
        <span className="span-program">Employee Yoga Program!</span>
      </h1>

      <p className="program-description">
        Harmony Yoga Institut is excited to offer an initiative designed to help
        your employees to cultivate a focused mind while enjoying the physical
        benefits of yoga.
      </p>
      <div className="video-list">
        <div className="program-video-container">
          <iframe
            title="Yoga Video"
            src="https://www.youtube.com/embed/Qr0p2fW1zcQ"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="program-list">
          <ul>
            <li>
              <GoDotFill />
              Yoga for Healthy Back
            </li>
            <li>
              <GoDotFill />
              Breath and Mindfulness
            </li>
            <li>
              <GoDotFill />
              Office Chair Yoga
            </li>
            <li>
              <GoDotFill />
              Yoganidra Relaxation
            </li>
          </ul>
        </div>
      </div>

      <p className="program-description">
        Through our Employee Yoga Program, your team will get access to 4
        different yoga sessions, available in Czech and English, and choose the
        one that best fits their current needs.
      </p>
      <Link to="/login" className="tologin-button">
        Sign In to Learn More
      </Link>
    </div>
  );
};

export default WellnessProgram;
