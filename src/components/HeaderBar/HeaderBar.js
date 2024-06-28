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
  const { isPlaying, playAudio, stopAudio } = useAudio();
  const [isOpen, setIsOpen] = useState(false);

  // detectamos un click en algun lado y llamamos a la funcion para que nos asegure
  //  donde ocurrio ese click, porque si ocurrio por fuera de donde mi menuRef detecta,
  //   y no esta relacionado con el icono, entonces cambiaremos el estado a falso y
  //    acto seguido removeremos el detector de evento para que una vez que cierre el dropdown no escuche clicks indefinidamente
  // Usar ref en React es una práctica común para acceder a elementos del DOM de
  //  manera similar a como se hace con getElementById en JavaScript tradicional.
  // .current.contains se usa para contenedores grandes, para el icono puedo directamente comparar
  // *.current es una cuestion sintactica
  //   * El hecho de chequear que menuRef.current existe antes de chequear si contiene al Event,
  //     es porque el dropdown a veces puede estar cerrado.El icono en cambio esta siempre
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
          onClick={() => setIsOpen(!isOpen)}
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
                  onChange={toggleDarkMode} /*porque no es setDarkMode?*/
                />
              </li>
              <li className="toggle-container">
                <span>Music</span>
                <Toggle
                  className="toggle"
                  checked={isPlaying}
                  onChange={handleMusicToggle}
                  // ambas opciones del toggle activan funciones declaradas en los componentes importados
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
