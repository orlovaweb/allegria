import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AccountNavBar from "../../ui/account/accountNavBar";
import ChangePassword from "../../ui/account/changePassword";
// import Favorite from "../favorite";
import PersonalAdress from "../../ui/account/personalAdress";
import PersonalHistory from "../../ui/account/personalHistory";
import PersonalInfo from "../../ui/account/personalInfo";
import "./account.css";

const Account = () => {
  return (
    <section className="account">
      <div className="account__title">
        <h2>Мой аккаунт</h2>
      </div>
      <div className="narrow-container">
        <div className="account-wrapper">
          <div className="account__navigation">
            <AccountNavBar />
          </div>
          <div className="account__content">
            <Switch>
              <Route path="/account/personalInfo" component={PersonalInfo} />
              <Route path="/account/adress" component={PersonalAdress} />
              {/* <Route path="/account/favorite" component={Favorite} /> */}
              <Route path="/account/history" component={PersonalHistory} />
              <Route
                path="/account/changePassword"
                component={ChangePassword}
              />
              <Redirect exact from="/account" to="/account/personalInfo" />
            </Switch>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Account;
