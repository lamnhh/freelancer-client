import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import RegisterPage from "./register/RegisterPage";
import LoginPage from "./login/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register">
          <RegisterPage></RegisterPage>
        </Route>
        <Route path="/login">
          <LoginPage></LoginPage>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
