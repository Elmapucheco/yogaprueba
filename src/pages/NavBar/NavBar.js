import { useState, useRef } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import asana from "../../assets/asana.png";
import book from "../../assets/book.png";
import home from "../../assets/home.png";
import account from "../../assets/account.png";

import { useSliderArray } from "../slider/SliderArrayContext";
const NavBar = () => {
  const images = useSliderArray();
  const [isOpenLessons, setIsOpenLessons] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);

  const menuInfoRef = useRef();
  const menuLessonRef = useRef();
  const lessonRef = useRef();
  const infoRef = useRef();
  window.addEventListener("click", (e) => {
    if (e.target !== menuLessonRef.current && e.target !== lessonRef.current) {
      setIsOpenLessons(false);
    }
  });
  window.addEventListener("click", (e) => {
    if (e.target !== menuInfoRef.current && e.target !== infoRef.current) {
      setIsOpenInfo(false);
    }
  });
  return (
    <div className="NavBar">
      <div className="icons">
        <Link to="/" className="icon-container icon-container-link">
          <img src={home} className="icon" />
          <p>Home</p>
        </Link>
        <div
          onClick={() => setIsOpenLessons(!isOpenLessons)}
          className="icon-container"
        >
          <img src={asana} className="icon" ref={lessonRef} />
          <p>Classes</p>
          {isOpenLessons && (
            <div ref={menuLessonRef} className="lessons-dropdown">
              <ul>
                <Link to="/slider/gallery" state={{ images }}>
                  Classes
                </Link>
                <Link to="/challengeGallery">Challenge</Link>
                <Link to="/program">Wellness</Link>
                <Link to="/breathe">Just breath</Link>
              </ul>
            </div>
          )}
        </div>
        <div
          onClick={() => setIsOpenInfo(!isOpenInfo)}
          className="icon-container"
        >
          <div></div>
          <img src={book} className="icon" ref={infoRef} />
          <p>Info</p>
          {isOpenInfo && (
            <div ref={menuInfoRef} className="info-dropdown">
              <ul>
                <Link to="/favorites">Favorites</Link>
                <Link to="/poses-list">Poses</Link>
                <Link to="/app-info"> App Info</Link>
              </ul>
            </div>
          )}
        </div>
        <Link to="/login" className="icon-container icon-container-link">
          <img src={account} className="icon" />
          <p>Log In</p>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
