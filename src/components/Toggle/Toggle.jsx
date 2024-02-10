import React, { useState } from "react";
import edit from "../../assets/edit.svg";
import styles from "./styles.module.css";

function Toggle({ onToggle, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleEdit = () => {
    onToggle();
    setMenuOpen(false);
  };

  const handleDelete = () => {
    onDelete();
    setMenuOpen(false);
  };

  return (
    <div className={styles.toggleContainer}>
      <img
        className={styles.edit}
        src={edit}
        alt="Edit"
        onClick={handleToggleMenu}
      />
      {menuOpen && (
        <div className={styles.menu}>
          <button className={styles.editar} onClick={handleEdit}>
            Editar
          </button>
          <button className={styles.editar} onClick={handleDelete}>
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}

export default Toggle;
