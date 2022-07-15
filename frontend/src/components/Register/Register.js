import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
    const [formValues, setFormValues] = useState({password: '', email: ''});

    function handleSubmit(e) {
      e.preventDefault();
      onRegister(formValues);
    }
  
    function handleChange(e) {
      const {name, value} = e.target;
      setFormValues((prevState) => ({...prevState, [name]: value}));
    }

  return (
    <div className="login">
      <h2 className="login__title">Регистрация</h2>
      <form className="login__inputs-container" onSubmit={handleSubmit} action="/" method="post" name="registration">
        <input 
            className="login__input"
            onChange={handleChange}
            value={formValues.email || ''}
            name="email"
            type="email" 
            placeholder="Email"
            required
        />
        <input
            className="login__input"
            onChange={handleChange}
            value={formValues.password || ''}
            name="password"
            type="password"
            placeholder="Пароль"
            required
        />
        <button className="login__button" type="submit">Зарегистрироваться</button>
      </form>
      <Link className="login__redirect-button" to='/sign-in'>Уже зарегистрированы? Войти</Link>
    </div>
  );
}

export default Register;