import React, { useState, useEffect, useContext } from "react";
import styles from "./styles.module.css";
import { URL_BASE, tokenKey } from "../../constants";
import CardContext from "../../contexts/cardContex";
import Card from "../Card/Card";

function DisplayCard({ listId }) {
  // const { setCardTitle, setCardId } = useContext(CardContext);
  const [cards, setCarts] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const token = localStorage.getItem(tokenKey);
        const response = await fetch(`${URL_BASE}/lists/${listId}/cards`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Error al obtener las cartas");
        }
        const data = await response.json();
        console.log("datos de cartas", data);
        setCarts(data.data);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchCards();
  }, []);

  const handleListCreated = (newCard) => {
    setCarts([...cards, newCard]);
  };

  return (
    <div>
      <ul className={styles.listGrid}>
        {cards.map((card) => (
          <li key={card.id} className={styles.boardItem}>
            <Card  cardId={card.card_id} title={card.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DisplayCard;
