import React from "react";
import "./wellnessProgram.css";
const WellnessProgram = () => {
  return (
    <div className="wellness-program">
      {/* <h1 className="wellness-title">
        Yoga for a <span>Healthy Life</span>
      </h1> */}
      <h3>Boost your team's well-being with our Employee Yoga Program!</h3>
      <p className="wellness-description">
        Harmony Yoga Institut is excited to offer an initiative designed to help
        your employees to cultivate a focused mind while enjoying the physical
        benefits of yoga.
        <br />
        Through our Employee Yoga Program, your team will get access to 4
        different yoga sessions and choose the one that best fits their current
        needs.
      </p>

      <div className="program-list">
        <ul>
          <li>Raka 1</li>
          <li>Raka 2</li>
          <li>Raka 3</li>
          <li>Raka 4</li>
        </ul>
      </div>
      <div className="wellness-video-container">
        <iframe
          title="Yoga Video"
          src="https://www.youtube.com/embed/Qr0p2fW1zcQ"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default WellnessProgram;
