import React, { useState } from "react";
import styles from "./styles.module.css";
import Form from "../Form/Form";
import { useAuth } from "../../contexts/authContext";
import logo from "../../assets/Vector.svg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import flecha from "../../assets/arrow-right.svg";

function Signup() {
  const { signup } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (userData) => {
    const { username, password } = userData;

    setIsSubmitting(true);

    try {
      await signup(username, password);
      setSuccessMessage("¡Cuenta creada con éxito!");
      setError(null);
      navigate("/");
    } catch (error) {
      setError("Error al crear la cuenta. Por favor, inténtalo de nuevo.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <img src={logo} />
      <h1 className={styles.title}>Welcome to Boardable</h1>
      <Form
        type="signup"
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        error={error}
        successMessage={successMessage}
      />
      <Link to="/login" className={styles.enlace}>
        Login to your account <img src={flecha} />
      </Link>
    </div>
  );
}

export default Signup;
