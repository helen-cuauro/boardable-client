import * as React from "react";
import { URL_BASE, tokenKey } from "../constants";
import { useState, useEffect } from "react";

const authContext = React.createContext({
  token: null,
  signup: () => {},
});

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = window.localStorage.getItem(tokenKey);

    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  async function signup(username, password) {
    const url = URL_BASE + "/signup";
    const options = {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, options);

      if (response.ok) {
        const body = await response.json();
        if (body.data.token) {
          setToken(body.data.token);
          window.localStorage.setItem(tokenKey, body.data.token);
        } else {
          throw new Error("Token no válido en la respuesta");
        }
      } else {
        const error = await response.json();
        throw new Error(error);
      }
    } catch (error) {
      console.error("Error in signup function:", error);
      throw error;
    }
  }

  return (
    <authContext.Provider value={{ token, signup }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(authContext);
}
