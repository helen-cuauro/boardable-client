import { useState } from "react";
import styles from "./styles.module.css";
import edit from "../../assets/edit.svg";
import DisplayCard from "../DisplayCard/DisplayCard";
import { URL_BASE, tokenKey } from "../../constants";
import Toggle from "../Toggle/Toggle";

function Card({ title, cardId }) {
  console.log("cardid", cardId);

  const handleDeleteCard = async () => {
    try {
      const token = localStorage.getItem(tokenKey);
      const response = await fetch(`${URL_BASE}/cards/${cardId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar lista");
      }

      console.log("lista eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar lista:", error.message);
    }
  };
  return (
    <>
    <div className={styles.container}>
    <div className={styles["title-list"]}>
        <span className={styles.title}>{title}</span>
        <Toggle />
      </div>

    </div>
     
    </>
  );
}

export default Card;
