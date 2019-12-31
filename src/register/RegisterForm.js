import React, { useCallback } from "react";
import { request } from "../common/config";

function RegisterForm() {
  let onRegister = useCallback(function(e) {
    e.preventDefault();

    let username = e.target.username.value;
    let password = e.target.password.value;
    let email = e.target.email.value;
    let phone = e.target.phone.value;

    request("/api/account/register", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
        email,
        phone
      })
    })
      .then(function(user) {
        localStorage.setItem("token", user.token);
      })
      .catch(function(err) {
        alert(err.message);
      });
  }, []);

  return (
    <form onSubmit={onRegister}>
      <h1>Register</h1>
      <label>
        <input type="text" name="username" placeholder="Username" required></input>
      </label>
      <label>
        <input type="password" name="password" placeholder="Password" required></input>
      </label>
      <label>
        <input type="email" name="email" placeholder="Email" required></input>
      </label>
      <label>
        <input type="text" name="phone" placeholder="Phone Number" required></input>
      </label>
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;
