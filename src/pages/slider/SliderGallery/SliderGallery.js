import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./slidergallery.css";
import { useDarkMode } from "../../../components/Context/DarkMode";
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import close from "../../../assets/exit.png";

function SliderGallery() {
  const { darkMode } = useDarkMode();
  const location = useLocation();
  const { classes } = location.state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    duration: "",
    description: "",
    title: "",
  });

  function openModal(duration, description, title) {
    setModalContent({ duration, description, title });
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className={`slider-gallery-container ${darkMode ? "dark" : ""}`}>
      <div className="slider-grid">
        {classes.map((classItem, index) => (
          <div key={index} className="slider-gallery-item">
            <div className="slider-gallery-wrapper">
              <h2>{classItem.title}</h2>
              <img src={classItem.img} alt={`Imagen ${classItem.title}`} />

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
      )}
    </div>
  );
}

export default SliderGallery;
