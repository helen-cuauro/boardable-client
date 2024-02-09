import React, { useContext } from "react";
import Header from "../Header";
import Lists  from "../Lists/Lists";
import styles from "./styles.module.css";
import edit from "../../assets/edit.svg";
import BoardContext from "../../contexts/boardContext";

function Board() {
  const { boardTitle } = useContext(BoardContext);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles["container-list"]}>
          <div className={styles["title-list"]}>
            <h1 className={styles.title}>{boardTitle}</h1>
            <img className={styles.edit} src={edit} alt="Edit" />
          </div>

          <div className={styles.list}>
            <Lists />
            <Lists />
            <Lists />
          </div>
        </div>
      </div>
    </>
  );
}

export default Board;
