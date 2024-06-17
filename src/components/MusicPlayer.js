// MusicPlayer.js
import React, { useEffect, useState, useRef } from "react";
import { FaMusic } from "react-icons/fa";
import musicFile from "../assets/audio.wav";

const MusicPlayer = () => {
  const audioRef = useRef(new Audio(musicFile));
  const [musicOn, setMusicOn] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Verificar si hay música activada en localStorage al cargar el componente
    const savedState = localStorage.getItem("musicOn");
    if (savedState) {
      setMusicOn(JSON.parse(savedState));
    }

    // Establecer el evento 'ended' para reiniciar la música cuando finaliza
    const handleEnded = () => {
      if (musicOn) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((error) => {
          console.error("Failed to restart audio:", error);
        });
      }
    };
    audioRef.current.addEventListener("ended", handleEnded);

    // Limpiar el event listener al desmontar el componente
    return () => {
      audioRef.current.removeEventListener("ended", handleEnded);
    };
  }, [musicOn]);

  // Manejar el clic en el ícono de música
  const handleMusicToggle = () => {
    if (!hasInteracted) {
      setHasInteracted(true); // Marcar que el usuario ha interactuado con el reproductor
    }

    setMusicOn((prev) => {
      const newState = !prev;
      if (newState) {
        // Intentar iniciar la reproducción de audio si está activada
        audioRef.current.play().catch((error) => {
          console.error("Failed to start audio:", error);
        });
      } else {
        // Pausar la reproducción si está desactivada
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      localStorage.setItem("musicOn", JSON.stringify(newState));
      return newState;
    });
  };

  return <FaMusic className="music-icon" onClick={handleMusicToggle} />;
};

export default MusicPlayer;
