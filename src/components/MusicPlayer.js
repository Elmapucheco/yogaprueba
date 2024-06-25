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
  //   new Audio estoy creando una nueva instancia del objeto audio de js,
  //     le asigno el archivo de audio y de esta manera tendre acceso a
  //     los metodos e informacion necesaria para mis condicionales
  //
  // audio.play();

  // audio.pause();

  // audio.volume = 0.5; // 50% del volumen

  // // Escuchar el evento de finalización
  // audio.addEventListener('ended', () => {
  //   console.log('El audio ha terminado de reproducirse.');
  // });
  //     )
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

  //  los cambios false o true de los estados no son mas que para llevar
  //  seguimiento de lo que va pasando y posibles condicionales, son los metodos
  //   del objeto Audio los que manipulan el archivo de audio
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
  // La propiedad visibilityState del document indica el estado de visibilidad de la página. Los valores posibles son:
  // "visible": La página está visible para el usuario.
  // "hidden": La página no está visible para el usuario

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

// el provider esta destinado a englobar componentes y brindarles la
//  posibilidad de usar su logica y funciones.El useContext es lo
//  que les da acceso a esas funcionalidades, por lo que el provider englobara componentes, y quienes
//  hagan uso , importaran el useContext
