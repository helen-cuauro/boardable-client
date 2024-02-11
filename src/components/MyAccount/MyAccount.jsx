import Header from "../Header";
import styles from "./styles.module.css";
import { URL_BASE, tokenKey } from "../../constants";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MyAccount() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate("/signup");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const updateData = {};
    for (const key in data) {
      if (data[key]) {
        updateData[key] = data[key];
      }
    }

    console.log("Datos enviados en la solicitud PATCH:", data);

    try {
      const token = localStorage.getItem(tokenKey);
      console.log("Token de autorización:", token);
      const response = await fetch(`${URL_BASE}/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el usuario");
      }

      console.log("Usuario actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el usuario:", error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem(tokenKey);
      const response = await fetch(`${URL_BASE}/me`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al eliminar la cuenta");
      }

      localStorage.removeItem(tokenKey);
      localStorage.removeItem("username");

      navigate("/signup");

      console.log("Cuenta eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar la cuenta:", error.message);
    }
  };

  return (
    <>
      <Header />

      <div className={styles.container}>
        <h1 className={styles.title}>My Account</h1>
        <div className={styles["conatainer-form"]}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles["input-group"]}>
              <label htmlFor="username" className={styles.label}>
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className={styles.input}
                value={username}
              />
            </div>
            <div className={styles["input-group"]}>
              <label htmlFor="Name" className={styles.label}>
                Name
              </label>
              <input
                type="text"
                id="Name"
                name="Name"
                className={styles.input}
              />
            </div>
            <div className={styles["input-group"]}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className={styles.input}
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
                className={styles.input}
              />
            </div>
            <button type="submit" className={styles["button-update"]}>
              Update
            </button>
            <button
              onClick={handleDeleteAccount}
              type="button"
              className={styles["button-delete"]}
            >
              Delete my account
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default MyAccount;
