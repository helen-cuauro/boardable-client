import React, { useState } from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

function Form({
  type,
  onSubmit,
  isSubmitting,
  error,
  successMessage,
  setError,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    onSubmit({ username, password });
    setRedirect(true);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      <div className={styles["input-group"]}>
        <label htmlFor="username" className={styles.label}>
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className={styles["input-group"]}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && (
          <spam className={styles.error} style={{ marginTop: "0.5rem" }}>
            {error}
          </spam>
        )}
      </div>
      <button
        type="submit"
        className={styles.button}
        disabled={isSubmitting}
        onClick={handleSubmit}
      >
        {isSubmitting
          ? type === "login"
            ? "Iniciando sesión..."
            : "Creando cuenta..."
          : type === "login"
          ? "Login"
          : "Signup"}
      </button>
      {redirect && <Link to="/">Redirecting...</Link>}
    </form>
  );
}

export default Form;
