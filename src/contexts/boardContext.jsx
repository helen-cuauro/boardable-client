import React, { createContext, useState, useEffect } from "react";

const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [boardTitle, setBoardTitle] = useState(
    localStorage.getItem("boardTitle") || ""
  );
  const [boardBackgroundColor, setBoardBackgroundColor] = useState(
    localStorage.getItem("boardBackgroundColor") || ""
  );
  const [boardId, setBoardId] = useState(
    localStorage.getItem("boardId") || null 
  );

  useEffect(() => {
    localStorage.setItem("boardTitle", boardTitle);
  }, [boardTitle]);

  useEffect(() => {
    localStorage.setItem("boardBackgroundColor", boardBackgroundColor);
  }, [boardBackgroundColor]);

  useEffect(() => {
    if (boardId !== null) { 
      localStorage.setItem("boardId", boardId);
    }
  }, [boardId]);


  return (
    <BoardContext.Provider
      value={{
        boardTitle,
        setBoardTitle,
        boardBackgroundColor,
        setBoardBackgroundColor,
        boardId,
        setBoardId,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContext;
