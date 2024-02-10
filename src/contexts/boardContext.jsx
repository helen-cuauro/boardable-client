import React, { createContext, useState, useEffect } from "react";

const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [boardTitle, setBoardTitle] = useState(
    localStorage.getItem("boardTitle") || ""
  );
  const [boardBackgroundColor, setBoardBackgroundColor] = useState(
    localStorage.getItem("boardBackgroundColor") || ""
  );

  useEffect(() => {
    localStorage.setItem("boardTitle", boardTitle);
    localStorage.setItem("boardBackgroundColor", boardBackgroundColor);
  }, [boardTitle, boardBackgroundColor]);

  return (
    <BoardContext.Provider
      value={{
        boardTitle,
        setBoardTitle,
        boardBackgroundColor,
        setBoardBackgroundColor,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContext;
