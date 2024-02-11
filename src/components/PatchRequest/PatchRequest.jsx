import React, { useState } from "react";

const PatchRequest = ({ url, token, data, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);

  const handlePatch = async () => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud PATCH");
      }
      
      onSuccess(); 
    } catch (error) {
      onError(error); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handlePatch} disabled={loading}>
      {loading ? "Cargando..." : "Guardar"}
    </button>
  );
};

export default PatchRequest;
