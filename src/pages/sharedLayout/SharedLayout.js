import React from "react";
import NavBar from "../NavBar/NavBar";
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import { Outlet } from "react-router-dom";
import { SliderProvider } from "../../components/Context/SliderContext";

function SharedLayout() {
  return (
    <SliderProvider>
      <div>
        <HeaderBar />
        <Outlet />
        <NavBar />
      </div>
    </SliderProvider>
  );
}

export default SharedLayout;
