import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "./challengeGallery.css";
import pic from "../../../assets/challengeDayPic.jpg";
import arrow from "../../../assets/right-arrow.png";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md"; // Importa ambos iconos
import cup from "../../../assets/cup-of-tea.png";
import Breathe from "../../../components/Breathe/Breathe";

function ChallengeGallery() {
  const [allPoses, setAllPoses] = useState([]); // aquí modifiqué
  const [categories, setCategories] = useState([]); // aquí modifiqué
  const [sequences, setSequences] = useState([]); // aquí modifiqué
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const favoritosGuardados =
      JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(favoritosGuardados);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const { allPoses, categories } = await fetchAllPoses();
        setAllPoses(allPoses); // aquí modifiqué
        setCategories(categories); // aquí modifiqué
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
  }, []);

  // UseMemo para el mapeo de categorías
  const categoryMap = useMemo(() => {
    const map = new Map();
    categories.forEach((category) => {
      category.poses.forEach((pose) => {
        map.set(pose.id, category.category_name);
      });
    });
    return map;
  }, [categories]); // aquí modifiqué

  // UseEffect para la generación de secuencias
  useEffect(() => {
    if (allPoses.length === 0 || categories.length === 0) return;

    async function generateSequences() {
      const sequences = await fetchAndGenerateSequences(allPoses, categoryMap);
      setSequences(sequences);
    }

    generateSequences();
  }, [allPoses, categories, categoryMap]); // aquí modifiqué

  async function fetchAndGenerateSequences(allPoses, categoryMap) {
    try {
      const sequences = [];

      for (let i = 1; i <= 30; i++) {
        if (i % 5 === 0) {
          sequences.push({ id: i, dia: i, restingDay: true });
        } else {
          const sequence = generateSequence(i, allPoses, categoryMap);
          sequences.push({ id: i, ...sequence });
        }
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
        <h1 className="challenge-loading">Loading...</h1>
        <Breathe className="challenge-breathe" />
      </div>
    );
  }

  return (
    <>
      <div className="challengeallery-container">
        <div className="challengeGallery-header">
          <h1>
            30 <span className="highlight">Yoga Days</span> Challenge
          </h1>
          <img src={pic} alt="Challenge Day Pic" />
          <p>Experience the benefits of consistent practice</p>
        </div>
      </div>

      <div className="challenge-sequence-list">
        {sequences.map((sequence) => (
          <div className="sequence-card" key={sequence.id}>
            {sequence.restingDay ? (
              <>
                <h2 className="resting-number">
                  Day {sequence.dia} - Resting Day
                </h2>
                <img src={cup} alt="Cup of Tea" className="next-icon" />
              </>
            ) : (
              <>
                <div className="check-go">
                  <h2 className="day-number">Day {sequence.dia}</h2>
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
    </>
  );
}

export default ChallengeGallery;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "./challengeGallery.css";
// import pic from "../../../assets/challengeDayPic.jpg";
// import arrow from "../../../assets/right-arrow.png";
// import { MdFavoriteBorder, MdFavorite } from "react-icons/md"; // Importa ambos iconos
// import cup from "../../../assets/cup-of-tea.png";
// import Breathe from "../../../components/Breathe/Breathe";

// function ChallengeGallery() {
// const [sequences, setSequences] = useState([]);
// const [favoritos, setFavoritos] = useState([]);

// useEffect(() => {
// const favoritosGuardados =
// JSON.parse(localStorage.getItem("favoritos")) || [];
// setFavoritos(favoritosGuardados);
// }, []);

// useEffect(() => {
// async function fetchData() {
// try {
// const { allPoses, categories } = await fetchAllPoses();
// const sequences = await fetchAndGenerateSequences(allPoses, categories);
// setSequences(sequences);
// } catch (error) {
// console.error("Error fetching data:", error);
// }
// }

// javascript
// Copiar código
// fetchData();

// async function fetchAllPoses() {
//   try {
//     const beginnerResponse = await fetch(
//       "https://yoga-api-nzy4.onrender.com/v1/poses?level=beginner"
//     );
//     const intermediateResponse = await fetch(
//       "https://yoga-api-nzy4.onrender.com/v1/poses?level=intermediate"
//     );
//     const categoryResponse = await fetch(
//       "https://yoga-api-nzy4.onrender.com/v1/categories"
//     );

//     const [beginnerData, intermediateData, categories] = await Promise.all([
//       beginnerResponse.json(),
//       intermediateResponse.json(),
//       categoryResponse.json(),
//     ]);

//     const allPoses = beginnerData.poses.concat(intermediateData.poses);
//     return { allPoses, categories };
//   } catch (error) {
//     console.error("Error fetching all poses:", error);
//     return { allPoses: [], categories: [] };
//   }
// }
// }, []);

// async function fetchAndGenerateSequences(allPoses, categories) {
// try {
// const categoryMap = new Map();
// categories.forEach((category) => {
// category.poses.forEach((pose) => {
// categoryMap.set(pose.id, category.category_name);
// });
// });

// php
// Copiar código
//   const sequences = [];

//   for (let i = 1; i <= 30; i++) {
//     if (i % 5 === 0) {
//       sequences.push({ id: i, dia: i, restingDay: true });
//     } else {
//       const sequence = generateSequence(i, allPoses, categoryMap);
//       sequences.push({ id: i, ...sequence });
//     }
//   }

//   return sequences;
// } catch (error) {
//   console.error("Error generating sequences:", error);
//   return [];
// }
// }

// function generateSequence(day, allPoses, categoryMap) {
// const sequence = {
// dia: day,
// seated: getRandomPosesByCategory("Seated Yoga", 2, allPoses, categoryMap),
// standing: getRandomPosesByCategory(
// "Standing Yoga",
// 4,
// allPoses,
// categoryMap
// ),
// backbend: getRandomPosesByCategory(
// "Backbend Yoga",
// 1,
// allPoses,
// categoryMap
// ),
// forwardBend: getRandomPosesByCategory(
// "Forward Bend Yoga",
// 1,
// allPoses,
// categoryMap
// ),
// balancing: getRandomPosesByCategory(
// "Balancing Yoga",
// 1,
// allPoses,
// categoryMap
// ),
// restorative: [allPoses.find((pose) => pose.english_name === "Corpse")],
// };

// kotlin
// Copiar código
// return sequence;
// }

// function getRandomPosesByCategory(
// categoryName,
// count,
// allPoses,
// categoryMap
// ) {
// const posesInCategory = allPoses.filter(
// (pose) => categoryMap.get(pose.id) === categoryName
// );

// javascript
// Copiar código
// if (posesInCategory.length < count) {
//   console.warn(
//     `No hay suficientes posturas en la categoría "${categoryName}". Se solicitaron ${count}, pero solo hay ${posesInCategory.length}.`
//   );
//   return posesInCategory;
// }

// const selectedPoses = new Set();

// while (selectedPoses.size < count) {
//   const randomIndex = Math.floor(Math.random() * posesInCategory.length);
//   selectedPoses.add(posesInCategory[randomIndex]);
// }

// return Array.from(selectedPoses);
// }

// const toggleFavorito = (dia) => {
// const nuevosFavoritos = favoritos.includes(dia)
// ? favoritos.filter((favorito) => favorito !== dia)
// : [...favoritos, dia];

// javascript
// Copiar código
// setFavoritos(nuevosFavoritos);
// localStorage.setItem("favoritos", JSON.stringify(nuevosFavoritos));
// };

// if (!sequences || sequences.length === 0) {
// return (
// <div>
// <h1 className="challenge-loading">Loading...</h1>
// <Breathe className="challenge-breathe" />
// </div>
// );
// }

// return (
// <>
// <div className="challengeallery-container">
// <div className="challengeGallery-header">
// <h1>
// 30 <span className="highlight">Yoga Days</span> Challenge
// </h1>
// <img src={pic} alt="Challenge Day Pic" />
// <p>Experience the benefits of consistent practice</p>
// </div>
// </div>

// php
// Copiar código
//   <div className="challenge-sequence-list">
//     {sequences.map((sequence) => (
//       <div className="sequence-card" key={sequence.id}>
//         {sequence.restingDay ? (
//           <>
//             <h2 className="resting-number">
//               Day {sequence.dia} - Resting Day
//             </h2>
//             <img src={cup} alt="Cup of Tea" className="next-icon" />
//           </>
//         ) : (
//           <>
//             <div className="check-go">
//               <h2 className="day-number">Day {sequence.dia}</h2>
//               {favoritos.includes(sequence.dia) ? (
//                 <MdFavorite
//                   className="favorito-activo"
//                   onClick={() => toggleFavorito(sequence.dia)}
//                 />
//               ) : (
//                 <MdFavoriteBorder
//                   className="challenge-favorites"
//                   onClick={() => toggleFavorito(sequence.dia)}
//                 />
//               )}
//             </div>
//             <Link
//               className="sequence-link"
//               to={`/challengeGallery/${sequence.dia}`}
//               state={sequences}
//             >
//               <img src={arrow} alt="Right Arrow" className="next-icon" />
//             </Link>
//           </>
//         )}
//       </div>
//     ))}
//   </div>
// </>
// );
// }

// export default ChallengeGallery;
