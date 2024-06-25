import React from "react";
import "./confirmModal.css";
import { useDarkMode } from "../DarkMode";

const ConfirmModal = ({ onConfirm, onCancel }) => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`modal-overlay ${darkMode ? "dark" : ""}`}>
      <div className="modal-content">
        <h2 className="modal-text">Do you want to quit?</h2>
        <div className="modal-buttons">
          <button className="modal-button" onClick={onConfirm}>
            Yes
          </button>
          <button className="modal-button" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

// las funciones estan declaradas en los componentes sliderPlay y
// ChallengePlay, ambas acceden al modal solo en caso que los respectivos estados
// de showModal esten en True, y esto pasa cuando en cada componente el user clickea en el exit,
//   que activa la funcion goBack(esto cambia a true el estado) y este es el condiciol en cada
//  componente para renderizar o no el modal
