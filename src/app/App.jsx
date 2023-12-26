import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  NavLink,
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation
} from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Modal from "./components/common/modal";
import ProtectedRoute from "./components/common/protectedRoute";
import Account from "./components/pages/account/account";
import Faq from "./components/pages/faq";
import RegisterForm from "./components/pages/registerForm/registerForm";
import Footer from "./components/ui/footer";
import Header from "./components/ui/header";
import AppLoader from "./components/ui/hoc/appLoader";
import LoginForm from "./components/ui/loginForm";
import AboutUs from "./layouts/aboutUs";
import Admin from "./layouts/adminPage/admin";
import Brands from "./layouts/brands";
import Favorite from "./layouts/favorite";
import Goods from "./layouts/goods";
import LogOut from "./layouts/logOut";
import Main from "./layouts/main";
import ShoppingCart from "./layouts/shoppingCart";
import { getEmailResetedPassword, removeError } from "./store/users";
import ForgotPasswordForm from "./components/ui/forgotPasswordForm";

function App() {
  const [modalLogin, setModalLogin] = useState(false);
  const [modalForgotPassword, setModalForgotPassword] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const emailResetedPassword = useSelector(getEmailResetedPassword());
  useEffect(() => {
    if (history.state?.from == "registerForm") {
      setModalLogin(true);
      history.state = {};
    }
  }, [location.pathname]);
  const handleCloseModalLogin = () => {
    setModalLogin(false);
  };
  useEffect(() => {
    if (modalLogin) {
      dispatch(removeError());
    }
  }, [modalLogin]);
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
        <Footer />
        <Modal active={modalLogin} setActive={setModalLogin} isForm={true}>
          <div className="modal-login">
            <h1 className="modal-title">Вход</h1>
            <LoginForm onSubmit={handleCloseModalLogin} />
            <div className="alternative-entry">
              <button
                className="forgot-password"
                onClick={() => {
                  setModalForgotPassword(true);
                  setModalLogin(false);
                }}
              >
                Забыли пароль
              </button>
              <span className="alternative-entry__slash">/</span>
              <NavLink
                className="link-to-register"
                to="/register"
                onClick={() => setModalLogin(false)}
              >
                У меня нет аккаунта
              </NavLink>
            </div>
          </div>
        </Modal>
        <Modal
          active={modalForgotPassword}
          setActive={setModalForgotPassword}
          isForm={true}
        >
          <div className=" modal-login">
            <h1 className="modal-title forgot-password-title">
              Восстановить пароль
            </h1>
            {emailResetedPassword ? (
              <div>
                <p>Ссылка для восстановления пароля отправлена на</p>
                <span>{emailResetedPassword}</span>
              </div>
            ) : (
              <ForgotPasswordForm />
            )}
          </div>
        </Modal>
      </AppLoader>
      <ToastContainer transition={Slide} />
    </div>
  );
}

export default App;
