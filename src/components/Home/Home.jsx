import styles from "./styles.module.css";
import logo from "../../assets/Vector.svg";
import Header from "../Header";
import BoardSort from "../BoardSort/BoardSort";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tokenKey } from "../../constants";
import DisplayBoard from "../DisplayBoard/DisplayBoard";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem(tokenKey);
    if (!token) {
      navigate("/signup"); 
    }
  }, [navigate]);
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.container}>
          <div className={styles.boards}>
            <BoardSort />
            <DisplayBoard />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
