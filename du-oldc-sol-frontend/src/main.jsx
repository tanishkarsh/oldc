import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Global CSS
import "./index.css";
import "./styles/Responsive.css";

// Custom Styles
import "./styles/app.css";
import "./styles/Navbar.css";
import "./styles/LeftPanel.css";
import "./styles/ChatWindow.css";
import "./styles/Message.css";
import "./styles/input.css";
import "./styles/QuickCards.css";
import "./styles/chatcard.css";
import "./styles/Responsive.css";
import "./styles/Variables.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);