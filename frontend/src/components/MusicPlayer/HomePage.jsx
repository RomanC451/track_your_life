import React from "react";

import CreateRoomPage from "./CreateRoomPage";
import JoinRoomPage from "./JoinRoomPage";
import RoomPage from "./RoomPage";

import {
  MusicPlayerPages,
  useMusicPlayerContext,
} from "../../contexts/MusicPlayerContextProvider";

const HomePage = () => {
  const { currentPage } = useMusicPlayerContext();

  if (currentPage === MusicPlayerPages.Create) {
    return <CreateRoomPage />;
  } else if (currentPage === MusicPlayerPages.Join) {
    return <JoinRoomPage />;
  } else if (currentPage === MusicPlayerPages.Room) {
    return <RoomPage />;
  }
};

export default HomePage;
