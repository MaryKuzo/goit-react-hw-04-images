import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import { Overlay, ModalWindow } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root')

const Modal = ({ largeImage, onClose }) => {

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
      const handleScroll = (e) => {
      e.preventDefault();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    document.body.addEventListener('touchmove', handleScroll, { passive: false });


    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
      document.body.removeEventListener('touchmove', handleScroll);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }


  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalWindow>
        <img src={largeImage.largeUrl} alt={largeImage.alt} />
      </ModalWindow>
    </Overlay>,
    modalRoot);

};

Modal.propTypes = {
  largeImage: PropTypes.shape({
    largeUrl: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired
}

export default Modal
