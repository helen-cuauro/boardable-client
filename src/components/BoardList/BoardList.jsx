import React, { useState, useEffect, useContext } from "react";
import styles from "./styles.module.css";
import { URL_BASE, tokenKey } from "../../constants";
import BoardForm from "../BoardForm/BoardForm";
import { Link } from "react-router-dom";
import BoardContext from "../../contexts/boardContext";

function BoardList() {
  const { setBoardTitle } = useContext(BoardContext);
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

  return (
    <div>
      <ul className={styles.boardGrid}>
        <BoardForm />
        {boards.map((board) => (
          <Link
            to="/board"
            className={styles.boardLink}
            onClick={() => setBoardTitle(board.title)}
          >
            <li key={board.id} className={styles.boardItem}>
              <h1 className={styles.boardTitle}>{board.title}</h1>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default BoardList;
