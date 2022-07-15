import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';

function ConfirmPopup(props){
    
    function handleSubmit(e) {
        e.preventDefault();
        props.onDeleteCard(props.card);
    }

    return (
        <PopupWithForm 
            title="Вы уверены?" 
            name="confirm-popup" 
            isOpen={props.isOpen} 
            onClose={props.onClose} 
            onSubmit={handleSubmit}
            buttonText={props.isRenderLoading ? 'Сохранение...' : 'Да'}>

        </PopupWithForm>
    );
}

export default ConfirmPopup;