import React from 'react';
import './Modal.scss';

interface IModalProps {
  title: string;
  text: string;
  buttonText: string;
  callback: () => void;
}

function Modal(props: IModalProps) {
  const { title, text, buttonText, callback } = props;

  return (
    <div className="modal">
      <h3 className="modal__title">{title}</h3>
      <p className="modal__text">{text}</p>
      <button
        className="modal__button"
        onClick={() => {
          callback();
        }}
      >
        {buttonText}
      </button>
    </div>
  );
}

export default Modal;
