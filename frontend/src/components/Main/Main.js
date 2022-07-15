import React from 'react';
import Card from '../Card/Card.js';
import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';

function Main(props) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__container">
                    <div className="profile__avatar-container">
                        <button className="profile__avatar-button" type="button" onClick={props.onEditAvatar}></button>
                        <img className="profile__avatar" src={currentUser.avatar} alt="фото кусто"/>
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__heading-text">{currentUser.name}</h1>
                        <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                        <p className="profile__paragraph-text">{currentUser.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddCard}></button>
            </section>
            <section>
                <ul className="elements-grid">
                    {props.cards.map((card) => (
                        < Card
                            card={card}
                            onCardClick={props.onCardClick}
                            onCardDelete={props.onDeleteClick}
                            key={card._id}
                            owner={card.owner}
                            onCardLike={props.handleCardLike}
                        />
                    ))}
                </ul>
            </section> 
    </main>
    );
}

export default Main;