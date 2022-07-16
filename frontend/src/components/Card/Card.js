import React from 'react';
import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';

function Card(props) {

    const currentUser = useContext(CurrentUserContext);

    const isOwn = props.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (`elements-grid__item-delete ${isOwn ? 'elements-grid__item-delete_active' : ''}`);
    
    const isLiked = props.card.likes.some(like => like._id === currentUser._id);
    const cardLikeButtonClassName = (`elements-grid__item-like ${isLiked ? 'elements-grid__item-like_active' : ''}`);

    function handleImageClick() {
        props.onCardClick(props.card);
    }

    function handleCardLike() {
        props.onCardLike(props.card);
    }

    function handleCardDelete() {
        props.onCardDelete(props.card)
      }

    return (
        <li className="elements-grid__item-container">
            <div className="elements-grid__image-container">
                <img className="elements-grid__item-image"
                    src={props.card.link}
                    alt={props.card.name}
                    onClick={handleImageClick} 
                />
                <button className={cardDeleteButtonClassName} type="button" onClick={handleCardDelete}
                ></button>
            </div>
            <div className="elements-grid__item-caption">
                <h2 className="elements-grid__item-text">{props.card.name}</h2>
                <div className="elements-grid__item-like-container">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleCardLike}></button>
                    <p className="elements-grid__item-like-counter">{props.card.likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;