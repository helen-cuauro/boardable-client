import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import MyAccount from "./components/MyAccount/MyAccount";
import Board from "./components/Board/Board";
import ListCreate from "./components/ListCreate/ListCreate";
import DisplayList from "./components/DisplayList/DisplayList";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/boards" element={<Board />} />
        <Route path="/boards/${board.board_id}" element={<ListCreate />} />
        <Route
          path="/boards/${board.board_id}/list"
          element={<DisplayList />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
