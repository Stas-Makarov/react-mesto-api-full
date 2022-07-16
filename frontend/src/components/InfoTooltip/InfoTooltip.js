import React from 'react';
import success from '../../images/success-reg.svg';
import unsuccess from '../../images/unsuccess-reg.svg';

function InfoTooltip({ isOpen, onClose, isSuccess }) {
    const successImg = isSuccess ? success : unsuccess;
    const succesAltText = isSuccess ? 'Успех' : 'Ошибка';
    const succesText = isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.';
  
    return (
    <div className={`popup popup_type_log-confirm ${isOpen && 'popup_opened'}`} onClick={onClose}>
        <div className="popup__container-confirm">
            <button className="popup__close" type="button" onClick={onClose}></button>  
            <img 
                className="popup__confirm-image"
                src={successImg}
                alt={succesAltText}
            />
            <h3 className="popup__item-text">{succesText}</h3>
        </div>
    </div>
  );
}

export default InfoTooltip;