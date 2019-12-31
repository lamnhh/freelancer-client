import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import RegisterPage from "./register/RegisterPage";
import LoginPage from "./login/LoginPage";
import Homepage from "./homepage/Homepage";
import JobPage from "./job/JobPage";
import WalletPage from "./wallet/WalletPage";
import WalletHistory from "./wallet/WalletHistory";
import WalletUpdate from "./wallet/WalletUpdate";

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
        <Route path="/job/:id">
          <JobPage></JobPage>
        </Route>
        <Route path="/wallet" exact>
          <WalletPage></WalletPage>
        </Route>
        <Route path="/wallet/history">
          <WalletHistory></WalletHistory>
        </Route>
        <Route path="/wallet/topup">
          <WalletUpdate action="topup"></WalletUpdate>
        </Route>
        <Route path="/wallet/withdraw">
          <WalletUpdate action="withdraw"></WalletUpdate>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
