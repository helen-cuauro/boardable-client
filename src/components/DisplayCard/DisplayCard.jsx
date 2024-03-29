import React, { useState, useEffect, useContext } from "react";
import styles from "./styles.module.css";
import { URL_BASE, tokenKey } from "../../constants";
import CardContext from "../../contexts/cardContex";
import Card from "../Card/Card";
import CardCreate from "../CardCreate/CardCreate";

function DisplayCard({ listId }) {
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
        setCarts(data.data);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchCards();
  }, []);

  const handleCardDeleted = (deletedCardId) => {
    setCarts(cards.filter((card) => card.card_id !== deletedCardId));
  };

  const handleListCreated = (newCard) => {
    setCarts([...cards, newCard]);
  };

  return (
    <div>
      <ul className={styles.cards}>
        {cards.map((card) => (
          <li key={card.id} className={styles.card}>
            <Card
              cardId={card.card_id}
              title={card.title}
              onCardDeleted={handleCardDeleted}
            />
          </li>
        ))}
      </ul>
      <CardCreate listId={listId} onCardCreated={handleListCreated}/>
    </div>
  );
}

export default DisplayCard;
