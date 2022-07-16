import React from 'react';
import { useEffect, useState } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';

function AddCardPopup(props){
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen])

    function handleSetName(e) {
        setName(e.target.value);
    }

    function handleSetLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddCard({ name, link });
    }
    
    return (
        <PopupWithForm 
            title="Новое место" 
            name="add-card" 
            isOpen={props.isOpen} 
            onClose={props.onClose}
            onSubmit={handleSubmit} 
            buttonText={props.isRenderLoading ? 'Сохранение...' : 'Сохранить'}>
            
            <input className="popup__form-item popup__form-item_type_place-name" type="text" name="name"  value={name} onChange={handleSetName} placeholder="Название" minLength="2" maxLength="30" required />
            <span className="popup__form-item-error popup__form-item-error_type_name"></span>
            <input className="popup__form-item popup__form-item_type_link" type="url" name="link" value={link} onChange={handleSetLink} placeholder="Ссылка на страницу" required />
            <span className="popup__form-item-error popup__form-item-error_type_link"></span>

        </PopupWithForm>
    );
}

export default AddCardPopup;