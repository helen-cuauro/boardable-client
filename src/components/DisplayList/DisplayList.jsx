import React, { useState, useEffect, useContext } from "react";
import styles from "./styles.module.css";
import { URL_BASE, tokenKey } from "../../constants";
import ListCreate from "../ListCreate/ListCreate";
import ListContext from "../../contexts/listContext";
import List from "../List/List";

function DisplayList({ boardId }) {
  const { setListTitle, setListId } = useContext(ListContext);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const token = localStorage.getItem(tokenKey);
        const response = await fetch(`${URL_BASE}/boards/${boardId}/lists`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error al obtener las listas");
        }
        const data = await response.json();
        setLists(data.data);
        setListId(data.data.list.id);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchLists();
  }, []);

  const handleListDeleted = (deletedListId) => {
    setLists(lists.filter(list => list.list_id !== deletedListId));
  };

  const handleListCreated = (newList) => {
    setLists([...lists, newList]);
  };

  return (
    <div className={`${styles.container} ${styles.scrollableContainer}`}>
      <ul className={styles.display}>
        {lists.map((list) => (
          <li key={list.list_id} className={styles.boardItem}>
            <List title={list.title} listId={list.list_id} onListDeleted={handleListDeleted}  />
          </li>
        ))}
      </ul>
      <ListCreate boardId={boardId} onListCreated={handleListCreated} />
    </div>
  );
}

export default DisplayList;
