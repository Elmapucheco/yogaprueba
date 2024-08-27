import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
} from "react";
import music from "../../assets/audio.wav";

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

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && isPlaying) {
        stopAudio();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlaying]);

  useEffect(() => {
    const handleEnded = () => {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    };

    audioRef.current.addEventListener("ended", handleEnded);
    return () => {
      audioRef.current.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <AudioContext.Provider value={{ playAudio, stopAudio, isPlaying }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  return useContext(AudioContext);
};
