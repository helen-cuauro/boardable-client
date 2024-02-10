import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { URL_BASE, tokenKey } from "../../constants";

function ListCreate({ boardId, onListCreated }) {
 

  const [title, setTitle] = useState("");

  const handleAddList = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem(tokenKey);

    const body = {
      title: title,
      board_id: boardId,
    };

    console.log("Body de la solicitud:", body);

    try {
      const response = await fetch(`${URL_BASE}/boards/${boardId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Error al crear lista");
      }
      const data = await response.json();
      onListCreated({ title });
      setTitle("");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <h2>Create List</h2>
      <form onSubmit={handleAddList}>
        <input
          type="text"
          placeholder="Enter list title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add List</button>
      </form>
    </div>
  );
}

export default ListCreate;