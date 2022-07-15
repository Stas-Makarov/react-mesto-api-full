import React from 'react';
import { useState, useEffect } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';


function EditAvatartPopup(props){
    const [link, setLink] = useState('');

    useEffect(() => {
        setLink('');
    }, [props.isOpen]);

    function handleSetLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({avatar: link});
      }

    return (            
        <PopupWithForm 
            title="Обновить аватар" 
            name="edit-avatar" 
            isOpen={props.isOpen} 
            onClose={props.onClose} 
            onSubmit={handleSubmit}
            buttonText={props.isRenderLoading ? 'Сохранение...' : 'Сохранить'}>
            
            <input className="popup__form-item popup__form-item_type_link" type="url" name="avatar" value={link} onChange={handleSetLink} placeholder="Ссылка на страницу" required />
            <span className="popup__form-item-error popup__form-item-error_type_avatar"></span>
        
        </PopupWithForm>
    )

}

export default EditAvatartPopup;