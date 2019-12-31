import React, { useCallback } from "react";
import { request } from "../common/config";

function LoginForm() {
  let onLogin = useCallback(function(e) {
    e.preventDefault();

    let username = e.target.username.value;
    let password = e.target.password.value;

    request("/api/account/login", {
      method: "POST",
      body: JSON.stringify({ username, password })
    })
      .then(function(user) {
        localStorage.setItem("token", user.token);
      })
      .catch(function(err) {
        alert(err.message);
      });
  }, []);

  return (
    <form onSubmit={onLogin}>
      <label>
        <input type="text" name="username" placeholder="Username" required></input>
      </label>
      <label>
        <input type="password" name="password" placeholder="Password" required></input>
      </label>
      <button>Log in</button>
    </form>
  );
}

export default LoginForm;
