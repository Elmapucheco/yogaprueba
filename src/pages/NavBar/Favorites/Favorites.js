import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./favorites.css";
import Breathe from "../../../components/Breathe/Breathe";
import next from "../../../assets/next.png";
import cat from "../../../assets/cat.jpg";
import { MdDelete } from "react-icons/md";

function Favorites() {
  const [favoritos, setFavoritos] = useState([]);
  const [sequences, setSequences] = useState([]);

  useEffect(() => {
    const favoritosGuardados =
      JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(favoritosGuardados);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const { allPoses, categories } = await fetchAllPoses();
        const sequences = await fetchAndGenerateSequences(allPoses, categories);
        setSequences(sequences);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();

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
        return { allPoses, categories };
      } catch (error) {
        console.error("Error fetching all poses:", error);
        return { allPoses: [], categories: [] };
      }
    }

    async function fetchAndGenerateSequences(allPoses, categories) {
      try {
        const categoryMap = new Map();
        categories.forEach((category) => {
          category.poses.forEach((pose) => {
            categoryMap.set(pose.id, category.category_name);
          });
        });

        const sequences = [];
        for (let i = 1; i <= 30; i++) {
          const sequence = generateSequence(i, allPoses, categoryMap);
          sequences.push({ id: i, ...sequence });
        }

        return sequences;
      } catch (error) {
        console.error("Error generating sequences:", error);
        return [];
      }
    }

    function generateSequence(day, allPoses, categoryMap) {
      const sequence = {
        dia: day,
        seated: getRandomPosesByCategory(
          "Seated Yoga",
          1,
          allPoses,
          categoryMap
        ),
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

      return sequence;
    }

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
  }, []);

  if (favoritos.length === 0) {
    return <div>There are no favorite days marked.</div>;
  }

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
    <div className="favorites-container">
      <div className="favorites-header">
        <h1>Favorite Challenge Days</h1>
        <img className="favorites-img" src={cat} />
        <p>Here is your selection</p>
      </div>

      <div className="favorites-sequence-list">
        {favoriteSequences.map((sequence, index) => (
          <div className="favorites-sequence-card" key={index}>
            <div className="favorites-check-go">
              <h2 className="favorites-day-number">Day {sequence.dia}</h2>
              {favoritos.includes(sequence.dia) ? (
                <MdDelete
                  className="favorites-activo"
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
              <img src={next} alt="Next icon" className="favorites-next-icon" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
