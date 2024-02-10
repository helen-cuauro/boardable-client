import React, { useState, useEffect, useContext } from "react";
import styles from "./styles.module.css";
import { URL_BASE, tokenKey } from "../../constants";
import { Link } from "react-router-dom";
import BoardContext from "../../contexts/boardContext";
import BoardCreate from "../BoardCreate/BoardCreate";

function BoardList() {
  const { setBoardTitle, setBoardBackgroundColor } = useContext(BoardContext);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const token = localStorage.getItem(tokenKey);
        const response = await fetch(`${URL_BASE}/boards`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error al obtener los tableros");
        }
        const data = await response.json();

        setBoards(data.data);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchBoards();
  }, []);

  const handleBoardCreated = (newBoard) => {
    setBoards([...boards, newBoard]);
  };

  return (
    <div>
      <ul className={styles.boardGrid}>
        <BoardCreate onBoardCreated={handleBoardCreated} />
        {boards.map((board) => (
          <Link
            to="/board"
            className={styles.boardLink}
            onClick={() => {
              setBoardTitle(board.title);
              setBoardBackgroundColor(board.background_color);
            }}
          >
            <li
              key={board.id}
              className={styles.boardItem}
              style={{ backgroundColor: board.background_color }}
            >
              <h1 className={styles.boardTitle}>{board.title}</h1>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default BoardList;
