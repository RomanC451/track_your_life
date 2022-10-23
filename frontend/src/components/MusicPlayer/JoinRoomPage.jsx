import React, { useState } from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import {
  useMusicPlayerContext,
  MusicPlayerPages,
} from "../../contexts/MusicPlayerContextProvider";

const JoinRoomPage = () => {
  const { setPage } = useMusicPlayerContext();

  const [state, setState] = useState({
    roomCode: "",
    error: "",
  });

  function redirectCreatePage() {
    setPage(MusicPlayerPages.Create);
  }

  function handleCodeChanged(e) {
    setState({ ...state, roomCode: e.target.value });
  }

  function joinRoom() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: state.votesToSkip,
        guest_can_pause: state.guestCanPause,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setRoomCode(data.code);
        setPage(MusicPlayerPages.Room);
      });
  }

  return (
    <div className="flex-wrap w-full">
      <div className="flex justify-center w-full pb-8">
        <Typography component="h4" variant="h4">
          Join A Room
        </Typography>
      </div>
      <div className="flex justify-center w-full flex-wrap pb-8">
        <TextField
          error={state.error.length > 0}
          label="Code"
          placeholder="Enter a Room Code"
          value={state.roomCode}
          helperText={state.error}
          variant="outlined"
          onChange={handleCodeChanged}
        />
      </div>
      <div className="flex justify-center w-full flex-wrap pb-8">
        <Button variant="contained" color="primary" onClick={joinRoom}>
          Enter the Room
        </Button>
      </div>
      <div className="flex justify-center w-full flex-wrap pb-8">
        <Button
          variant="contained"
          color="secondary"
          onClick={redirectCreatePage}
        >
          Create a Room
        </Button>
      </div>
    </div>
  );
};

export default JoinRoomPage;
