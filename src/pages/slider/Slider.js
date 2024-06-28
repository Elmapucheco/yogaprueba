import React, { useState, createContext, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.css";
import { useSlider } from "../../components/Context/SliderContext";
import { useDarkMode } from "../../components/Context/DarkMode";
import { Link } from "react-router-dom";

const SliderComponent = () => {
  const classes = useSlider();
  const { darkMode } = useDarkMode();
  const settings = {
    className: "",
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className={`slider-container ${darkMode ? "dark" : ""}`}>
      <div className="slider-header">
        <h3 className="slider-header-title">Choose your class</h3>
      </div>
      <Link
        className="link-slider"
        to={`/slider/gallery`}
        state={{
          classes,
        }}
      >
        See all
      </Link>
      <Slider {...settings}>
        {classes.map((image, index) => (
          <Link
            to={`/slider/info/${index}`}
            key={index}
            state={{
              title: image.title,
              img: image.img,
              sequence: image.sequence,
              classes,
            }}
            className="slide-link"
          >
            <div className="slide-wrapper">
              <img src={image.img} alt={`Slide ${index + 1}`} />
              <h3>{image.title}</h3>
              <p>{image.duration}</p>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
