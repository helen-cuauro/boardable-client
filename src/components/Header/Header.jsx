import React from "react";
import styles from "./styles.module.css";
import logo from "../../assets/Vector.svg";
import Logout from "../Logout/Logout";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

  const handleMyAccountClick = () => {
    navigate("/myaccount");
  };

  return (
    <div className={styles.barra}>
      <div className={styles.header}>
        <img src={logo} className={styles.logo} alt="Logo" />
        <h1 className={styles.title}>Boardable</h1>
      </div>
      <div className={styles.navegate}>
        <button onClick={handleMyAccountClick} className={styles.button}>My account</button>
        <Logout />
      </div>
    </div>
  );
}

export default Header;
