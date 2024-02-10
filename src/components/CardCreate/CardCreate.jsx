import React, { useContext, useState } from "react";
import { URL_BASE, tokenKey } from "../../constants";

function CardCreate({ listId, onCardCreated }) {
  const [title, setTitle] = useState("");

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
      onCardCreated({ title });
      setTitle("");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleAddCard}>
        <input
          type="text"
          placeholder="Enter card title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">confirmar</button>
      </form>
    </div>
  );
}

export default CardCreate;