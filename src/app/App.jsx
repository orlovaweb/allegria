import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Main from "./layouts/main";
import AboutUs from "./layouts/aboutUs";
import Brands from "./layouts/brands";
import Goods from "./layouts/goods";
import Header from "./components/ui/header";
import Faq from "./components/pages/faq";
import Footer from "./components/ui/footer";
import RegisterForm from "./components/pages/registerForm/registerForm";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="page">
      <Header />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/aboutUs" component={AboutUs} />
        <Route path="/brands" component={Brands} />
        <Route path="/goods/:productId?" component={Goods} />
        <Route path="/faq" component={Faq} />
        <Route path="/register" component={RegisterForm} />
        <Redirect to="/goods" />
      </Switch>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
