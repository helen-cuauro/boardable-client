import * as React from "react";
import { useState } from "react";
import styles from "./styles.module.css";
import { useAuth } from "../../contexts/authContext";
import { useNavigate, Link } from "react-router-dom";
import Form from "../Form";
import logo from "../../assets/Vector.svg";
import flecha from "../../assets/arrow-right.svg";

function Login() {
  const { login, token } = useAuth();
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (userData) => {
    const { username, password } = userData;
    setError(false);
    setIsSubmitting(true);

    try {
      await login(username, password);
      // Si el login es exitoso, redirecciona a la página principal
      navigate("/");
    } catch (error) {
      setError(true);
    }
    setIsSubmitting(false);
  };

  React.useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className={styles.container}>
      <img src={logo} alt="Logo" />
      <h1 className={styles.title}>Welcome to Boardable</h1>
      <Form
        type="login"
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        error={error}
      />
      {error && <p className={styles.error}>Credenciales incorrectas. Por favor, inténtalo de nuevo.</p>}
      <Link to="/signup" className={styles.enlace}>
        Create an account <img src={flecha} alt="Arrow" />
      </Link>
    </div>
  );
}

export default Login;
