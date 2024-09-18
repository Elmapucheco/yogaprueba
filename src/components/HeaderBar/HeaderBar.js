import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import tools from "../../assets/tools.png";
import toolsdark from "../../assets/toolsdark.png";
import logo from "../../assets/logo.jpg";
import logodark from "../../assets/logodark.jpg";
import "./headerBar.css";
import Toggle from "./Toggle";
import { useDarkMode } from "../Context/DarkMode";
import { useAudio } from "../Context/MusicPlayer";

function HeaderBar() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { isPlaying, handleMusicToggle } = useAudio();

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();
  const iconRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        e.target !== iconRef.current
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);
  function handleOpen() {
    setIsOpen(!isOpen);
  }
  return (
    <nav className={`headerbar-container ${darkMode ? "dark" : ""}`}>
      <Link to="/">
        <img
          src={darkMode ? logodark : logo}
          alt="Logo"
          className="icon-logo-home"
        />
      </Link>
      <div className="headerbar-settings">
        <img
          src={darkMode ? toolsdark : tools}
          ref={iconRef}
          onClick={handleOpen}
          alt="Settings"
        />
        {isOpen && (
          <div className="tools-dropdown" ref={menuRef}>
            <ul>
              <li className="toggle-container">
                <span>Dark Mode</span>
                <Toggle
                  className="toggle"
                  checked={darkMode}
                  onChange={toggleDarkMode}
                />
              </li>
              <li className="toggle-container">
                <span>Music</span>
                <Toggle
                  className="toggle"
                  checked={isPlaying}
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
