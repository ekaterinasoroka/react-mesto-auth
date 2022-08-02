import { useEffect, useState} from 'react';

import Footer from './Footer.js';
import api from '../utils/api.js';
import Main from './Main.js';
import Header from './Header.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {Route, Switch, Redirect, useHistory} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js';
import Login from './Login.js';
import Register from './Register.js';
import * as auth from './auth';

function App() {
  
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [userInfo, setUserInfo] = useState({ email: '' });
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  useEffect(() => {
    Promise.all([api.getCards(), api.getInfoUsers()])
    .then(([card, userInfo]) => {
      setCards(card);
      setCurrentUser(userInfo)
    })
    .catch((err) => console.log(err));
  }, []);



  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }
    auth.getContent(jwt)
    .then(({ email}) => {
      setUserInfo({email});
      setLoggedIn(true);
    });  
  }





  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn, history]);

  function onRegister(data) {
    return auth.register(data)
    .then(() => {
      history.pushState('/sign-in')
    })
  }

  function onLogin(data) {
    return auth.authorize(data)
    .then(({jwt, user: {email}}) => {
      setUserInfo({ email});
      setLoggedIn(true);
      localStorage.setItem('jwt', jwt);
    })
  }

  function onLogout() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in')
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser({name, about}) {
    api.patchEditProfile({name, about})
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((res) => {
      console.log(res)
    })
  }

  function handleUpdateAvatar({avatar}) {
    api.updateAvatarUser({avatar})
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((res) => {
      console.log(res)
    })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser?._id);
    api.toggleLike(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((d) => (d._id !== card._id)));
    })
    .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(card) {
    api.addNewCard(card)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err)
    })
  }



  return (
    
    <div className="page">
            <Switch>
        <ProtectedRoute
          path='/'
          component={Main}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          setCards={setCards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          loggedIn={loggedIn}
          onLogout={onLogout}
        />
        <Route
          path="/sign-up"
        >
          <Register onRegister={onRegister}/>
        </Route>
        <Route
          path="/sign-in"
        >
          <Login onLogin={onLogin} />
        </Route>
        <Route>
          {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
        </Route> 
      </Switch>
      <CurrentUserContext.Provider value={currentUser}>
        <Header
            userData={userInfo}
        />
        <Footer
          loggedIn={loggedIn}
          onLogout={onLogout}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen} 
          onClose={closeAllPopups} 
          onUpdateUser={handleUpdateUser}
          loggedIn={loggedIn}
          onLogout={onLogout}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          loggedIn={loggedIn}
          onLogout={onLogout}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen} 
          onClose={closeAllPopups} 
          onUpdateAvatar={handleUpdateAvatar}
          loggedIn={loggedIn}
          onLogout={onLogout}
        />
        <PopupWithForm
          name="delete-card" 
          title="Вы уверены?"
          loggedIn={loggedIn}
          onLogout={onLogout}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          name="full-size"
          loggedIn={loggedIn}
          onLogout={onLogout}
        />
      </CurrentUserContext.Provider> 

      
    </div>
     
  );
}

export default App;