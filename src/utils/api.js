class Api {
  constructor(url) {
    this._url = url;
    this._headers = {
      'Content-Type': 'application/json',
      authorization: 'ccde9c8b-0b7e-4a31-936e-1b52e9675d33'
    }
  }

  _checkingTheResponse(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject('Ошибка')
  }

  getInfoUsers() {
    return fetch('https://nomoreparties.co/v1/cohort-43/users/me', {
      headers: this._headers
    })
      .then(this._checkingTheResponse);
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(this._checkingTheResponse);

  }

  patchEditProfile(item) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name: item.name, about: item.about})
    })
    .then(this._checkingTheResponse);
  }

  addNewCard(item) {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({name: item.name, link: item.link})
    })
    .then(this._checkingTheResponse);
  }

  toggleLike(data, isLiked) {
    return fetch(`${this._url}/cards/${data}/likes`, {
      headers: this._headers,
      method: `${isLiked ? 'DELETE' : 'PUT'}`
    })
      .then(this._checkingTheResponse); 
  }

  updateAvatarUser(item) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({avatar: item.avatar})
    })
    .then(this._checkingTheResponse);
  }

  
  deleteCard(data) {
    return fetch(`${this._url}/cards/${data}`, {
      headers: this._headers,
      method: 'DELETE',
    })
    .then(this._checkingTheResponse);
  }
}

 const api = new Api('https://mesto.nomoreparties.co/v1/cohort-43'); 

 export default api;