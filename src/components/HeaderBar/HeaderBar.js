import React, { useState, useRef, useEffect } from "react";
import tools from "../../assets/tools.png";
import logo from "../../assets/logo.jpg";
import musicFile from "../../assets/audio.wav";
import "./headerBar.css";
import Toggle from "./Toggle";

function HeaderBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [musicOn, setMusicOn] = useState(false);

  const menuRef = useRef();
  const iconRef = useRef();
  const audioRef = useRef(new Audio(musicFile));

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        e.target !== iconRef.current
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleMusicToggle = () => {
    setMusicOn((prev) => {
      if (prev) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      } else {
        audioRef.current.play();
      }
      return !prev;
    });
  };

  const handleDarkModeToggle = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    const handleEnded = () => {
      if (musicOn) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    };

    audioRef.current.addEventListener("ended", handleEnded);
    return () => {
      audioRef.current.removeEventListener("ended", handleEnded);
    };
  }, [musicOn]);

  useEffect(() => {
    const handlePause = () => {
      audioRef.current.currentTime = 0;
    };

    audioRef.current.addEventListener("pause", handlePause);
    return () => {
      audioRef.current.removeEventListener("pause", handlePause);
    };
  }, []);

  return (
    <nav className="headerbar-container">
      <img src={logo} alt="Logo" />

      <div className="headerbar-settings">
        <img
          src={tools}
          ref={iconRef}
          onClick={() => setIsOpen(!isOpen)}
          alt="Settings"
        />
        {isOpen && (
          <div
            className="tools-dropdown"
            style={{ position: "absolute", zIndex: 100 }}
            ref={menuRef}
          >
            <ul>
              <li className="toggle-container">
                <span>Dark Mode</span>
                <Toggle
                  className="toggle"
                  checked={darkMode}
                  onChange={handleDarkModeToggle}
                />
              </li>
              <li className="toggle-container">
                <span>Music</span>
                <Toggle
                  className="toggle"
                  checked={musicOn}
                  onChange={handleMusicToggle}
                />
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default HeaderBar;
