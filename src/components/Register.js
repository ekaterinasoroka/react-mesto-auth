import { useState } from  'react';
import { Link } from 'react-router-dom';
import Header from './Header';

function Register({onRegister}) {

  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
  });

const [message, setMessage] = useState('');

  function handleChange(e) {
    const {name, value} = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  onRegister(registerData)
    .catch(err => setMessage(err.message || "Что-то пошло не так"))

  return(
    <div className="identification">
        <Header />
        <p className="identification__welcome">
          Регистрация
        </p>
        <form onSubmit={handleSubmit} className="identification__form">
          <input 
            name="email" 
            type="email" 
            value={registerData.email} 
            onChange={handleChange} 
            placeholder="Email"
          />          
          <input 
            name="password" 
            type="password" 
            value={registerData.password} 
            onChange={handleChange} 
            placeholder="Пароль"
          />
          <button type="submit" className="identification__subButton">Зарегистрироваться</button>
        </form>
        <div className="identification__sign">
          <p>Уже зарегистрированы?</p>
          <Link to="/sign-in" className="identification__login-link">Войти</Link>
        </div>
      </div>
  )
}

export default Register;