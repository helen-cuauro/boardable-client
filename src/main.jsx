import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./contexts/authContext.jsx";

import Router from "./Router.jsx";
import { BoardProvider } from "./contexts/boardContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BoardProvider>
        <Router />
      </BoardProvider>
    </AuthProvider>
  </React.StrictMode>
);
