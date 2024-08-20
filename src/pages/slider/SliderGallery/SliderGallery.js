import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./slidergallery.css";
import { useDarkMode } from "../../../components/Context/DarkMode";
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import close from "../../../assets/exit.png";

const SliderGallery = () => {
  const { darkMode } = useDarkMode();
  const location = useLocation();
  const { classes } = location.state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    duration: "",
    description: "",
    title: "",
  });

  const openModal = (duration, description, title) => {
    setModalContent({ duration, description, title });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`slider-gallery-container ${darkMode ? "dark" : ""}`}>
      <div className="slider-grid">
        {classes.map((classItem, index) => (
          <div key={index} className="slider-gallery-item">
            <div className="slider-gallery-wrapper">
              <h2>{classItem.title}</h2>
              <img src={classItem.img} alt={`Imagen ${index + 1}`} />

              <Link
                to={`/slider/info/${index}`}
                state={{
                  sequence: classItem.sequence,
                  img: classItem.img,
                  title: classItem.title,
                  classes: classes,
                }}
              >
                <FaPlay className="icon-play" />
              </Link>
              <FaInfoCircle
                className="icon-info"
                onClick={() =>
                  openModal(
                    classItem.duration,
                    classItem.description,
                    classItem.title
                  )
                }
              />
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <img
              className="close"
              onClick={closeModal}
              src={close}
              alt="close message"
            />
            <h2>{modalContent.title}</h2>
            <span>({modalContent.duration})</span>
            <p>{modalContent.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SliderGallery;

// I get the state classes from slider.js (originally from the slidercontext that I created to generate a provider) .
// I start the modalContent state with an object with keys that I will use, but leaving
//  its values ​​empty for the moment.Later in the return, when I click on Info I will call the openModal
// function that will use values ​​brought from the Classes array, to complete the values ​​of the object.
// During the return it is mapped by the 5 classes of the state Classes and for each one its image and its title are brought,
//  in the play arrow a link is established to the child to whom I will send its props.And finally,
//   in the info icon I will call the function to which I will pass more Classes data.How the
// function sets the modal content.Then in the modal section, now outside the mapping,
//   I use those values ​​recovered from the mapping
