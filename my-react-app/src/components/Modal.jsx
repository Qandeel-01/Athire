// Modal.jsx
import React from 'react';
import './Modal.css'; // Optional, for styling

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <div className="modal-body">
          <h2>Login / Sign Up</h2>
          {/* Add your login and signup form here */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
