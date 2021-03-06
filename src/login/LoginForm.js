import React, { useCallback, useContext } from "react";
import { request } from "../common/config";
import { Link, useHistory } from "react-router-dom";
import AppContext from "../AppContext";
import { toast } from "react-toastify";

function LoginForm() {
  let history = useHistory();
  let { setUser } = useContext(AppContext);

  let onLogin = useCallback(
    function(e) {
      e.preventDefault();

      let username = e.target.username.value;
      let password = e.target.password.value;

      request("/api/account/login", {
        method: "POST",
        body: JSON.stringify({ username, password })
      })
        .then(function(user) {
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", user.token);
          setUser(user);
          history.goBack();
        })
        .catch(function({ message }) {
          toast.error(message);
        });
    },
    [setUser, history]
  );

  return (
    <div className="login-form-wrapper">
      <div className="login-form">
        <h1>Log in</h1>
        <form onSubmit={onLogin}>
          <label>
            <input type="text" name="username" placeholder="Username" required></input>
          </label>
          <label>
            <input type="password" name="password" placeholder="Password" required></input>
          </label>
          <div className="login-options">
            <label className="login-checkbox">
              <input type="checkbox" name="remember"></input>
              <span>Remember Me?</span>
            </label>
            <Link to="/forgot">Forgot Password</Link>
          </div>
          <button type="submit">Continue</button>
        </form>
      </div>
      <hr style={{ marginTop: "2rem" }}></hr>
      <span className="login-form-text small">
        Not a member yet? <Link to="/register">Join now</Link>
      </span>
    </div>
  );
}

export default LoginForm;
