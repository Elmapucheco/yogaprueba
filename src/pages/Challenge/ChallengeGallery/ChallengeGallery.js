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
  const [favorites, setFavorites] = useState([]);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    async function fetchAllPoses() {
      try {
        const [beginnerResponse, intermediateResponse, categoryResponse] =
          await Promise.all([
            fetch("https://yoga-api-nzy4.onrender.com/v1/poses?level=beginner"),
            fetch(
              "https://yoga-api-nzy4.onrender.com/v1/poses?level=intermediate"
            ),
            fetch("https://yoga-api-nzy4.onrender.com/v1/categories"),
          ]);

        const [beginnerData, intermediateData, categories] = await Promise.all([
          beginnerResponse.json(),
          intermediateResponse.json(),
          categoryResponse.json(),
        ]);

        const allPoses = [...beginnerData.poses, ...intermediateData.poses];

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

  const categoryMap = useMemo(() => {
    const mapping = new Map();
    categories.forEach((category) => {
      category.poses.forEach((pose) => {
        mapping.set(pose.id, category.category_name);
      });
    });

    return mapping;
  }, [categories]);

  function getRandomPosesByCategory(categoryName, count) {
    const posesInCategory = allPoses.filter(
      (pose) => categoryMap.get(pose.id) === categoryName
    );

    if (posesInCategory.length < count) {
      console.warn(
        `There are not enough positions in the category "${categoryName}".${count}were requested, but there are only ${posesInCategory.length}.`
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

  function sequencePerDay(day) {
    const eachSequence = {
      dia: day,
      seated: getRandomPosesByCategory("Seated Yoga", 1),
      standing: getRandomPosesByCategory("Standing Yoga", 4),
      backbend: getRandomPosesByCategory("Backbend Yoga", 1),
      forwardBend: getRandomPosesByCategory("Forward Bend Yoga", 1),
      balancing: getRandomPosesByCategory("Balancing Yoga", 1),
      restorative: [allPoses.find((pose) => pose.english_name === "Corpse")],
    };

    return eachSequence;
  }

  useEffect(() => {
    async function fetchAndGenerateSequences() {
      try {
        const sequencesArray = [];

        for (let i = 1; i <= 30; i++) {
          if (i % 5 === 0) {
            sequencesArray.push({ id: i, dia: i, restingDay: true });
          } else {
            const sequenceReal = sequencePerDay(i);
            sequencesArray.push({ id: i, ...sequenceReal });
          }
        }

        localStorage.setItem("sequences", JSON.stringify(sequencesArray));
        setSequences(sequencesArray);
      } catch (error) {
        console.error("Error generating sequences:", error);
        setSequences([]);
      }
    }

    const storedSequences = localStorage.getItem("sequences");
    if (storedSequences) {
      setSequences(JSON.parse(storedSequences));
    } else if (allPoses.length > 0 && categories.length > 0) {
      fetchAndGenerateSequences();
    }
  }, [allPoses, categories, categoryMap]);

  // Favorites section

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavorites(savedFavorites);
  }, []);

  function toggleFavorite(dia) {
    const newFavorites = favorites.includes(dia)
      ? favorites.filter((favorito) => favorito !== dia)
      : [...favorites, dia];

    setFavorites(newFavorites);
    localStorage.setItem("favoritos", JSON.stringify(newFavorites));
  }

  if (!sequences || sequences.length === 0) {
    return (
      <div>
        <h1 className="challenge-loading">Loading...</h1>
        <Breathe className="challenge-breathe" delay={10000} />
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
                  {favorites.includes(sequence.dia) ? (
                    <MdFavorite
                      className="favorito-activo"
                      onClick={() => toggleFavorite(sequence.dia)}
                    />
                  ) : (
                    <MdFavoriteBorder
                      className="challenge-favorites"
                      onClick={() => toggleFavorite(sequence.dia)}
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
