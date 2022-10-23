import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FromControlLabel from "@material-ui/core/FormControlLabel";

import {
  useMusicPlayerContext,
  MusicPlayerPages,
} from "../../contexts/MusicPlayerContextProvider";

const CreateRoomPage = () => {
  const { setPage, currentRoomCode, setRoomCode } = useMusicPlayerContext();

  const defaultVotes = 2;
  const state = {
    guestCanPause: true,
    votesToSkip: defaultVotes,
    code: null,
  };

  const handleVotesChange = (e) => {
    state.votesToSkip = e.target.value;
  };

  const handleGuestCanPauseChange = (e) => {
    state.guestCanPause = e.target.value === "true" ? true : false;
  };

  const handleRoomButtonPressed = () => {
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
  };

  function redirectCreatePage() {
    setPage(MusicPlayerPages.Join);
  }

  return (
    <div className="flex-wrap w-full">
      <div className="flex justify-center w-full pb-8">
        <Typography component="h4" variant="h4">
          Create A Room
        </Typography>
      </div>
      <div className="flex justify-center w-full flex-wrap pb-8">
        <FormHelperText className="w-full flex justify-center">
          Guest Control of Playback State
        </FormHelperText>
        <FormControl component="fieldset">
          <RadioGroup
            row
            defaultValue="true"
            onChange={handleGuestCanPauseChange}
          >
            <FromControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FromControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="flex justify-center w-full flex-wrap pb-8">
        <FormControl>
          <TextField
            required={true}
            type="number"
            onChange={handleVotesChange}
            defaultValue={defaultVotes}
            inputProps={{ min: 1, style: { textAlign: "center" } }}
          />
        </FormControl>
        <FormHelperText className="w-full flex justify-center">
          Votes Required To Skip Song
        </FormHelperText>
      </div>
      <div className="flex justify-center w-full flex-wrap pb-8">
        <Button
          color="primary"
          variant="contained"
          onClick={handleRoomButtonPressed}
        >
          Create the Room
        </Button>
      </div>
      <div className="flex justify-center w-full flex-wrap pb-8">
        <Button
          color="secondary"
          variant="contained"
          onClick={redirectCreatePage}
        >
          Join a Room
        </Button>
      </div>
    </div>
  );
};

export default CreateRoomPage;
