import { useState, useRef, useEffect } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import asana from "../../assets/asana.png";
import book from "../../assets/book.png";
import home from "../../assets/home.png";
import account from "../../assets/account.png";
import asanadark from "../../assets/asanadark.png";
import bookdark from "../../assets/bookdark.png";
import homedark from "../../assets/homedark.png";
import accountdark from "../../assets/accountdark.png";
import { useDarkMode } from "../../components/Context/DarkMode";
import { useSlider } from "../../components/Context/SliderContext";

const NavBar = () => {
  const classes = useSlider();
  const [isOpenLessons, setIsOpenLessons] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const { darkMode } = useDarkMode();
  const menuInfoRef = useRef();
  const menuLessonRef = useRef();
  const lessonRef = useRef();
  const infoRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuLessonRef.current &&
        !menuLessonRef.current.contains(e.target) &&
        e.target !== lessonRef.current
      ) {
        setIsOpenLessons(false);
      }
      if (
        menuInfoRef.current &&
        !menuInfoRef.current.contains(e.target) &&
        e.target !== infoRef.current
      ) {
        setIsOpenInfo(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={`NavBar ${darkMode ? "dark" : ""}`}>
      <div className="icons">
        <Link to="/" className="icon-container icon-container-link icon-home">
          <img src={darkMode ? homedark : home} className="icon" />
          <p>Home</p>
        </Link>
        <div
          onClick={() => setIsOpenLessons(!isOpenLessons)}
          className="icon-container"
        >
          <img
            src={darkMode ? asanadark : asana}
            className="icon"
            ref={lessonRef}
          />
          <p>Practice</p>
          {isOpenLessons && (
            <div ref={menuLessonRef} className="practice-dropdown">
              <ul>
                <Link to="/slider/gallery" state={{ classes }}>
                  Classes
                </Link>
                <Link to="/challengeGallery">Challenge</Link>

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
          <img
            src={darkMode ? bookdark : book}
            className="icon"
            ref={infoRef}
          />
          <p>Info</p>
          {isOpenInfo && (
            <div ref={menuInfoRef} className="info-dropdown">
              <ul>
                <Link to="/favorites">Favorites</Link>
                <Link to="/poses-list">Poses</Link>
                <Link to="/program">Program</Link>
                <Link to="/app-info"> App Info</Link>
              </ul>
            </div>
          )}
        </div>
        <Link to="/login" className="icon-container icon-container-link">
          <img src={darkMode ? accountdark : account} className="icon" />
          <p>Log In</p>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
