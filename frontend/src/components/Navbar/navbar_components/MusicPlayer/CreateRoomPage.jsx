import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FromControlLabel from "@material-ui/core/FormControlLabel";
import { Collapse } from "@material-ui/core/";
import Alert from "@material-ui/lab/Alert";

import {
  useMusicPlayerStateContext,
  MusicPlayerPages,
} from "~/contexts/MusicPlayerContextProvider";

const CreateRoomPage = (props) => {
  const { redirectPage, setRoomCode } = useMusicPlayerStateContext();

  const [state, setState] = useState({
    guestCanPause: props.guestCanPause,
    votesToSkip: props.votesToSkip,
    errorMsg: "",
    successMsg: "",
  });

  const handleVotesChange = (e) => {
    setState({ ...state, votesToSkip: e.target.value });
    state.votesToSkip = e.target.value;
  };

  const handleGuestCanPauseChange = (e) => {
    setState({
      ...state,
      guestCanPause: e.target.value === "true" ? true : false,
    });
  };

  const handleCreateButtonPressed = () => {
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
        redirectPage(MusicPlayerPages.Room);
      });
  };

  const handleUpdateButtonPressed = () => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: state.votesToSkip,
        guest_can_pause: state.guestCanPause,
        code: props.roomCode,
      }),
    };

    fetch("/api/update-room", requestOptions).then((response) => {
      if (response.ok) {
        setState({ ...state, successMsg: "Room updated successfully!" });
      } else {
        setState({ ...state, errorMsg: "Room updated successfully!" });
      }
      props.updateCallback();
    });
  };

  function renderCreateButtons() {
    return (
      <div>
        <div className="flex justify-center w-full flex-wrap pb-8">
          <Button
            color="primary"
            variant="contained"
            onClick={handleCreateButtonPressed}
          >
            Create the Room
          </Button>
        </div>
        <div className="flex justify-center w-full flex-wrap pb-8">
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              redirectPage(MusicPlayerPages.Join);
            }}
          >
            Join a Room
          </Button>
        </div>
      </div>
    );
  }

  function renderUpdateButtons() {
    return (
      <div className="flex justify-center w-full flex-wrap pb-8">
        <Button
          color="primary"
          variant="contained"
          onClick={handleUpdateButtonPressed}
        >
          Update the Room
        </Button>
      </div>
    );
  }

  const title = props.update ? "Update Room" : "Create Room";

  return (
    <div className="flex-wrap w-full">
      <div className="flex justify-center w-full pb-8">
        <Collapse in={state.errorMsg != "" || state.successMsg != ""}>
          {state.successMsg != "" ? (
            <Alert
              severity="success"
              onClose={() => {
                setState({ ...state, successMsg: "" });
              }}
            >
              {state.successMsg}
            </Alert>
          ) : (
            <Alert
              severity="error"
              onClose={() => {
                setState({ ...state, error: "" });
              }}
            >
              {state.errorMsg}
            </Alert>
          )}
        </Collapse>
      </div>
      <div className="flex justify-center w-full pb-8">
        <Typography component="h4" variant="h4">
          {title}
        </Typography>
      </div>
      <div className="flex justify-center w-full flex-wrap pb-8">
        <FormHelperText className="w-full flex justify-center">
          Guest Control of Playback State
        </FormHelperText>
        <FormControl component="fieldset">
          <RadioGroup
            row
            value={state.guestCanPause.toString()}
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
            defaultValue={props.votesToSkip}
            inputProps={{ min: 1, style: { textAlign: "center" } }}
          />
        </FormControl>
        <FormHelperText className="w-full flex justify-center">
          Votes Required To Skip Song
        </FormHelperText>
      </div>
      {props.update ? renderUpdateButtons() : renderCreateButtons()}
    </div>
  );
};

CreateRoomPage.defaultProps = {
  votesToSkip: 2,
  guestCanPause: true,
  update: false,
  roomCode: null,
  updateCallback: () => {},
};

export default CreateRoomPage;
