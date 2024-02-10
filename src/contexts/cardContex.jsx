import React, { createContext, useState, useEffect } from "react";

const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const [cardTitle, setCardTitle] = useState(
    localStorage.getItem("cardTitle") || ""
  );
  const [cardId, setCardId] = useState(localStorage.getItem("cardId") || null);

  useEffect(() => {
    localStorage.setItem("cardTitle", cardTitle);
  }, [cardTitle]);

  useEffect(() => {
    if (cardId !== null) {
      localStorage.setItem("cardId", cardId);
    }
  }, [cardId]);

  return (
    <CardContext.Provider
      value={{
        cardTitle,
        setCardTitle,
        cardId,
        setCardId,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export default CardContext;
