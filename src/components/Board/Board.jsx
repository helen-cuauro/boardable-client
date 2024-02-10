import React, { useContext } from "react";
import Header from "../Header";
import Lists from "../Lists/Lists";
import styles from "./styles.module.css";
import edit from "../../assets/edit.svg";
import BoardContext from "../../contexts/boardContext";
import ListCreate from "../ListCreate/ListCreate";
import DisplayList from "../DisplayList/DisplayList";

function Board() {
  const { boardTitle, boardBackgroundColor, boardId } =
    useContext(BoardContext);

  console.log("Valor de boardId en Board:", boardId);

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
            <img className={styles.edit} src={edit} alt="Edit" />
          </div>

          <div className={styles.list}>
            <DisplayList boardId={boardId} />
            <ListCreate boardId={boardId} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Board;
