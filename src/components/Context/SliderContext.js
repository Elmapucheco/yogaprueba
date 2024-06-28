import React, { createContext, useContext } from "react";
import gara from "../../assets/slider.jpg";
import gara1 from "../../assets/slider1.jpg";
import gara2 from "../../assets/slider2.jpg";
import gara3 from "../../assets/slider3.jpg";
import gara4 from "../../assets/slider4.jpg";

const SliderContext = createContext([]);

const classes = [
  {
    img: gara2,
    title: "Morning Yoga",
    duration: "15 min",
    sequence: [
      "Cat",
      "Cow",
      "Downward-Facing Dog",
      "Crescent Lunge",
      "Forward Bend with Shoulder Opener",
      "Butterfly",
      "Tree",
      "Warrior One",
      "Bridge",
      "Corpse",
    ],
    description:
      "A gentle and energizing yoga session to start your day with mindfulness and vitality.",
  },
  {
    img: gara1,
    title: "Upper Body Yoga",
    duration: "16 min",
    sequence: [
      "Bridge",
      "Camel",
      "Bow",
      "Extended Side Angle",
      "Wild Thing",
      "Low Lunge",
      "Upward-Facing Dog",
      "Half Lord of the Fishes",
      "Cow",
      "Wheel",
    ],
    description:
      "A focused sequence designed to stretch the upper body, improving posture and relieving tension.",
  },
  {
    img: gara,
    title: "Relaxing Yoga",
    duration: "13 min",
    sequence: [
      "Butterfly",
      "Seated Forward Bend",
      "Corpse",
      "Sphinx",
      "Pigeon",
      "Sphinx",
      "Reverse Warrior",
      "Triangle",
      "Half Boat",
      "Extended Side Angle",
    ],
    description:
      "A soothing yoga session aimed at reducing stress and promoting deep relaxation and inner calm.",
  },
  {
    img: gara3,
    title: "Yoga for Begginers",
    duration: "16 min",
    sequence: [
      "Upward-Facing Dog",
      "Standing Forward Bend",
      "Downward-Facing Dog",
      "Warrior One",
      "Warrior Two",
      "Triangle",
      "Crescent Lunge",
      "Cat",
      "Bridge",
      "Corpse",
    ],
    description:
      "A beginner-friendly sequence of asanas designed to teach fundamental poses.",
  },
  {
    img: gara4,
    title: "Strengthening Yoga",
    duration: "17 min",
    sequence: [
      "Plank",
      "Dolphin",
      "Warrior Two",
      "Chair",
      "Boat",
      "Bridge",
      "Side Plank",
      "Low Lunge",
      "Upward-Facing Dog",
      "Crow",
    ],
    description:
      "A dynamic sequence of asanas designed to build full-body strength and endurance.",
  },
];

export const useSlider = () => useContext(SliderContext);

export const SliderProvider = ({ children }) => {
  return (
    <SliderContext.Provider value={classes}>{children}</SliderContext.Provider>
  );
};

// crea un contexto para que quienes esten envueltos en el provider tengan acceso a las funcionalidades
