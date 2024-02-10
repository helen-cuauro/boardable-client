import * as React from "react";
import styles from "./styles.module.css";
import color from "../../assets/color.svg";
import { useState } from "react";

const colors = [
  "#E2E8F0",
  "#FECACA",
  "#FED7AA",
  "#FEF08A",
  "#D9F99D",
  "#BFDBFE",
  "#FBCFE8",
  "#DDD6FE",
];

const ColorPicker = ({ name, onChange }) => {
  const [showColors, setShowColors] = useState(false);

  const handleClick = () => {
    setShowColors(!showColors);
  };

  return (
    <div className={styles.wrapper}>
      {showColors && (
        <div className={styles.colors}>
          {colors.map((color) => (
            <div
              key={color}
              className={styles.color}
              style={{ backgroundColor: color }}
              onClick={() => {
                onChange(color);
                setShowColors(false);
              }}
            />
          ))}
        </div>
      )}
      <button
        className={styles["action-button"]}
        type="button"
        onClick={handleClick}
        aria-label={name}
      >
        <img src={color} alt={name} />
      </button>
    </div>
  );
};

export default ColorPicker;


