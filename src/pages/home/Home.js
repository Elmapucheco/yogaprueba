import React from "react";
import SliderComponent from "../../pages/slider/Slider";
import Challenge from "../../pages/Challenge/Challenge";
import HomeWellness from "../CorporateWellness/HomeWellness";
import "./home.css";

function Home() {
  return (
    <div className="home">
      <SliderComponent />
      <Challenge />
      <HomeWellness />
    </div>
  );
}

export default Home;
