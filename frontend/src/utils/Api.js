class Api {
    constructor(settings) {
      this._baseUrl = settings.baseUrl;
      this._headers = settings.headers;
      }
  
    _checkResponse(res) {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
    }
  
    getInitialCards() {
      return fetch(`${this._baseUrl}cards`, {
        method: 'GET',
        headers: this._headers
      })
      .then(this._checkResponse);
    }
  
    getUserInfo() {
      return fetch(`${this._baseUrl}users/me`, {
        method: 'GET',
        headers: this._headers
      })
      .then(this._checkResponse); 
    }
  
    updateUserInfo(data) {
      return fetch(`${this._baseUrl}users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(data)
      })
      .then(this._checkResponse);
    }
  
    addNewCard(data) {
      return fetch(`${this._baseUrl}cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(data) 
      })
      .then(this._checkResponse);
    }
  
    changeLikeCardStatus(id, isLiked) {
      return fetch(`${this._baseUrl}cards/likes/${id}`, {
        method: `${isLiked ? 'DELETE' : 'PUT'}`,
        headers: this._headers
      })
      .then(this._checkResponse);
    }
  
    editAvatar(data) {
      return fetch(`${this._baseUrl}users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(data)
      })
      .then(this._checkResponse);
    }
  
    deleteCard(id) {
      return fetch(`${this._baseUrl}cards/${id}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._checkResponse);
    }
  }

  export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39/',
    headers: {
      authorization: 'da8d254e-f76c-47fc-b6b9-7e52d3faf87e',
      'Content-Type': 'application/json'
    }
  });

  