import React, { useState } from "react";

function Login({ onLogin }) {
  const [formValues, setFormValues] = useState({ password: "", email: "" });
  function handleSubmit(e) {
    e.preventDefault();
    onLogin(formValues);
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  }
  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__inputs-container" onSubmit={handleSubmit} action="/" method="post" name="login">
        <input className="login__input" onChange={handleChange} value={formValues.email || ""} name="email" type="email" placeholder="Email" required />
        <input
          className="login__input"
          onChange={handleChange}
          type="password"
          value={formValues.password || ""}
          name="password"
          placeholder="Пароль"
          required
        />
        <button className="login__button" type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Login;
