import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Logo from '../../images/лого.svg';

function Header({ onSignOut, email }) {
    return (
        <header className="header">
            <img className="header__logo" src={Logo} alt="логотип"/>
            <Switch>
                <Route exact path="/sign-up">
                    <Link className="header__login" to="/sign-in" >
                        Войти
                    </Link>
                </Route>
                <Route exact path="/sign-in">
                    <Link className="header__login" to="/sign-up" >
                        Регистрация
                    </Link>
                </Route>
                <Route exact path="/">
                    <div className="header__logout-container">
                        <p className="header__logout-text">{email}</p>
                        <button className="header__logout-button" type="button" onClick={onSignOut}>
                            Выйти
                        </button>
                    </div>        
                </Route>
            </Switch>
        </header>
    );    
}

export default Header;