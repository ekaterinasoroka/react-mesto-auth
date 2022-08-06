export const url = 'https://auth.nomoreparties.co';

const checkResponse = (res) => {
if (res.ok) {
  return res.json();
}
return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = ({password, email}) => {
  return fetch(`${url}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
  .then(res => checkResponse(res))
}; 


export const authorize = ({password, email}) => {
  return fetch(`${url}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  })
    .then(response => checkResponse(response))
}

export const getContent = (token) => {
  return fetch(`${url}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(res => res.json())
};