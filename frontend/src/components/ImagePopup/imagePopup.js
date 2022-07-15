import React from 'react';

function ImagePopup(props) {
    return (
        <div className={`popup popup_type_add-image ${props.isOpen && 'popup_opened'}`} onClick={props.onClose}>
            <div className="popup__container-image">
                <button className="popup__close" type="button" onClick={props.onClose}></button>  
                <img className="popup__item-image"
                    src={props.card.link}
                    alt={props.card.name}
                />
                <h3 className="popup__item-caption">{props.card.name}</h3>
            </div>
        </div>
    );
  }
  
  export default ImagePopup;