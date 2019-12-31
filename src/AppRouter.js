import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import RegisterPage from "./register/RegisterPage";
import LoginPage from "./login/LoginPage";
import Homepage from "./homepage/Homepage";
import JobPage from "./job/JobPage";
import WalletPage from "./wallet/WalletPage";
import WalletHistory from "./wallet/WalletHistory";
import WalletUpdate from "./wallet/WalletUpdate";
import ChatPage from "./chat/ChatPage";
import JobListFilteredByCategory from "./job-list/JobListFilteredByCategory";
import SearchResult from "./job-list/SearchResult";

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

        <Route path="/chat" exact>
          <ChatPage></ChatPage>
        </Route>
        <Route path="/chat/:username">
          <ChatPage></ChatPage>
        </Route>

        <Route path="/job-list/:typeId">
          <JobListFilteredByCategory></JobListFilteredByCategory>
        </Route>

        <Route path="/search/:text">
          <SearchResult></SearchResult>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
