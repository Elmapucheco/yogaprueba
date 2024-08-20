import React from "react";
import pic from "../../../assets/pic.JPG";
import "./appInfo.css";
import { useDarkMode } from "../../../components/Context/DarkMode";

const photoCredits = [
  {
    name: "kike vega",
    profileLink:
      "https://unsplash.com/es/@kikekiks?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    photoLink:
      "https://unsplash.com/es/fotos/fotografia-de-silueta-de-mujer-haciendo-yoga-F2qh3yjz6Jk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    source: "Unsplash",
  },
  {
    name: "Ginny Rose Stewart",
    profileLink:
      "https://unsplash.com/es/@ginnyrose?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    photoLink:
      "https://unsplash.com/es/fotos/mujer-con-camiseta-negra-sin-mangas-y-pantalones-negros-doblando-su-cuerpo-en-el-suelo-UxkcSzRWM2s?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    source: "Unsplash",
  },
  {
    name: "Sweetyoga Justine",
    profileLink:
      "https://unsplash.com/es/@sweetyogajustine?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    photoLink:
      "https://unsplash.com/es/fotos/gato-atigrado-naranja-acostado-en-una-cama-azul-0u5NV27igKM?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    source: "Unsplash",
  },
  {
    name: "Shashi Chaturvedula",
    profileLink:
      "https://unsplash.com/es/@thephotographermom?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    photoLink:
      "https://unsplash.com/es/fotos/mujer-con-vestido-floral-marron-y-blanco-EyklrWNBxSM?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    source: "Unsplash",
  },
  {
    name: "Keith Misner",
    profileLink:
      "https://unsplash.com/es/@keithmisner?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    photoLink:
      "https://unsplash.com/es/fotos/tablero-de-madera-marron-h0Vxgz5tyXA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    source: "Unsplash",
  },
  {
    name: "Olivia Bauso",
    profileLink:
      "https://unsplash.com/es/@ohhbee?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    photoLink:
      "https://unsplash.com/es/fotos/mujer-con-camiseta-negra-sin-mangas-y-leggings-negros-haciendo-yoga-hWgsxV_VQW0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    source: "Unsplash",
  },
  {
    name: "Olivia Bauso",
    profileLink:
      "https://unsplash.com/es/@ohhbee?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    photoLink:
      "https://unsplash.com/es/fotos/mujer-en-sujetador-floral-blanco-y-negro-y-pantalones-negros-arrodillada-sobre-esterilla-de-yoga-rosa-6LMRstrUWUE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    source: "Unsplash",
  },
  {
    name: "Avrielle Suleiman",
    profileLink:
      "https://unsplash.com/es/@elleirva?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    photoLink:
      "https://unsplash.com/es/fotos/mujer-con-camisa-negra-sentada-en-esterilla-de-yoga-verde-GpVak9-cL6E?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    source: "Unsplash",
  },
  {
    name: "Scott Broome",
    profileLink:
      "https://unsplash.com/es/@scottbroomephotography?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    photoLink:
      "https://unsplash.com/es/fotos/hombre-haciendo-yoga-en-el-porche-cuOHHP5tx5g?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash",
    source: "Unsplash",
  },
  {
    name: "Polina Tankilevitch",
    profileLink:
      "https://www.pexels.com/es-es/foto/mujer-fitnes-fitness-ejercicio-6739040/",
    photoLink:
      "https://www.pexels.com/es-es/foto/mujer-fitnes-fitness-ejercicio-6739040/",
    source: "Pexels",
  },
];

function AppInfo() {
  const { darkMode } = useDarkMode();

  const handlePortfolioClick = () => {
    window.location.href = "https://portfoliogabriel.netlify.app";
  };

  return (
    <div className={`app-info-container ${darkMode ? "dark" : ""}`}>
      <div id="profile">
        <div className="profile-pic">
          <img src={pic} alt="" />
        </div>
        <div className="text-section">
          <p className="section-header">Hi, I'm</p>
          <h1 className="title">Gabriel Ayilef</h1>
          <h3 className="subtitle">Frontend Developer</h3>
          <p className=".text-container">
            This app showcases my first venture into the world of frontend
            development.
          </p>

          <button className="btn-info" onClick={handlePortfolioClick}>
            Visit portfolio
          </button>
        </div>
      </div>
      <div className="credits">
        <div className="credits1">
          <h3>Acknowledgment</h3>
          <p>
            Special thanks to{" "}
            <a
              href="https://github.com/alexcumplido"
              target="_blank"
              rel="noopener noreferrer"
            >
              Alex Cumplido
            </a>{" "}
            for providing the Yoga API.
          </p>
          <br></br>
          <h3>Icon Credits</h3>
          <ul>
            <li>React Icons</li>
            <li>Flaticon</li>
            <li>Favicon</li>
          </ul>
        </div>
        <div className="credits2">
          <h3>Photo Credits</h3>
          <ul>
            {photoCredits.map((photo, index) => (
              <li key={index}>
                Photo by{" "}
                <a
                  href={photo.profileLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {photo.name}
                </a>{" "}
                on{" "}
                <a
                  href={photo.photoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {photo.source}
                </a>
                .
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AppInfo;
