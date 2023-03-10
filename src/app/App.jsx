import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Main from "./layouts/main";
import AboutUs from "./layouts/aboutUs";
import Brands from "./layouts/brands";
import Goods from "./layouts/goods";
import Header from "./components/header";
import Faq from "./layouts/faq";
import Footer from "./components/footer";

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
        <Redirect to="/goods" />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
