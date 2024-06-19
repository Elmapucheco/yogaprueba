import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./slidergallery.css";
import { useDarkMode } from "../../../components/DarkMode";

const SliderGallery = () => {
  const { darkMode } = useDarkMode();
  const location = useLocation();
  const { images } = location.state;

  return (
    <div className={`slider-gallery-container ${darkMode ? "dark" : ""}`}>
      {images.map((classItem, index) => (
        <div key={index}>
          <Link
            to={`/slider/info/${index}`}
            state={{
              sequence: classItem.sequence,
              img: classItem.img,
              title: classItem.title,
              images: images,
            }}
          >
            <div className="slider-gallery-wrapper">
              <div className="img-gallery">
                <h2>{classItem.title}</h2>
                <img src={classItem.img} alt={`Imagen ${index + 1}`} />
              </div>

              <p>{classItem.description}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SliderGallery;
