import styles from "./styles.module.css";
import edit from "../../assets/edit.svg";

function List() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles["title-list"]}>
          <spam className={styles.title}>to do</spam>
          <img className={styles.edit} src={edit} />
        </div>
        <div className={styles["content-card"]}>
          <spam className={styles.content}>mi primera tarjeta</spam>
          <img className={styles.edit} src={edit} />
        </div>
        <spam className={styles["add-card"]}>+ add card</spam>
      </div>
    </>
  );
}

export default List;
