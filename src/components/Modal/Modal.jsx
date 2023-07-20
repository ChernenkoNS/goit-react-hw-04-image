import PropTypes from 'prop-types';
import css from '../Modal/Modal.module.css';
import { useEffect } from 'react';

export const Modal = ({ selectedImage, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        onClose();
      }
    });
  }, [onClose]);

  return (
    <div onClick={onClose} className={css.Overlay}>
      <div className={css.Modal}>
        <img src={selectedImage} alt="dog" />
      </div>
    </div>
  );
};


Modal.propTypes = {
  selectedImage: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
