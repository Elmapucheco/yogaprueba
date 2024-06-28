import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SharedLayout from "./pages/sharedLayout/SharedLayout";
import Home from "./pages/home/Home";
import SliderPlay from "./pages/slider/SliderPlay/SliderPlay";
import SliderGallery from "./pages/slider/SliderGallery/SliderGallery";
import SliderInfo from "./pages/slider/SliderInfo/SliderInfo";
import ChallengeGallery from "./pages/Challenge/ChallengeGallery/ChallengeGallery";
import ChallengeDay from "./pages/Challenge/ChallengeDay/ChallengeDay";
import ChallengePlay from "./pages/Challenge/ChallengePlay/ChallengePlay";
import Favorites from "./pages/NavBar/Favorites/Favorites";
import PosesList from "./pages/NavBar/asanas/PosesList";
import PoseDetail from "./pages/NavBar/asanas/PoseDetail";
import WellnessProgram from "./pages/CorporateWellness/WellnessPage/WellnessProgram";
import AppInfo from "./pages/NavBar/AppInfo/AppInfo";
import LogIn from "./pages/NavBar/LogIn/LogIn";
import Error from "./pages/Error/Error";
import Breathe from "../src/components/Breathe/Breathe";
import SplashScreen from "./pages/SplashScreen/SplashScreen";
import { useDarkMode } from "../src/components/Context/DarkMode";
import { AudioProvider } from "./components/Context/MusicPlayer";

function App() {
  const [isLoading, setLoading] = useState(true);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [darkMode]);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <AudioProvider>
      <Router>
        <div className={` ${darkMode ? "dark-mode" : ""}`}>
          <Routes>
            <Route path="/" element={<SharedLayout />}>
              <Route index element={<Home />} />
              <Route path="slider/info/:index" element={<SliderInfo />} />
              <Route path="slider/gallery" element={<SliderGallery />} />
              <Route path="challengeGallery" element={<ChallengeGallery />} />
              <Route path="challengeGallery/:dia" element={<ChallengeDay />} />
              <Route path="program" element={<WellnessProgram />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="poses-list" element={<PosesList />} />
              <Route path="poses-list/:name" element={<PoseDetail />} />
              <Route path="app-info" element={<AppInfo />} />
              <Route path="login" element={<LogIn />} />
              <Route path="breathe" element={<Breathe />} />
              <Route path="*" element={<Error />} />
            </Route>

            <Route path="/slider/info/:index/play" element={<SliderPlay />} />
            <Route
              path="/challengeGallery/:dia/play"
              element={<ChallengePlay />}
            />
          </Routes>
        </div>
      </Router>
    </AudioProvider>
  );
}

export default App;
