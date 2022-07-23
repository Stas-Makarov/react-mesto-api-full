import React from 'react';
import { useState, useEffect } from 'react';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import EditAvatartPopup from '../EditAvatarPopup/EditAvatarPopup.js';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup.js';
import AddCardPopup from '../AddCardPopup/AddCardPopup.js';
import ImagePopup from '../ImagePopup/imagePopup.js';
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup.js';
import { api } from '../../utils/Api.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import InfoTooltip from '../InfoTooltip/InfoTooltip.js';
import * as auth from "../../utils/auth.js";
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';


function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isConfirmPopupOpen, setConfirmPopupOpen] = useState(false);
  const [deletedCard, setDeletedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    avatar: ''
  });
  const [cards, setCards] = useState([]);
  const [isRenderLoading, setRenderLoading] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([
        api.getUserInfo(),
        api.getInitialCards()
      ])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setRenderLoading(false));
  }

  function handleCardDeleteSubmit(card) {
    setRenderLoading(true);

    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closePopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setRenderLoading(false));
  }

  function handleUpdateUser(userData) {
    setRenderLoading(true);

    api.updateUserInfo(userData)
      .then(userData => {
        setCurrentUser(userData);
        closePopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setRenderLoading(false));
  }

  function handleUpdateAvatar(data) {
    setRenderLoading(true);

    api.editAvatar(data)
      .then(data => {
        setCurrentUser(data);
        closePopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setRenderLoading(false));
  }

  function handleAddCardSubmit(cardData) {
    setRenderLoading(true);
    
    api.addNewCard(cardData)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closePopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setRenderLoading(false));
  }
 
  function handleEditAvatarClick() { 
    setIsEditAvatarPopupOpen(true); 
  } 

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true); 
  } 

  function handleAddCardClick() {
    setIsAddCardPopupOpen(true);
  }

  function handleCardImageClick(card) {
    setImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleDeleteCardClick(card) {
    setConfirmPopupOpen(true);
    setDeletedCard(card);
  }

  function closePopups() {   
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setImagePopupOpen(false);
    setConfirmPopupOpen(false);
    setInfoTooltipPopupOpen(false);
}

const handleLogin = ({password, email}) => {
  auth
    .authorize(email, password)
    .then((res) => {
      localStorage.setItem('jwt', res.token);
      setLoggedIn(true);
      setEmail(email);
      history.push('/');
    })
    .catch((err) => {
      setInfoTooltipPopupOpen(true);
      setIsSuccess(false);
      console.log(err);
    })
};

const handleRegister = ({password, email}) => {
  auth
    .register(email, password)
    .then((res) => {
      setInfoTooltipPopupOpen(true);
      setIsSuccess(true);
      history.push('/sign-in');
    })
    .catch((err) => {
      setInfoTooltipPopupOpen(true);
      setIsSuccess(false);
      console.log(err)
    });
};

const handleSignOut = () => {
  localStorage.removeItem('jwt');
  setLoggedIn(false);
  history.push('/sign-in');
};

useEffect(() => {
  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
            history.push('/');
          }
        })
        .catch((err) => console.error(err));
    }
  };
  tokenCheck();
}, [history, loggedIn]);

  return (
    <div className='page'>
      <CurrentUserContext.Provider value={currentUser}>

        <Header onSignOut={handleSignOut} email={email} />

        <Switch>
          <ProtectedRoute
              component={Main} 
              exact 
              path="/" 
              loggedIn={loggedIn}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddCard={handleAddCardClick}
              onCardClick={handleCardImageClick}
              onDeleteClick={handleDeleteCardClick}
              cards={cards}
              handleCardLike={handleCardLike}
          />
          
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        
        {loggedIn && <Footer />}

        <EditAvatartPopup 
              isOpen={isEditAvatarPopupOpen} 
              onClose={closePopups} 
              onUpdateAvatar={handleUpdateAvatar}
              isRenderLoading={isRenderLoading}
        /> 
        <EditProfilePopup 
              isOpen={isEditProfilePopupOpen} 
              onClose={closePopups}
              onUpdateUser={handleUpdateUser}
              isRenderLoading={isRenderLoading}
        />
        <AddCardPopup 
              isOpen={isAddCardPopupOpen} 
              onClose={closePopups}
              onAddCard={handleAddCardSubmit}
              isRenderLoading={isRenderLoading}
        />
        <ImagePopup
              isOpen={isImagePopupOpen} 
              card={selectedCard}
              onClose={closePopups}
        />
        <ConfirmPopup
              isOpen={isConfirmPopupOpen}
              card={deletedCard}
              onClose={closePopups}
              onDeleteCard={handleCardDeleteSubmit}
              isRenderLoading={isRenderLoading}
        />
        <InfoTooltip 
              isOpen={isInfoTooltipPopupOpen} 
              onClose={closePopups} 
              isSuccess={isSuccess} 
        />
      </CurrentUserContext.Provider>
    </div>    
  );
}

export default App;
