import styles from "./styles.module.css";
import logo from "../../assets/Vector.svg";
import Header from "../Header";
import BoardList from "../BoardList";
import BoardSort from "../BoardSort/BoardSort";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tokenKey } from "../../constants";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem(tokenKey);
    if (!token) {
      navigate("/signup"); // Redirigir a la página de registro si no hay token
    }
  }, [navigate]);
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.container}>
          <div className={styles.boards}>
            <BoardSort />
            <BoardList />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
