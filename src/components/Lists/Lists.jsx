import { useState } from "react";
import styles from "./styles.module.css";
import edit from "../../assets/edit.svg";

function List() {
  const [showEdit, setShowEdit] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState("mi primera tarjeta");

  const handleEditClick = () => {
    setShowEdit(!showEdit);
    setShowOptions(!showOptions);
  };

  const handleEditOptionClick = () => {
    setIsEditing(!isEditing);
    setShowOptions(false);
  };

  const handleDeleteOptionClick = () => {
    setShowEdit(false);
    setShowOptions(false);
  };

  const handleConfirmClick = () => {
    setShowEdit(false);
    setIsEditing(false);
    setShowOptions(false);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles["title-list"]}>
          <span className={styles.title}>to do</span>
          <button
            className={`${styles["action-button"]} ${
              showOptions ? styles.transparent : ""
            }`}
            type="button"
            onClick={handleEditClick}
          >
            <img className={styles.edit} src={edit} alt="Edit" />
          </button>
          {showEdit && showOptions && (
            <div className={styles["edit-list"]}>
              <button onClick={handleEditOptionClick}>Editar</button>
              <button onClick={handleDeleteOptionClick}>Eliminar</button>
            </div>
          )}
        </div>
        <div className={styles["content-card"]}>
          {isEditing ? (
            <>
              <input
                type="text"
                className={styles.content}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <button onClick={handleConfirmClick}>Confirmar</button>
            </>
          ) : (
            <>
              <span className={styles.content}>{editText}</span>
              <img className={styles.edit} src={edit} alt="Edit" />
            </>
          )}
        </div>
        <span className={styles["add-card"]}>+ add card</span>
      </div>
    </>
  );
}

export default List;
