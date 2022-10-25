import React, { createContext, useContext, useState } from "react";

const MusicPlayerContext = createContext();

export const MusicPlayerPages = Object.freeze({
  Join: "join",
  Create: "create",
  Room: "room",
  Home: "home",
});

function getPageFromString(string) {
  const page = Object.keys(MusicPlayerPages).find(
    (key) => MusicPlayerPages[key] === string
  );

  return page ? string : null;
}

const initData = {
  currentPage: getPageFromString(localStorage.getItem("currentPage")),
};

export const MusicPlayerContextProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(MusicPlayerPages.Home);
  //    initData.currentPage ? initData.currentPage :
  const [currentRoomCode, setCurrentRoomCode] = useState(null);

  const redirectPage = (page) => {
    setCurrentPage(page);
    localStorage.setItem("currentPage", page.toString());
  };

  const setRoomCode = (roomCode) => {
    setCurrentRoomCode(roomCode);
    localStorage.setItem("currentRoomCode", roomCode);
  };

  const resetRoomCode = () => {
    setCurrentRoomCode(null);
    localStorage.setItem("currentRoomCode", null);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <MusicPlayerContext.Provider
      value={{
        currentPage,
        redirectPage,
        currentRoomCode,
        setRoomCode,
        resetRoomCode,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayerContext = () => useContext(MusicPlayerContext);
