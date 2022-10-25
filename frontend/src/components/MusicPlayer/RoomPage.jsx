import React, { useEffect, useState } from "react";
import { Button, Typography } from "@material-ui/core";

import {
  useMusicPlayerContext,
  MusicPlayerPages,
} from "../../contexts/MusicPlayerContextProvider";

const RoomPage = () => {
  const { currentRoomCode, resetRoomCode, redirectPage } =
    useMusicPlayerContext();

  const [state, setState] = useState({
    votesToSkip: "",
    guestCanPause: "",
    isHost: "",
  });

  function leaveButtonPressed() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };

    fetch("/api/leave-room", requestOptions).then((_response) => {
      redirectPage(MusicPlayerPages.Home);
      resetRoomCode();
    });
  }

  useEffect(function getRoomDetails() {
    fetch("/api/get-room" + "?code=" + currentRoomCode)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setState({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
      })
      .catch((err) => {
        console.log(err);
        redirectPage(MusicPlayerPages.Home);
      });
  }, []);

  return (
    <div className="flex-wrap w-full">
      <div className="flex justify-center w-full pb-8">
        <Typography component="h4" variant="h4">
          Code: {currentRoomCode}
        </Typography>
      </div>
      <div className="flex justify-center w-full flex-wrap pb-8">
        <Typography component="h6" variant="h6">
          Votes: {state.votesToSkip}
        </Typography>
      </div>
      <div className="flex justify-center w-full flex-wrap pb-8">
        <Typography component="h6" variant="h6">
          Guest can pause: {state.guestCanPause.toString()}
        </Typography>
      </div>
      <div className="flex justify-center w-full flex-wrap pb-8">
        <Typography component="h6" variant="h6">
          Host: {state.isHost.toString()}
        </Typography>
      </div>
      <div className="flex justify-center w-full flex-wrap pb-8">
        <Button
          variant="contained"
          color="secondary"
          onClick={leaveButtonPressed}
        >
          Leave Room
        </Button>
      </div>
    </div>
  );
};

export default RoomPage;
