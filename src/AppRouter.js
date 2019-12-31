import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import RegisterPage from "./register/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/register">
          <RegisterPage></RegisterPage>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
