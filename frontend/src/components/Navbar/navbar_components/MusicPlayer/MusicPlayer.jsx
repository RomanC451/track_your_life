import React, { useEffect } from "react";
import { CloseButton } from "../../../buttons";

import HomePage from "./HomePage";
import CreateRoomPage from "./CreateRoomPage";
import JoinRoomPage from "./JoinRoomPage";
import RoomPage from "./RoomPage";

import {
  MusicPlayerPages,
  useMusicPlayerStateContext,
} from "~/contexts/MusicPlayerContextProvider";
import { useNavbarStateContext } from "~/contexts/NavbarContextProvider";

const MusicPlayer = () => {
  const { currentPage, currentRoomCode, setRoomCode } =
    useMusicPlayerStateContext();
  const { resetNavbarState } = useNavbarStateContext();

  useEffect(function userInRoom() {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        setRoomCode(data.roomCode);
      });
  }, []);

  function renderCurrentPage() {
    if (currentPage === MusicPlayerPages.Create) {
      return <CreateRoomPage />;
    } else if (currentPage === MusicPlayerPages.Join) {
      return <JoinRoomPage />;
    } else if (currentPage === MusicPlayerPages.Room || currentRoomCode) {
      return <RoomPage />;
    } else if (currentPage === MusicPlayerPages.Home) {
      return <HomePage />;
    }
  }

  return (
    <div className="backdrop-blur w-full h-full fixed nav-item top-0 right-0 flex justify-center items-center">
      <div className=" md:h-[550px] md:w-[50%] h-full w-full rounded-lg bg-white drop-shadow-2xl flex items-center">
        <div className="absolute top-0 right-0">
          <div className="absolute top-0 right-0 z-10">
            <CloseButton callBack={resetNavbarState} />
          </div>
        </div>
        <div className="absolute flex w-full h-full items-center">
          {renderCurrentPage()}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
