import React, { useContext, useState } from "react";
import { URL_BASE, tokenKey } from "../../constants";
import CustomInput from "../CustomInput/CustomInput";
import styles from "./styles.module.css";

function CardCreate({ listId, onCardCreated }) {
  const [title, setTitle] = useState("");
  const [showCardInput, setShowCardInput] = useState(false);

  const handleToggleCardInput = () => {
    setShowCardInput(!showCardInput);
  };

  const handleAddCard = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem(tokenKey);

    const body = {
      title: title,
      list_id: listId,
    };

    console.log("Body de la solicitud:", body);

    try {
      const response = await fetch(`${URL_BASE}/lists/${listId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Error al crear la carta");
      }
      const data = await response.json();
      setTitle("");
      onCardCreated(data.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleCancel = () => {
    setTitle("");
    setShowCardInput(false);
  };

  return (
    <div>
      {showCardInput ? (
        <form onSubmit={handleAddCard} className={styles.form}>
          <CustomInput
            label="Card Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className={styles.buttons}>
            <button className={styles.buttonadd} type="submit">
              Add card
            </button>
            <button
              className={styles.buttonx}
              type="button"
              onClick={handleCancel}
            >
              cancel
            </button>
          </div>
        </form>
      ) : (
        <span className={styles["add-card"]} onClick={handleToggleCardInput}>
          + add card
        </span>
      )}
    </div>
  );
}

export default CardCreate;
