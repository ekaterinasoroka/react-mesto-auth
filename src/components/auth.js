export const url = 'https://auth.nomoreparties.co';

const checkResponse =(response) =>
  response.ok ? response.json() : Promise.reject(new Error(`Ошибка ${response.status}`))

export const register = ({ email, password }) => {
  return fetch(`${url}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(res => checkResponse(res));
};

export const authorize = ({ email: identifier, password }) => {
  return fetch(`${url}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ identifier, password })
  })
    .then((res => res.json))
}

export const getContent = (token) => {
  return fetch(`${url}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.json())
};