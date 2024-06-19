// HeaderBar.js
import React, { useRef, useEffect, useState } from "react";
import tools from "../../assets/tools.png";
import toolsdark from "../../assets/toolsdark.png";
import logo from "../../assets/logo.jpg";
import logodark from "../../assets/logodark.jpg";
import "./headerBar.css";
import Toggle from "./Toggle";
import { useDarkMode } from "../DarkMode";
import { useAudio } from "../MusicPlayer";

function HeaderBar() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { isPlaying, playAudio, stopAudio } = useAudio();
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef();
  const iconRef = useRef();

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
    if (isPlaying) {
      stopAudio();
    } else {
      playAudio();
    }
  };

  return (
    <nav className={`headerbar-container ${darkMode ? "dark" : ""}`}>
      <img src={darkMode ? logodark : logo} alt="Logo" />

      <div className="headerbar-settings">
        <img
          src={darkMode ? toolsdark : tools}
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
                  onChange={toggleDarkMode}
                />
              </li>
              <li className="toggle-container">
                <span>Music</span>
                <Toggle
                  className="toggle"
                  checked={isPlaying} // Usar el estado del contexto
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
