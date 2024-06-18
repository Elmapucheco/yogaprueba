import React from "react";
import "./confirmModal.css";
import { useDarkMode } from "../DarkMode";

const ConfirmModal = ({ show, onConfirm, onCancel }) => {
  const { darkMode } = useDarkMode();
  if (!show) return null;

  return (
    <div className={`modal-overlay ${darkMode ? "dark" : ""}`}>
      <div className="modal-content">
        <h2>Do you want to quit?</h2>
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
