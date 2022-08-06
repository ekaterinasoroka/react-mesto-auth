import { useState } from  'react';

import Header from './Header';

function Login({ onLogin } ) {
  const [loginData, setLoginData] = useState( {
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  function handleChange(e) {
    const {name, value} = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if(!loginData.email || !loginData.password) {
      return;
    }
    onLogin(loginData)
    .catch(err => setMessage(err.message || 'Ошибка'))
  }
    return (
      <div className="identification" onSubmit={handleSubmit}>
        <p className="identification__welcome">
          Вход
        </p>
        <form className="identification__form">
          <input className="identification__input"
            name="email" 
            type="email" 
            value={loginData.email} 
            onChange={handleChange} 
            placeholder="Email"
          />          
          <input className="identification__input"
            name="password" 
            type="password" 
            value={loginData.password} 
            onChange={handleChange} 
            placeholder="Пароль"
          />
          <button type="submit" className="identification__subButton">Войти</button>
        </form>
      </div>
    )
}

export default Login;