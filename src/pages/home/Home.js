import React from "react";
import SliderComponent from "../../pages/slider/Slider";
import Challenge from "../../pages/Challenge/Challenge";
import HomeWellness from "../CorporateWellness/HomeWellness";
import "./home.css";
import { useDarkMode } from "../../components/Context/DarkMode";

function Home() {
  const { darkMode } = useDarkMode();
  return (
    <div className={`home ${darkMode ? "dark" : ""}`}>
      <SliderComponent />
      <Challenge />
      <HomeWellness />
    </div>
  );
}

export default Home;
