import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./slidergallery.css";

const SliderGallery = () => {
  const location = useLocation();
  const { images } = location.state;

  const classes = images.map((classItem, index) => {
    return (
      <div key={index} className="slider-gallery-container">
        <Link
          to={`/slider/info/${index}`}
          key={index}
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
              <img src={classItem.img} alt="Imagen 1" />
            </div>
            <p>{classItem.description}</p>
          </div>
        </Link>
      </div>
    );
  });

  return classes;
};

export default SliderGallery;
