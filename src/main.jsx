import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./contexts/authContext.jsx";
import Router from "./Router.jsx";
import { BoardProvider } from "./contexts/boardContext.jsx";
import { ListProvider } from "./contexts/listContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BoardProvider>
        <ListProvider>
          <Router />
        </ListProvider>
      </BoardProvider>
    </AuthProvider>
  </React.StrictMode>
);
