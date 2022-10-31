import React, { useEffect, useState } from "react";
import { Button, TableCell, Typography } from "@material-ui/core";

import CreateRoomPage from "./CreateRoomPage";
import MediaPlayer from "./MediaPlayer";

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
    showSettings: "",
    spotifyAuthenticated: false,
    song: {},
  });

  useEffect(() => {
    refreshRoomDetails();
    const interval = setInterval(currentSong, 250);
    //currentSong();

    return () => {
      clearInterval(interval);
    };
  }, []);

  function refreshRoomDetails() {
    fetch("/api/get-room" + "?code=" + currentRoomCode)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setState((prevState) => {
          return {
            ...prevState,
            votesToSkip: data.votes_to_skip,
            guestCanPause: data.guest_can_pause,
            isHost: data.is_host,
          };
        });
        if (data.is_host) {
          authenticateSpotify();
        }
      })
      .catch((err) => {
        console.log(err);
        redirectPage(MusicPlayerPages.Home);
      });
  }

  function authenticateSpotify() {
    fetch("/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        setState((prevState) => {
          return { ...prevState, spotifyAuthenticated: data.status };
        });
        if (!data.status) {
          fetch("/spotify/get-auth-url")
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
  }

  function currentSong() {
    fetch("/spotify/current-song")
      .then((response) => {
        if (!response.ok) {
          return {};
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setState((prevState) => {
          return { ...prevState, song: data };
        });
      });
  }

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

  function updateShowSettings(value) {
    setState((prevState) => {
      return { ...prevState, showSettings: value };
    });
  }

  function renderSettingsButton() {
    return (
      <div className="flex justify-center w-full flex-wrap pb-8">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            updateShowSettings(true);
          }}
        >
          Settings
        </Button>
      </div>
    );
  }

  function renderSettings() {
    return (
      <div className="flex-wrap w-full">
        <div className="flex justify-center w-full flex-wrap">
          <CreateRoomPage
            update={true}
            votesToSkip={state.votesToSkip}
            guestCanPause={state.guestCanPause}
            roomCode={currentRoomCode}
            updateCallback={refreshRoomDetails}
          />
        </div>
        <div className="flex justify-center w-full flex-wrap pb-8">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              updateShowSettings(false);
            }}
          >
            Close
          </Button>
        </div>
      </div>
    );
  }

  if (state.showSettings) {
    return renderSettings();
  }

  return (
    <div className="flex-wrap w-full ">
      <div className="flex justify-center w-full pb-6 pt-4">
        <Typography component="h4" variant="h4">
          Code: {currentRoomCode}
        </Typography>
      </div>
      {<MediaPlayer {...state.song} />}
      {state.isHost ? renderSettingsButton() : null}
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
