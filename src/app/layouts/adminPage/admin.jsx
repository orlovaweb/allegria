import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AdminNavBar from "../../components/ui/adminParts/adminNavBar";
import "./admin.css";
import AdminGoods from "../../components/ui/adminParts/adminGoods";
import AdminCategories from "../../components/ui/adminParts/adminCategories";
import AdminBrands from "../../components/ui/adminParts/adminBrands";
import AdminLetters from "../../components/ui/adminParts/adminLetters";
import AdminUsers from "../../components/ui/adminParts/adminUsers";
import AdminInitial from "../../components/ui/adminParts/adminInitial";
const Admin = () => {
  return (
    <section className="admin">
      <h1 className="admin__title"> Панель администратора</h1>
      <div className="container">
        <div className="admin-wrapper">
          <div className="admin__navigation">
            <AdminNavBar />
          </div>
          <div className="admin__content">
            <Switch>
              <Route path="/admin/goods" component={AdminGoods} />
              <Route path="/admin/categories" component={AdminCategories} />
              <Route path="/admin/brands" component={AdminBrands} />
              <Route path="/admin/letters" component={AdminLetters} />
              <Route path="/admin/users" component={AdminUsers} />
              <Route path="/admin/initial" component={AdminInitial} />
              <Redirect exact from="/admin" to="/admin/goods" />
            </Switch>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;
