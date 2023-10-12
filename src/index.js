import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import App from "./app/App";
import { createStore } from "./app/store/createStore";
import "./index.css";
import "./normalize.css";
import reportWebVitals from "./reportWebVitals";
import "./reset.css";
import history from "./app/utils/history";

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = createStore();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
