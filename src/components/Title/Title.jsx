import edit from "../../assets/edit.svg";
import PatchRequest from "../PatchRequest/PatchRequest";
import styles from "./styles.module.css";
import { tokenKey } from "../../constants";

function Title({
  editingTitle,
  newTitle,
  handleTitleChange,
  handleToggleMenu,
  handleEdit,
  handleDelete,
  patchUrl,
  menuOpen,
  handleTitleUpdateSuccess,
  handleTitleUpdateError,
}) {
  return (
    <div className={styles["title-list"]}>
      {editingTitle ? (
        <div>
          <input type="text" value={newTitle} onChange={handleTitleChange} />
          <PatchRequest
            url={patchUrl} 
            token={localStorage.getItem(tokenKey)}
            data={{ title: newTitle }}
            onSuccess={handleTitleUpdateSuccess}
            onError={handleTitleUpdateError}
          />
        </div>
      ) : (
        <h1 className={styles.title}>{newTitle}</h1>
      )}
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
    </div>
  );
}

export default Title;
