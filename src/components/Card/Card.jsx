import { useState } from "react";
import styles from "./styles.module.css";
import { URL_BASE, tokenKey } from "../../constants";
import Title from "../Title/Title";

function Card({ title, cardId, onCardDeleted }) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [menuOpen, setMenuOpen] = useState(false);

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
        throw new Error("Error al eliminar card");
      }
      onCardDeleted(cardId);
      console.log("card eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar card:", error.message);
    }
  };

  const handleEditButtonClick = () => {
    setEditingTitle(true);
    setMenuOpen(false);
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

  return (
    <>
      <div className={styles["title-list"]}>
        <Title
          editingTitle={editingTitle}
          newTitle={newTitle}
          handleTitleChange={handleTitleChange}
          handleToggleMenu={handleToggleMenu}
          handleEdit={handleEditButtonClick}
          handleDelete={handleDeleteCard}
          patchUrl={`${URL_BASE}/cards/${cardId}`} 
          menuOpen={menuOpen}
          handleTitleUpdateSuccess={handleTitleUpdateSuccess}
        
        />
      </div>
    </>
  );
}

export default Card;
