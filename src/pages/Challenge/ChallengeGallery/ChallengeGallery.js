import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "./challengeGallery.css";
import pic from "../../../assets/challengeDayPic.jpg";
import arrow from "../../../assets/right-arrow.png";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import cup from "../../../assets/cup-of-tea.png";
import cupdark from "../../../assets/teadark.png";
import Breathe from "../../../components/Breathe/Breathe";
import { useDarkMode } from "../../../components/Context/DarkMode";

function ChallengeGallery() {
  const [allPoses, setAllPoses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sequences, setSequences] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const { darkMode } = useDarkMode();

  // Cargar favoritos desde localStorage
  useEffect(() => {
    const favoritosGuardados =
      JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(favoritosGuardados);
  }, []);

  const toggleFavorito = (dia) => {
    const nuevosFavoritos = favoritos.includes(dia)
      ? favoritos.filter((favorito) => favorito !== dia)
      : [...favoritos, dia];

    setFavoritos(nuevosFavoritos);
    localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
  };

  // Obtener todas las posturas y categorías
  useEffect(() => {
    async function fetchAllPoses() {
      try {
        const beginnerResponse = await fetch(
          "https://yoga-api-nzy4.onrender.com/v1/poses?level=beginner"
        );
        const intermediateResponse = await fetch(
          "https://yoga-api-nzy4.onrender.com/v1/poses?level=intermediate"
        );
        const categoryResponse = await fetch(
          "https://yoga-api-nzy4.onrender.com/v1/categories"
        );

        const [beginnerData, intermediateData, categories] = await Promise.all([
          beginnerResponse.json(),
          intermediateResponse.json(),
          categoryResponse.json(),
        ]);

        const allPoses = beginnerData.poses.concat(intermediateData.poses);
        setAllPoses(allPoses);
        setCategories(categories);
      } catch (error) {
        console.error("Error fetching all poses:", error);
        setAllPoses([]);
        setCategories([]);
      }
    }

    fetchAllPoses();
  }, []);

  // Crear un mapa de categorías
  const categoryMap = useMemo(() => {
    const mapping = new Map();
    categories.forEach((category) => {
      category.poses.forEach((pose) => {
        mapping.set(pose.id, category.category_name);
      });
    });
    return mapping;
  }, [categories]);

  // Generar secuencias y almacenarlas en localStorage
  useEffect(() => {
    async function fetchAndGenerateSequences(allPoses, categoryMap) {
      try {
        const sequencesArray = [];

        for (let i = 1; i <= 30; i++) {
          if (i % 5 === 0) {
            sequencesArray.push({ id: i, dia: i, restingDay: true });
          } else {
            const sequenceReal = sequencePerDay(i, allPoses, categoryMap);
            sequencesArray.push({ id: i, ...sequenceReal });
          }
        }

        localStorage.setItem("sequences", JSON.stringify(sequencesArray));
        setSequences(sequencesArray); // Actualizar el estado aquí
      } catch (error) {
        console.error("Error generating sequences:", error);
        setSequences([]); // En caso de error, retornar un array vacío
      }
    }

    const storedSequences = localStorage.getItem("sequences");
    if (storedSequences) {
      setSequences(JSON.parse(storedSequences));
    } else if (allPoses.length > 0 && categories.length > 0) {
      fetchAndGenerateSequences(allPoses, categoryMap);
    }
  }, [allPoses, categories, categoryMap]);

  // La función para generar una secuencia diaria
  function sequencePerDay(day, allPoses, categoryMap) {
    const eachSequence = {
      dia: day,
      seated: getRandomPosesByCategory("Seated Yoga", 1, allPoses, categoryMap),
      standing: getRandomPosesByCategory(
        "Standing Yoga",
        4,
        allPoses,
        categoryMap
      ),
      backbend: getRandomPosesByCategory(
        "Backbend Yoga",
        1,
        allPoses,
        categoryMap
      ),
      forwardBend: getRandomPosesByCategory(
        "Forward Bend Yoga",
        1,
        allPoses,
        categoryMap
      ),
      balancing: getRandomPosesByCategory(
        "Balancing Yoga",
        1,
        allPoses,
        categoryMap
      ),
      restorative: [allPoses.find((pose) => pose.english_name === "Corpse")],
    };

    return eachSequence;
  }

  // La función para obtener posturas al azar por categoría
  function getRandomPosesByCategory(
    categoryName,
    count,
    allPoses,
    categoryMap
  ) {
    const posesInCategory = allPoses.filter(
      (pose) => categoryMap.get(pose.id) === categoryName
    );

    if (posesInCategory.length < count) {
      console.warn(
        `No hay suficientes posturas en la categoría "${categoryName}". Se solicitaron ${count}, pero solo hay ${posesInCategory.length}.`
      );
      return posesInCategory;
    }

    const selectedPoses = new Set();
    while (selectedPoses.size < count) {
      const randomIndex = Math.floor(Math.random() * posesInCategory.length);
      selectedPoses.add(posesInCategory[randomIndex]);
    }

    return Array.from(selectedPoses);
  }

  // Renderización del componente
  if (!sequences || sequences.length === 0) {
    return (
      <div>
        <h1 className="challenge-loading">Loading...</h1>
        <Breathe className="challenge-breathe" />
      </div>
    );
  }

  return (
    <div className={`challengeGallery-container ${darkMode ? "dark" : ""}`}>
      <div className="challengeGallery-header">
        <h1>
          30 <span className="highlight">Yoga Days</span> Challenge
        </h1>
        <img src={pic} alt="Challenge Day Pic" />
        <p>Experience the benefits of consistent practice</p>
      </div>

      <div className="challenge-sequence-list">
        {sequences.map((sequence) => (
          <div className="sequence-card" key={sequence.id}>
            {sequence.restingDay ? (
              <>
                <h2 className="resting-number">
                  Day {sequence.dia} - Resting Day
                </h2>
                <img
                  src={darkMode ? cupdark : cup}
                  alt="Cup of Tea"
                  className="next-icon"
                />
              </>
            ) : (
              <>
                <div className="check-go">
                  <h2>Day {sequence.dia}</h2>
                  {favoritos.includes(sequence.dia) ? (
                    <MdFavorite
                      className="favorito-activo"
                      onClick={() => toggleFavorito(sequence.dia)}
                    />
                  ) : (
                    <MdFavoriteBorder
                      className="challenge-favorites"
                      onClick={() => toggleFavorito(sequence.dia)}
                    />
                  )}
                </div>
                <Link
                  className="sequence-link"
                  to={`/challengeGallery/${sequence.dia}`}
                  state={sequences}
                >
                  <img src={arrow} alt="Right Arrow" className="next-icon" />
                </Link>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChallengeGallery;
