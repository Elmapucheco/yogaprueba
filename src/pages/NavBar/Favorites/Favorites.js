import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "./favorites.css";
import next from "../../../assets/next.png";
import nextdark from "../../../assets/nextdark.png";
import cat from "../../../assets/cat.jpg";
import { MdDelete } from "react-icons/md";
import { useDarkMode } from "../../../components/Context/DarkMode";

function Favorites() {
  const [favoritos, setFavoritos] = useState([]);
  const [sequences, setSequences] = useState([]);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(storedFavorites);
  }, []);

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

  const removeFavorite = useCallback(
    (dia) => {
      const updatedFavoritos = favoritos.filter((favorito) => favorito !== dia);
      setFavoritos(updatedFavoritos);
      localStorage.setItem("favoritos", JSON.stringify(updatedFavoritos));
    },
    [favoritos]
  );

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
                <MdDelete
                  className="favorites-delete"
                  onClick={() => removeFavorite(sequence.dia)}
                />
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

// The first thing the component does is bring in the favorites from localStorage.
// The second thing is to bring the sequences that ChallengeGallery previously saved in
//   LocalStorage.If favorites exist, it is because favorites were previously selected in
//   ChallengeGallery and therefore the information was already processed and saved in
//     localStorage.That is to say, it is understood that both data exist if the user chose a favorite.
// Once obtained, it is iterated with filter over sequences in search of matches in
//   sequence.dia with the favorites, which is the data stored in localStorage.
// removeFavorites is called from the delete button and with a sequence.dia argument.Already in
//   the function, a filter will check that the new array created DOES NOT contain that day, and
//   subsequently saves the updated version in localStorage
// useCallback in React memorizes functions to improve performance by avoiding
// unnecessary recreations on each render, thus optimizing data flow and component efficiency.
