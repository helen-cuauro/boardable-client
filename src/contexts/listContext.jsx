import React, { createContext, useState, useEffect } from "react";

const ListContext = createContext();

export const ListProvider = ({ children }) => {
  const [listTitle, setListTitle] = useState(
    localStorage.getItem("listTitle") || ""
  );
  const [listId, setListId] = useState(localStorage.getItem("listId") || null);

  useEffect(() => {
    localStorage.setItem("listTitle", listTitle);
  }, [listTitle]);

  useEffect(() => {
    if (listId !== null) {
      localStorage.setItem("listId", listId);
    }
  }, [listId]);

  return (
    <ListContext.Provider
      value={{
        listTitle,
        setListTitle,
        listId,
        setListId,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

export default ListContext;
