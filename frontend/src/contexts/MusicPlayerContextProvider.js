import React, { createContext, useContext, useState } from "react";

const MusicPlayerContext = createContext();

export const MusicPlayerPages = {
  Join: "join",
  Create: "create",
  Room: "room",
};

export function getPageFromString(string) {
  const page = Object.keys(MusicPlayerPages).find(
    (key) => MusicPlayerPages[key] === string
  );
  return page ? string : null;
}

const initData = {
  currentPage: getPageFromString(localStorage.getItem("currentPage")),
  currentRoomCode: localStorage.getItem("currentRoomCode"),
};

export const MusicPlayerContextProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(
    initData.currentPage ? initData.currentPage : MusicPlayerPages.Create
  );

  const [currentRoomCode, setCurrentRoomCode] = useState(
    initData.currentRoomCode ? initData.currentRoomCode : ""
  );

  const setPage = (page) => {
    setCurrentPage(page);
    localStorage.setItem("currentPage", page.toString());
  };

  const setRoomCode = (roomCode) => {
    setCurrentRoomCode(roomCode);
    localStorage.setItem("currentRoomCode", roomCode);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <MusicPlayerContext.Provider
      value={{
        currentPage,
        setPage,
        currentRoomCode,
        setRoomCode,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayerContext = () => useContext(MusicPlayerContext);
