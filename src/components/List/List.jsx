import styles from "./styles.module.css";
import edit from "../../assets/edit.svg";
import DisplayCard from "../DisplayCard/DisplayCard";
import CardCreate from "../CardCreate/CardCreate";
import { URL_BASE, tokenKey } from "../../constants";
import Toggle from "../Toggle/Toggle";
import { useState } from "react";

function List({ title, listId, onListDeleted }) {
  const [editBoard, setEditBoard] = useState(false);

  const handleEditButtonClick = () => {
    setEditBoard(true);
  };

  const handleDeleteList = async () => {
    try {
      const token = localStorage.getItem(tokenKey);
      const response = await fetch(`${URL_BASE}/lists/${listId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar lista");
      }

      onListDeleted(listId);
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
          <Toggle
            onToggle={handleEditButtonClick}
            onDelete={handleDeleteList}
            editBoard={editBoard}
          />
        </div>
        <DisplayCard listId={listId} />
      </div>
    </>
  );
}

export default List;
