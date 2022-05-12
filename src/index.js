import React from "react";
import ReactDOM from "react-dom";
// mui Css
import "./index.css";
import App from "./views/App";
import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
