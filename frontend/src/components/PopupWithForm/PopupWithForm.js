import React from 'react';

function PopupWithForm(props) { 

    function handleOverlayClick(evt) {
        if (evt.target===evt.currentTarget) {
            props.onClose()
        };
    }

    return (
        
        <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`} onClick={handleOverlayClick}>
            <div className="popup__container">
                <button className="popup__close" type="button" onClick={props.onClose}></button>
                <h3 className="popup__title">{props.title}</h3>
                <form className="popup__form" name={`${props.name}-form`} onSubmit={props.onSubmit}>
                    
                    {props.children}
                    
                    <button className="popup__save-button" type="submit">{props.buttonText}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;