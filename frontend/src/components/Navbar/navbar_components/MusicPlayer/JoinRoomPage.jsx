import React, { useState } from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import {
  useMusicPlayerStateContext,
  MusicPlayerPages,
} from "~/contexts/MusicPlayerContextProvider";

const JoinRoomPage = () => {
  const { redirectPage, setRoomCode } = useMusicPlayerStateContext();

  const [state, setState] = useState({
    roomCode: "",
    error: "",
  });

  function handleCodeChanged(e) {
    setState({ ...state, roomCode: e.target.value });
  }

  function joinButtonPressed(e) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: state.roomCode,
      }),
    };

    fetch("/api/join-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          setRoomCode(state.roomCode);

          redirectPage(MusicPlayerPages.Room);
        } else {
          setState({ ...state, error: "Room not found." });
          console.log(response.json());
        }
      })
      .catch((err) => {
        console.log(err);
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
        <Button variant="contained" color="primary" onClick={joinButtonPressed}>
          Enter the Room
        </Button>
      </div>
      <div className="flex justify-center w-full flex-wrap pb-8">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            redirectPage(MusicPlayerPages.Create);
          }}
        >
          Create a Room
        </Button>
      </div>
    </div>
  );
};

export default JoinRoomPage;
