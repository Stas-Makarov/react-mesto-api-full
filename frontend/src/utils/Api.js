class Api {
    constructor(options) {
      this._options = options;
      }
  
    _checkResponse(res) {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
    }
  
    getInitialCards() {
      return fetch(`${this._options.baseUrl}cards`, {
        method: 'GET',
        headers: this._options.headers,
        credentials: 'include',
      })
      .then(res => this._checkResponse(res));
    }
  
    getUserInfo() {
      return fetch(`${this._options.baseUrl}users/me`, {
        method: 'GET',
        headers: this._options.headers,
        credentials: 'include',
      })
      .then(res => this._checkResponse(res)); 
    }
  
    updateUserInfo(data) {
      return fetch(`${this._options.baseUrl}users/me`, {
        method: 'PATCH',
        headers: this._options.headers,
        body: JSON.stringify(data),
        credentials: 'include'
      })
      .then(res => this._checkResponse(res));
    }
  
    addNewCard(data) {
      return fetch(`${this._options.baseUrl}cards`, {
        method: 'POST',
        headers: this._options.headers,
        body: JSON.stringify(data),
        credentials: 'include' 
      })
      .then(res => this._checkResponse(res));
    }
  
    changeLikeCardStatus(id, isLiked) {
      return fetch(`${this._options.baseUrl}cards/likes/${id}`, {
        method: `${isLiked ? 'DELETE' : 'PUT'}`,
        headers: this._options.headers,
        credentials: 'include',
      })
      .then(res => this._checkResponse(res));
    }
  
    editAvatar(data) {
      return fetch(`${this._options.baseUrl}users/me/avatar`, {
        method: 'PATCH',
        headers: this._options.headers,
        body: JSON.stringify(data),
        credentials: 'include',
      })
      .then(this._checkResponse);
    }
  
    deleteCard(id) {
      return fetch(`${this._baseUrl}cards/${id}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(res => this._checkResponse(res));
    }
  }

  export const api = new Api({
    baseUrl: 'http://api.s.d.domainname.students.nomoredomains.xyz/',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  