import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { URL_BASE, tokenKey } from "../../constants";
import Header from "../Header";
import styles from "./styles.module.css";
import edit from "../../assets/edit.svg";
import BoardContext from "../../contexts/boardContext";
import ListCreate from "../ListCreate/ListCreate";
import DisplayList from "../DisplayList/DisplayList";
import Toggle from "../Toggle/Toggle";

function Board() {
  const { boardTitle, boardBackgroundColor, boardId } =
    useContext(BoardContext);
  const navigate = useNavigate();
  const [editBoard, setEditBoard] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(boardTitle);
  useEffect(() => {
    const storedBoardId = localStorage.getItem("boardId");

    if (!storedBoardId) {
      // Si no hay un boardId almacenado, redirige a la página de inicio
      navigate("/home");
    }
  }, [navigate]);

  console.log("Valor de boardId en Board:", boardId);

  const handleEditBoard = async (event) => {
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const updateData = { title: data.title }; // Solo conservar el título para actualizar

    console.log("Datos enviados en la solicitud PATCH:", updateData);

    try {
      const token = localStorage.getItem(tokenKey);
      console.log("Token de autorización:", token);
      const response = await fetch(`${URL_BASE}/boards/${boardId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el tablero");
      }

      console.log("Tablero actualizado correctamente");
      setEditingTitle(false);
    } catch (error) {
      console.error("Error al actualizar el tablero:", error.message);
    }
  };

  const handleDeleteBoard = async () => {
    try {
      const token = localStorage.getItem(tokenKey);
      const response = await fetch(`${URL_BASE}/boards/${boardId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar tablero");
      }

      navigate("/");

      console.log("tablero eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar tablero:", error.message);
    }
  };

  const handleEditButtonClick = () => {
    setEditBoard(true);
  };

  return (
    <>
      <Header />
      <div
        className={styles.container}
        style={{ backgroundColor: boardBackgroundColor }}
      >
        <div className={styles["container-list"]}>
          <div className={styles["title-list"]}>
            <h1 className={styles.title}>{boardTitle}</h1>
            <Toggle
              onToggle={handleEditButtonClick}
              onDelete={handleDeleteBoard}
              editBoard={editBoard}
            />
          </div>

          <div
            className={`${styles.listContainer} ${styles.scrollableContainer}`}
          >
            <div className={styles.list}>
              <DisplayList boardId={boardId} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Board;
