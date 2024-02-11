import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { URL_BASE, tokenKey } from "../../constants";
import Header from "../Header";
import styles from "./styles.module.css";
import BoardContext from "../../contexts/boardContext";
import DisplayList from "../DisplayList/DisplayList";
import Title from "../Title/Title";

function Board() {
  const { boardTitle, boardBackgroundColor, boardId } =
    useContext(BoardContext);
  const navigate = useNavigate();
  const [editingTitle, setEditingTitle] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(() => {
    const storedTitle = localStorage.getItem("editedTitle");
    return storedTitle ? storedTitle : boardTitle;
  });

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleEdit = () => {
    setEditingTitle(true);
    setMenuOpen(false);
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleTitleUpdateSuccess = () => {
    setEditingTitle(false);
    localStorage.removeItem("editedTitle");
    localStorage.setItem("editedTitle", newTitle);
    handleSaveTitleLocally();
  };

  const handleTitleUpdateError = (error) => {
    console.error("Error al actualizar el título del tablero:", error.message);
  };

  const handleDelete = async () => {
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

  const handleSaveTitleLocally = () => {
    localStorage.setItem("editedTitle", newTitle);
  };

  useEffect(() => {
    if (!boardId) {
      const storedBoardId = localStorage.getItem("boardId");
      if (!storedBoardId) {
        navigate("/home");
      }
    }
  }, [boardId, navigate]);

  console.log("Valor de boardId:", boardId);

  return (
    <>
      <Header />
      <div
        className={styles.container}
        style={{ backgroundColor: boardBackgroundColor }}
      >
        <div className={styles["container-list"]}>
          <div className={styles["title-list"]}>
            <Title
              editingTitle={editingTitle}
              newTitle={newTitle}
              handleTitleChange={handleTitleChange}
              handleToggleMenu={handleToggleMenu}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              patchUrl={`${URL_BASE}/boards/${boardId}`}
              menuOpen={menuOpen}
              handleTitleUpdateSuccess={handleTitleUpdateSuccess}
              handleTitleUpdateError={handleTitleUpdateError}
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
