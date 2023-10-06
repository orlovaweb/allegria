import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
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

function App() {
  return (
    <div className="page">
      <AppLoader>
        <Header />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/aboutUs" component={AboutUs} />
          <Route path="/brands" component={Brands} />
          <Route path="/faq" component={Faq} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/admin" component={Admin} />

          <Route path="/goods/:productId?" component={Goods} />

          <Redirect to="/goods" />
        </Switch>
        <Footer />
      </AppLoader>
      <ToastContainer />
    </div>
  );
}

export default App;
