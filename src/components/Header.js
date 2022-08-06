import logo from '../images/logo.svg';
import { Route, Link } from 'react-router-dom';

function Header({userData}) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип"/>
      <div >
        <p className="header__link">{userData.email}</p>
        <Route
            path="/signin"
          ><Link to="/signup" className="header__link">Зарегистрироваться</Link></Route>
        <Route
            path="/signup"
          ><Link to='/signin' className="header__link">Войти</Link></Route>
      </div>

    </header>
  );
}

export default Header;
