import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./contexts/authContext.jsx";

import Router from "./Router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>
);
