import React, { createContext, useState } from "react";

const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [boardTitle, setBoardTitle] = useState("");

  return (
    <BoardContext.Provider value={{ boardTitle, setBoardTitle }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContext;
