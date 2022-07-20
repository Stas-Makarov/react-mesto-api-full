export const BASE_URL = 'http://api.s.d.domainname.students.nomoredomains.xyz/';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return res.json()
      .then((data) => {
        throw new Error(data.error);
      });
};

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"password": password, "email": email})
  })
};

export const authorize = (identifier, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"email": identifier, "password": password}),
    credentials: 'include'
  })
  .then(checkResponse)
};

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  })
  .then(checkResponse)
}
