import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Button } from "../";
import HomePage from "./HomePage";

const MusicPlayer = () => {
  return (
    <div className="backdrop-blur w-full h-full fixed nav-item top-0 right-0 flex justify-center items-center">
      <div className=" h-[473px] w-[50%] rounded-lg bg-white drop-shadow-2xl flex items-center">
        <div className="absolute top-0 right-0">
          <div className="absolute top-0 right-0">
            <Button
              icon={<MdOutlineCancel />}
              color="rgb(153, 171, 180)"
              bgHoverColor="light-gray"
              size="2xl"
              borderRadius="50%"
            />
          </div>
        </div>
        <div className="absolute flex w-full items-center">
          <HomePage />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
