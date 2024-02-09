import { useState } from "react";
import styles from "./styles.module.css";
import { URL_BASE, tokenKey } from "../../constants";
import color from "../../assets/color.svg";

function BoardForm() {
  const [title, setTitle] = useState("");
  const [boards, setBoards] = useState([]);

  const handleAddBoard = async (e) => {
    e.preventDefault();

    // Obtener el token del localStorage
    const token = localStorage.getItem(tokenKey);

    const body = {
      title: title,
      background_color: "#FFC0CB",
    };

    try {
      const response = await fetch(URL_BASE + "/boards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Incluir el token como encabezado de autorización
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Error al crear el tablero");
      }
      const data = await response.json();
      setBoards(data);
      setTitle("");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <form
        className={styles["board-form"]}
        onSubmit={handleAddBoard}
        action=""
      >
        <div className={styles["input-title-label"]}>
          <label htmlFor="board-title" className={styles.label}>
            Board title
          </label>
          <input
            className={styles.input}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className={styles["form-options"]}>
          <div className={styles.color}>
            <spam className={styles["color-title"]}>Color</spam>
            <img src={color} />
          </div>
          <button className={styles["button-form"]} type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default BoardForm;
