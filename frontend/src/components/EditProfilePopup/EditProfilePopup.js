import React from 'react';
import { useState, useEffect, useContext } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm.js';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';

function EditProfilePopup(props){
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser.name)
        setDescription(currentUser.about)
      }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault()
        props.onUpdateUser({
          name: name,
          about: description,
        })
      }

    function handleChangeName(e) {
        setName(e.target.value);
    }
    
    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }  
    
    return (
        <PopupWithForm 
            title="Редактировать профиль"
            name="edit-profile" 
            isOpen={props.isOpen} 
            onClose={props.onClose} 
            onSubmit={handleSubmit}
            buttonText={props.isRenderLoading ? 'Сохранение...' : 'Сохранить'}>

            <input className="popup__form-item popup__form-item_type_person-name" type="text" name="name" onChange={handleChangeName} value={name || ''} minLength="2" maxLength="40" placeholder="Имя" required />
            <span className="popup__form-item-error popup__form-item-error_type_name"></span>     
            <input className="popup__form-item popup__form-item_type_job" type="text" name="about" onChange={handleChangeDescription} value={description || ''} minLength="2" maxLength="200" placeholder="О себе" required />
            <span className="popup__form-item-error popup__form-item-error_type_about"></span>            
        </PopupWithForm>

    );
} 


export default EditProfilePopup;