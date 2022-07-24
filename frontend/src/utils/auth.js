export const BASE_URL = 'https://api.s.d.domainname.students.nomoredomains.xyz';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return res.json()
      .then((data) => {
        throw new Error(data.error);
      });
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password}),
    credentials: 'include',
  })
  .then((responce) => checkResponse(responce))
}; 

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password}),
      credentials: 'include',
    })
    .then((responce) => checkResponse(responce))
};

export const getContent = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${jwt}`
      },
      credentials: 'include',
    })
    .then((responce) => checkResponse(responce))
};
