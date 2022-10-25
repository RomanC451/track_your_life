import React from "react";
import { Button, Typography } from "@material-ui/core";
import {
  useMusicPlayerContext,
  MusicPlayerPages,
} from "../../contexts/MusicPlayerContextProvider";

const HomePage = () => {
  const { resetRoomCode, redirectPage } = useMusicPlayerContext();

  return (
    <div className="flex-wrap w-full">
      <div className="flex justify-center w-full pb-12">
        <Typography component="h4" variant="h4">
          House Party
        </Typography>
      </div>
      <div className="flex justify-center">
        <div className="pr-2">
          <Button
            variant="contained"
            color="primary"
            style={{ minWidth: "165px" }}
            onClick={() => {
              redirectPage(MusicPlayerPages.Join);
            }}
            size="large"
          >
            Join a Room
          </Button>
        </div>
        <div className="pr-2">
          <Button
            variant="contained"
            color="secondary"
            style={{ minWidth: "165px" }}
            onClick={() => {
              redirectPage(MusicPlayerPages.Create);
            }}
            size="large"
          >
            Create a Room
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
