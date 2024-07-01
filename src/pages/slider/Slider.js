import React from "react";
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

// I get the classes variable from the slidercontext with which I will do two things.
// Whether the user chooses SEE ALL, I will send the Classes state via link so that the
// child can use it in their logic.In the case of the slider, which has its own configuration in Settings,
//   I will map classes and for each item I will generate a Link to which I will send not only classes,
//   but also their components separately(this is so that if I choose to go BACK from the child,
//   I go to the gallery SEE ALL, which requires the entire Classes array for its logic, as
//      I did above in the link above.Finally, in the return I use the mapping info, not this
//      time to choose what to send to the children.but to see what I place in the render itself
