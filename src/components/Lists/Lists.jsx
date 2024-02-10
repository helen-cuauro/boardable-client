import { useState } from "react";
import styles from "./styles.module.css";
import edit from "../../assets/edit.svg";

function List({ title }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles["title-list"]}>
          <span className={styles.title}>{title}</span>
          <button className={styles["action-button"]} type="button">
            <img className={styles.edit} src={edit} alt="Edit" />
          </button>
        </div>
        <div className={styles["content-card"]}>
          <span className={styles.content}>txt</span>
          <img className={styles.edit} src={edit} alt="Edit" />
        </div>
        <span className={styles["add-card"]}>+ add card</span>
      </div>
    </>
  );
}

export default List;
