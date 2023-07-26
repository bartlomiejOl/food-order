import React from 'react';
import './Modal.css';
import ReactDOM from 'react-dom';

function Backdrop(props) {
  return <div className="backdrop" onClick={props.onCartClose}></div>;
}

function ModalOverlay(props) {
  return (
    <div className="modal">
      <div className="content">{props.children}</div>
    </div>
  );
}

const portalElement = document.getElementById('overlays');

function Modal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onCartClose={props.onCartClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
}

export default Modal;
