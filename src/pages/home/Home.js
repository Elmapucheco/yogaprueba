import React from "react";
import SliderComponent from "../../pages/slider/Slider";
import Challenge from "../../pages/Challenge/Challenge";
import HomeWellness from "../CorporateWellness/HomeWellness";
import "./home.css";
import { useDarkMode } from "../../components/DarkMode";

function Home() {
  const { darkMode } = useDarkMode();
  return (
    <div className={`home ${darkMode ? "dark-mode" : ""}`}>
      <SliderComponent />
      <Challenge />
      <HomeWellness />
    </div>
  );
}

export default Home;
