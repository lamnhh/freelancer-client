import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import RegisterPage from "./register/RegisterPage";
import LoginPage from "./login/LoginPage";
import Homepage from "./homepage/Homepage";

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
        <Route path="/" exact>
          <Homepage></Homepage>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
