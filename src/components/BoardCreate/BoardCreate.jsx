import { useState } from "react";
import styles from "./styles.module.css";
import { URL_BASE, tokenKey } from "../../constants";
import color from "../../assets/color.svg";
import ColorPicker from "../ColorPicker/ColorPicker";
import CustomInput from "../CustomInput/CustomInput";

function BoardCreate({ onBoardCreated }) {
  const [title, setTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleAddBoard = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem(tokenKey);
    const body = {
      title: title,
      background_color: selectedColor || "#E2E8F0",
    };
    try {
      const response = await fetch(URL_BASE + "/boards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("Error al crear el tablero");
      }
      const data = await response.json();
      onBoardCreated(data.data)
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
        style={{ backgroundColor: selectedColor || "#E2E8F0" }}
      >
        <CustomInput
          label="Board Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className={styles["form-options"]}>
          <div className={styles.color}>
            <spam className={styles["color-title"]}>Color</spam>
            <ColorPicker
              name="boardColor"
              onChange={handleColorChange}
              selectedColor={selectedColor}
            />
          </div>
          <button className={styles["button-form"]} type="submit">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default BoardCreate;
