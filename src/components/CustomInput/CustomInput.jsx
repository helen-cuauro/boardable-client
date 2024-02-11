import React from "react";
import styles from "./styles.module.css";

const CustomInput = ({ label, value, onChange }) => {
  return (
    <div className={styles["input-title-label"]}>
      <label htmlFor="board-title" className={styles.label}>
        {label}
      </label>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomInput;
