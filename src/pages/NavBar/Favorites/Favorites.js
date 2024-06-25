import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./favorites.css";
import Breathe from "../../../components/Breathe/Breathe";
import next from "../../../assets/next.png";
import nextdark from "../../../assets/nextdark.png";
import cat from "../../../assets/cat.jpg";
import { MdDelete } from "react-icons/md";
import { useDarkMode } from "../../../components/DarkMode";

function Favorites() {
  const [favoritos, setFavoritos] = useState([]);
  const [sequences, setSequences] = useState([]);
  const { darkMode } = useDarkMode();

  // Cargar favoritos desde localStorage
  useEffect(() => {
    const favoritosGuardados =
      JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(favoritosGuardados);
  }, []);

  // Cargar secuencias desde localStorage
  useEffect(() => {
    const storedSequences = JSON.parse(localStorage.getItem("sequences"));
    if (storedSequences) {
      setSequences(storedSequences);
    } else {
      console.error("No sequences found in localStorage.");
    }
  }, []);

  const favoriteSequences = sequences.filter((sequence) =>
    favoritos.includes(sequence.dia)
  );

  const toggleFavorito = (dia) => {
    const nuevosFavoritos = favoritos.includes(dia)
      ? favoritos.filter((favorito) => favorito !== dia)
      : [...favoritos, dia];

    setFavoritos(nuevosFavoritos);
    localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
  };

  if (!sequences || sequences.length === 0) {
    return (
      <div>
        <h1 className="favorites-loading">Loading...</h1>
        <Breathe className="favorites-breathe" />
      </div>
    );
  }

  return (
    <div className={`favorites-container ${darkMode ? "dark" : ""}`}>
      <div className="favorites-header">
        <h1>Favorite Challenge Days</h1>
        <img className="favorites-img" src={cat} alt="Cat" />
        <p>Enjoy your selection</p>
      </div>
      {favoritos.length === 0 ? (
        <div className="no-favorites-container">
          <h2 className="no-favorites">
            You haven't chosen favorites yet.
            <br /> You can do it on{" "}
          </h2>
          <Link to="/challengeGallery" className="link-button">
            30 Days Yoga Challenge
          </Link>
        </div>
      ) : (
        <div className="favorites-sequence-list">
          {favoriteSequences.map((sequence, index) => (
            <div className="favorites-sequence-card" key={index}>
              <div className="favorites-check-go">
                <h2 className="favorites-day-number">Day {sequence.dia}</h2>
                {favoritos.includes(sequence.dia) ? (
                  <MdDelete
                    className="favorites-delete"
                    onClick={() => toggleFavorito(sequence.dia)}
                  />
                ) : (
                  <div onClick={() => toggleFavorito(sequence.dia)} />
                )}
              </div>

              <Link
                className="favorites-sequence-link"
                to={`/challengeGallery/${sequence.dia}`}
                state={sequences}
              >
                <img
                  src={darkMode ? nextdark : next}
                  alt="Next icon"
                  className="favorites-next-icon"
                />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
