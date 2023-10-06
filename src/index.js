import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import "./normalize.css";
import "./reset.css";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "./app/store/createStore";

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = createStore();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
