import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProtectedRoute from "./components/common/protectedRoute";
import Account from "./components/pages/account/account";
import Faq from "./components/pages/faq";
import RegisterForm from "./components/pages/registerForm/registerForm";
import Footer from "./components/ui/footer";
import Header from "./components/ui/header";
import AppLoader from "./components/ui/hoc/appLoader";
import AboutUs from "./layouts/aboutUs";
import Admin from "./layouts/adminPage/admin";
import Brands from "./layouts/brands";
import Favorite from "./layouts/favorite";
import Goods from "./layouts/goods";
import LogOut from "./layouts/logOut";
import Main from "./layouts/main";
import ShoppingCart from "./layouts/shoppingCart";

function App() {
  const [modalLogin, setModalLogin] = useState(false);

  return (
    <div className="page">
      <AppLoader>
        <Header setModalLogin={setModalLogin} />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/aboutUs" component={AboutUs} />
          <Route path="/brands" component={Brands} />
          <Route path="/faq" component={Faq} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/admin" component={Admin} />
          <ProtectedRoute path="/account" component={Account} />
          <Route path="/goods/:productArt?" component={Goods} />
          <Route path="/favorite" component={Favorite} />
          <Route
            path="/shoppingCart"
            render={(props) => (
              <ShoppingCart {...props} setModalLogin={setModalLogin} />
            )}
          />
          <Route path="/logout" component={LogOut} />
          <Redirect to="/goods" />
        </Switch>
        <Footer modalLogin={modalLogin} setModalLogin={setModalLogin} />
      </AppLoader>
      <ToastContainer transition={Slide} />
    </div>
  );
}

export default App;
