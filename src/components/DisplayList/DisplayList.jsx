import React, { useState, useEffect, useContext } from "react";
import styles from "./styles.module.css";
import { URL_BASE, tokenKey } from "../../constants";
import ListCreate from "../ListCreate/ListCreate";
import ListContext from "../../contexts/listContext";
import List from "../Lists/Lists";

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
        console.log("datos de lista", data);
        setLists(data.data);
        setListId(data.data.list.id);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchLists();
  }, []);

  const handleListCreated = (newList) => {
    setLists([...lists, newList]);
  };

  return (
    <div>
      <ul className={styles.listGrid}>
        {lists.map((list) => (
          <li key={list.list_id} className={styles.boardItem}>
            <List title={list.title} listId={list.list_id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DisplayList;
