class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
      }
  
    _checkResponse(res) {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
    }
  
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
        credentials: 'include',
      })
      .then(this._checkResponse);
    }
  
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
        credentials: 'include',
      })
      .then(this._checkResponse); 
    }
  
    updateUserInfo(data) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({name: data.name, about: data.about}),
        credentials: 'include',
      })
      .then(this._checkResponse);
    }
  
    addNewCard(data) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(data),
        credentials: 'include',
      })
      .then(this._checkResponse);
    }
  
    changeLikeCardStatus(id, isLiked) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: `${isLiked ? 'DELETE' : 'PUT'}`,
        headers: this._headers,
        credentials: 'include',
      })
      .then(this._checkResponse);
    }
  
    editAvatar(data) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(data),
        credentials: 'include',
      })
      .then(this._checkResponse);
    }
  
    deleteCard(id) {
      return fetch(`${this._baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: this._headers,
        credentials: 'include',
      })
      .then(this._checkResponse);
    }
  }

  export const api = new Api({
    baseUrl: 'https://api.s.d.domainname.students.nomoredomains.xyz',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
   });
