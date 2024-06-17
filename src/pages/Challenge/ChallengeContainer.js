// import React, { useEffect, useState } from "react";
// import ChallengeGallery from "./ChallengeGallery/ChallengeGallery";

// export default function ChallengeContainer() {
//   const [sequences, setSequences] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const { allPoses, categories } = await fetchAllPoses();
//         const sequences = await fetchAndGenerateSequences(allPoses, categories);
//         setSequences(sequences);
//         console.log("Sequences:", sequences);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     }

//     fetchData();
//   }, []);

//   async function fetchAllPoses() {
//     try {
//       const beginnerResponse = await fetch(
//         "https://yoga-api-nzy4.onrender.com/v1/poses?level=beginner"
//       );
//       const intermediateResponse = await fetch(
//         "https://yoga-api-nzy4.onrender.com/v1/poses?level=intermediate"
//       );
//       const categoryResponse = await fetch(
//         "https://yoga-api-nzy4.onrender.com/v1/categories"
//       );

//       const [beginnerData, intermediateData, categories] = await Promise.all([
//         beginnerResponse.json(),
//         intermediateResponse.json(),
//         categoryResponse.json(),
//       ]);

//       const allPoses = beginnerData.poses.concat(intermediateData.poses);
//       return { allPoses, categories };
//     } catch (error) {
//       console.error("Error fetching all poses:", error);
//       return { allPoses: [], categories: [] };
//     }
//   }

//   async function fetchAndGenerateSequences(allPoses, categories) {
//     try {
//       const categoryMap = new Map();
//       categories.forEach((category) => {
//         category.poses.forEach((pose) => {
//           categoryMap.set(pose.id, category.category_name);
//         });
//       });

//       const sequences = [];

//       for (let i = 1; i <= 30; i++) {
//         const sequence = generateSequence(i, allPoses, categoryMap);
//         sequences.push(sequence);
//       }

//       return sequences;
//     } catch (error) {
//       console.error("Error generating sequences:", error);
//       return [];
//     }
//   }

//   function generateSequence(day, allPoses, categoryMap) {
//     const sequence = {
//       dia: day,
//       seated: getRandomPosesByCategory("Seated Yoga", 2, allPoses, categoryMap),
//       standing: getRandomPosesByCategory(
//         "Standing Yoga",
//         4,
//         allPoses,
//         categoryMap
//       ),
//       backbend: getRandomPosesByCategory(
//         "Backbend Yoga",
//         1,
//         allPoses,
//         categoryMap
//       ),
//       forwardBend: getRandomPosesByCategory(
//         "Forward Bend Yoga",
//         1,
//         allPoses,
//         categoryMap
//       ),
//       balancing: getRandomPosesByCategory(
//         "Balancing Yoga",
//         1,
//         allPoses,
//         categoryMap
//       ),
//       restorative: allPoses.find((pose) => pose.name === "Corpse"),
//     };

//     return sequence;
//   }

//   function getRandomPosesByCategory(
//     categoryName,
//     count,
//     allPoses,
//     categoryMap
//   ) {
//     const posesInCategory = allPoses.filter(
//       (pose) => categoryMap.get(pose.id) === categoryName
//     );

//     const selectedPoses = [];

//     for (let i = 0; i < count; i++) {
//       const randomIndex = Math.floor(Math.random() * posesInCategory.length);
//       selectedPoses.push(posesInCategory[randomIndex]);
//     }

//     return selectedPoses;
//   }

//   return <ChallengeGallery sequences={sequences} />;
// }
