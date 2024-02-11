import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { URL_BASE, tokenKey } from "../../constants";
import styles from "./styles.module.css";

function ListCreate({ boardId, onListCreated }) {
  const [title, setTitle] = useState("");

  const handleAddList = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem(tokenKey);

    const body = {
      title: title,
      board_id: boardId,
    };

    console.log("Body de la solicitud:", body);
    try {
      const response = await fetch(`${URL_BASE}/boards/${boardId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Error al crear lista");
      }
      const data = await response.json();
      onListCreated(data.data);
      setTitle("");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles["title-list"]}>
        <span className={styles.title}>List Title</span>
        <form onSubmit={handleAddList}>
          <input
            type="text"
            placeholder="Enter list title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className={styles.button} type="submit">
            Create new list
          </button>
        </form>
      </div>
    </div>
  );
}

export default ListCreate;
