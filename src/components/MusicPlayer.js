import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
} from "react";
import music from "../assets/audio.wav";

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(new Audio(music));
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const stopAudio = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  // Controlar el audio cuando la visibilidad de la página cambia
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && isPlaying) {
        playAudio();
      } else {
        stopAudio();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlaying]);

  return (
    <AudioContext.Provider value={{ playAudio, stopAudio, isPlaying }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  return useContext(AudioContext);
};
