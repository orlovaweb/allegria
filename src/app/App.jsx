import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Faq from "./components/pages/faq";
import RegisterForm from "./components/pages/registerForm/registerForm";
import Footer from "./components/ui/footer";
import Header from "./components/ui/header";
import AppLoader from "./components/ui/hoc/appLoader";
import AboutUs from "./layouts/aboutUs";
import Admin from "./layouts/adminPage/admin";
import Brands from "./layouts/brands";
import Goods from "./layouts/goods";
import Main from "./layouts/main";
import Account from "./components/pages/account/account";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import Favorite from "./layouts/favorite";
import ShoppingCart from "./layouts/shoppingCart";

function App() {
  const [modalLogin, setModalLogin] = useState(false);
  return (
    <div className="page">
      <AppLoader>
        <Header modalLogin={modalLogin} setModalLogin={setModalLogin} />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/aboutUs" component={AboutUs} />
          <Route path="/brands" component={Brands} />
          <Route path="/faq" component={Faq} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/admin" component={Admin} />
          <ProtectedRoute path="/account" component={Account} />
          <Route path="/goods/:productId?" component={Goods} />
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
        <Footer />
      </AppLoader>
      <ToastContainer transition={Slide} />
    </div>
  );
}

export default App;
