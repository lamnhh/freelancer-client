import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import RegisterPage from "./register/RegisterPage";
import LoginPage from "./login/LoginPage";
import Homepage from "./homepage/Homepage";
import JobPage from "./job/JobPage";
import WalletPage from "./wallet/WalletPage";
import ChatPage from "./chat/ChatPage";
import JobListFilteredByCategory from "./job-list/JobListFilteredByCategory";
import SearchResult from "./job-list/SearchResult";
import Header from "./common/Header";
import Footer from "./common/Footer";
import AppContext from "./AppContext";
import UserProfile from "./user-profile/UserProfile";
import Logout from "./common/Logout";
import UploadJob from "./job-form/UploadJob";
import UpdateJob from "./job-form/UpdateJob";
import OngoingTransactionList from "./transaction-list/OngoingTransactionList";
import CompletedTransactionList from "./transaction-list/CompletedTransactionList";

function App() {
  // user === null <=> User has not logged in.
  // Otherwise, user contains information of the current user.
  let [user, setUser] = useState(null);

  // Upon start, read user information from localStorage to initialise.
  useEffect(function() {
    if (!!!localStorage.getItem("user")) {
      return;
    }
    let user = JSON.parse(localStorage.getItem("user"));
    setUser(user);
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser
      }}>
      <BrowserRouter>
        <div>
          <Header></Header>
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

            <Route path="/user-profile">
              <UserProfile></UserProfile>
            </Route>

            <Route path="/logout">
              <Logout></Logout>
            </Route>

            <Route path="/upload-job">
              <UploadJob></UploadJob>
            </Route>
            <Route path="/update-job/:id">
              <UpdateJob></UpdateJob>
            </Route>

            <Route path="/ongoing">
              <OngoingTransactionList></OngoingTransactionList>
            </Route>
            <Route path="/completed">
              <CompletedTransactionList></CompletedTransactionList>
            </Route>
          </Switch>
          <Footer></Footer>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
