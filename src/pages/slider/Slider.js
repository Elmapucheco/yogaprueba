import React, { useState, createContext, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.css";
import { useSliderArray } from "../slider/SliderArrayContext";

import { Link } from "react-router-dom";

const SliderComponent = () => {
  const images = useSliderArray();
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    className: "",
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true, // Activar el autoplay
    autoplaySpeed: 3000, // Intervalo de cambio de imagen en milisegundos (por ejemplo, 3000ms = 3 segundos)
    prevArrow: null, // Ocultar la flecha anterior
    nextArrow: null, // Ocultar la flecha siguiente
  };

  return (
    <div className="slider-container">
      <div className="slider-header">
        <h3 className="slider-header-title">Choose your class</h3>
      </div>
      <Link
        className="link-slider"
        to={`/slider/gallery`}
        state={{
          images,
        }}
      >
        See all
      </Link>
      <Slider {...settings}>
        {images.map((image, index) => (
          <Link
            to={`/slider/info/${index}`}
            key={index}
            state={{
              title: image.title,
              img: image.img,
              sequence: image.sequence,
              images,
            }}
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
