import React, { useCallback, useContext } from "react";
import { request } from "../common/config";
import { Link, useHistory } from "react-router-dom";
import AppContext from "../AppContext";
import { toast } from "react-toastify";

function RegisterForm() {
  let history = useHistory();
  let { setUser } = useContext(AppContext);

  let onRegister = useCallback(
    function(e) {
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
        <h1>Join GIG</h1>
        <form onSubmit={onRegister}>
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
          <button
            style={{
              marginTop: "2rem"
            }}
            type="submit">
            Continue
          </button>
        </form>
        <span className="login-form-text">By joining I agree to receive emails from GIG.</span>
      </div>
      <hr></hr>
      <span className="login-form-text small">
        Already a member? <Link to="/login">Sign in</Link>
      </span>
    </div>
  );
}

export default RegisterForm;
