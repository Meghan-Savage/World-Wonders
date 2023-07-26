import React from "react";
import ReactDOM from "react-dom";

const ModalOverlay = ({ onClick, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50 z-50"
        onClick={onClick}
      ></div>
      <div className="relative bg-white p-4 md:p-8 rounded-lg shadow-md z-50">
        {children}
      </div>
    </div>
  );
};

const Modal = ({ onToggleModal, children }) => {
  const portalElement = document.getElementById("overlay");
  return (
    <>
      {ReactDOM.createPortal(
        <ModalOverlay onClick={onToggleModal}>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
