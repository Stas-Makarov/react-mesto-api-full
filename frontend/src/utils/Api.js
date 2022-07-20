class Api {
    constructor({baseUrl}) {
      this._baseUrl = baseUrl;
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
        headers: {
          authorization: localStorage.getItem('jwt')
        }
      })
      .then(this._checkResponse);
    }
  
    getUserInfo() {
      return fetch(`${this._baseUrl}users/me`, {
        method: 'GET',
        headers: {
          authorization: localStorage.getItem('jwt')
        }
      })
      .then(this._checkResponse); 
    }
  
    updateUserInfo(data) {
      return fetch(`${this._baseUrl}users/me`, {
        method: 'PATCH',
        headers: {
          authorization: localStorage.getItem('jwt'),
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: data.name, about: data.about})
      })
      .then(this._checkResponse);
    }
  
    addNewCard(data) {
      return fetch(`${this._baseUrl}cards`, {
        method: 'POST',
        headers: {
          authorization: localStorage.getItem('jwt'),
          'Content-Type': 'application/json'
      },
        body: JSON.stringify(data)
      })
      .then(this._checkResponse);
    }
  
    changeLikeCardStatus(id, isLiked) {
      return fetch(`${this._baseUrl}cards/likes/${id}`, {
        method: `${isLiked ? 'DELETE' : 'PUT'}`,
        headers: {
          authorization: localStorage.getItem('jwt')
      }
      })
      .then(this._checkResponse);
    }
  
    editAvatar(data) {
      return fetch(`${this._baseUrl}users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: localStorage.getItem('jwt'),
          'Content-Type': 'application/json'
      },
        body: JSON.stringify(data)
      })
      .then(this._checkResponse);
    }
  
    deleteCard(id) {
      return fetch(`${this._baseUrl}cards/${id}`, {
        method: 'DELETE',
        headers: {
          authorization: localStorage.getItem('jwt')
      }
      })
      .then(this._checkResponse);
    }
  }

  export const api = new Api({
    baseUrl: 'http://api.s.d.domainname.students.nomoredomains.xyz'
   });

  