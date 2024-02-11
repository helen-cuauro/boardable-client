import styles from "./styles.module.css";
import DisplayCard from "../DisplayCard/DisplayCard";
import { URL_BASE, tokenKey } from "../../constants";
import Title from "../Title/Title";

import { useState } from "react";

function List({ title, listId, onListDeleted }) {
  const [editBoard, setEditBoard] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleEditButtonClick = () => {
    setEditBoard(true);
    setEditingTitle(true);
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleTitleUpdateSuccess = () => {
    setEditingTitle(false);
  };

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
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
        <Title
          editingTitle={editingTitle}
          newTitle={newTitle}
          handleTitleChange={handleTitleChange}
          handleToggleMenu={handleToggleMenu}
          handleEdit={handleEditButtonClick}
          handleDelete={handleDeleteList}
          patchUrl={`${URL_BASE}/lists/${listId}`}
          menuOpen={menuOpen}
          handleTitleUpdateSuccess={handleTitleUpdateSuccess}
        />
        <DisplayCard listId={listId} />
      </div>
    </>
  );
}

export default List;
