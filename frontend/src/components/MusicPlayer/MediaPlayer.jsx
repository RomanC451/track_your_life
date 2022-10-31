import React from "react";
import {
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";

const MediaPlayer = (props) => {
  const song_progress = (props.time / props.duration) * 100;

  function playSong() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };

    fetch("/spotify/play", requestOptions);
    console.log("play");
  }

  function pauseSong() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };

    fetch("/spotify/pause", requestOptions);
    console.log("pause");
  }

  function skipSong() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/skip", requestOptions);
  }

  return (
    <div className="h-50% w-full pb-8 pr-6 pl-6">
      <Card className="h-full">
        <div className=" flex h-full ">
          <div className="max-w-[280px] max-h-[280px]">
            <img src={props.image_url} />
          </div>
          <div className="flex w-full flex-col justify-center flex-wrap">
            <Typography
              component="h5"
              variant="h5"
              className="flex justify-center"
            >
              {props.title}
            </Typography>
            <Typography
              color="textSecondary"
              variant="subtitle1"
              className="flex justify-center"
            >
              {props.artists}
            </Typography>
            <div className="flex justify-center">
              {console.log(props.is_playing)}
              <IconButton
                onClick={() => {
                  props.is_playing ? pauseSong() : playSong();
                }}
              >
                {props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton onClick={() => skipSong()}>
                <SkipNextIcon /> {props.votes} / {props.votes_required}
              </IconButton>
            </div>
          </div>
        </div>
        <LinearProgress
          variant="determinate"
          value={song_progress}
        ></LinearProgress>
      </Card>
    </div>
  );
};

export default MediaPlayer;
