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
    duration: "8 min",
    sequence: [
      "Cat",
      "Downward-Facing Dog",
      "Crescent Lunge",
      "Chair",
      "Warrior One",
      "Warrior Two",
      "Tree",
      "Bridge",
      "Standing Forward Bend",
      "Corpse",
    ],
    description:
      "A gentle and energizing yoga session to start your day with mindfulness and vitality.",
  },
  {
    img: gara1,
    title: "Upper Body Yoga",
    duration: "7 min",
    sequence: [
      "Downward-Facing Dog",
      "Plank",
      "Side Plank",
      "Upward-Facing Dog",
      "Crescent Lunge",
      "Bow",
      "Forward Bend with Shoulder Opener",
      "Camel",
      "Standing Forward Bend",
      "Corpse",
    ],
    description:
      "A focused sequence designed to stretch the upper body, improving posture and relieving tension.",
  },
  {
    img: gara,
    title: "Relaxing Yoga",
    duration: "7 min",
    sequence: [
      "Butterfly",
      "Cat",
      "Cow",
      "Seated Forward Bend",
      "Low Lunge",
      "Garland Pose",
      "Forward Bend with Shoulder Opener",
      "Triangle",
      "Bridge",
      "Corpse",
    ],
    description:
      "A soothing yoga session aimed at reducing stress and promoting deep relaxation and inner calm.",
  },
  {
    img: gara3,
    title: "Yoga for Begginers",
    duration: "8 min",
    sequence: [
      "Cat",
      "Cow",
      "Upward-Facing Dog",
      "Downward-Facing Dog",
      "Chair",
      "Triangle",
      "Warrior Two",
      "Tree",
      "Butterfly",
      "Corpse",
    ],
    description:
      "A beginner-friendly sequence of asanas designed to teach fundamental poses.",
  },
  {
    img: gara4,
    title: "Strengthening Yoga",
    duration: "8 min",
    sequence: [
      "Plank",
      "Side Plank",
      "Chair",
      "Warrior One",
      "Warrior Two",
      "Warrior Three",
      "Boat",
      "Bridge",
      "Crow",
      "Corpse",
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
