import React, { useEffect, useState } from "react";

import { useMusicPlayerContext } from "../../contexts/MusicPlayerContextProvider";

const RoomPage = () => {
  const { currentRoomCode } = useMusicPlayerContext();

  const [state, setState] = useState({
    votesToSkip: "",
    guestCanPause: "",
    isHost: "",
  });

  useEffect(function getRoomDetails() {
    fetch("/api/get-room" + "?code=" + currentRoomCode)
      .then((response) => response.json())
      .then((data) => {
        setState({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
      });
  }, []);

  return (
    <div>
      <h3> {currentRoomCode}</h3>
      <p>Votes: {state.votesToSkip}</p>
      <p>Pause: {state.guestCanPause.toString()}</p>
      <p>Host: {state.isHost.toString()}</p>
    </div>
  );
};

export default RoomPage;
